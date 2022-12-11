<template>
  <div>
    <div>
      <div class="my-5 flex justify-end">
        <AppButton
          round
          :size="$buttonSize.XL"
          @click="useFilterDrawer.open()"
        >
          <i class="fas fa-filter" />
        </AppButton>
      </div>
      <slot :filtered="filtered" />
    </div>

    <el-drawer
      :key="`drawer-${$mq.md}`"
      v-model="useFilterDrawer.state.opened"
      :lock-scroll="false"
      :size="$mq.md ? '500px' : '100%'"
      append-to-body
    >
      <template #header>
        <div class="pr-5 w-full">
          <AppButton
            :type="$componentType.PRIMARY"
            :disabled="!useForm.canSearchLocation"
            class="w-full"
            @click="submit"
          >
            Search
          </AppButton>
        </div>
      </template>
      <ClientOnly>
        <Compute
          #default="{ model, data, config }"
          :model="useForm.model"
          :data="useForm.config.data"
          :config="useForm.config"
        >
          <div v-loading="loading" class="pb-20">
            <el-form
              :ref="config.ref"
              :model="model"
              :rules="config.rules"
              :label-width="70"
              label-position="left"
              @submit.prevent
            >
              <el-form-item
                :label="data.categoryId.label"
                :prop="data.categoryId.prop"
              >
                <el-select
                  v-model="model.categoryId"
                  :size="$componentSize.SMALL"
                  multiple
                  clearable
                  class="w-full"
                >
                  <el-option
                    v-for="_option of general.spaceCategories"
                    :key="`category-filter-${_option.id}`"
                    :value="_option.id"
                    :label="_option.label"
                  />
                </el-select>
              </el-form-item>

              <el-form-item
                :label="data.features.label"
                :prop="data.features.prop"
              >
                <el-select
                  v-model="model.features"
                  :size="$componentSize.SMALL"
                  multiple
                  clearable
                  class="w-full"
                >
                  <el-option
                    v-for="_option of general.spaceFeatures"
                    :key="`category-filter-${_option.id}`"
                    :value="_option.id"
                    :label="_option.label"
                  />
                </el-select>
              </el-form-item>

              <el-divider />

              <el-form-item label-width="0">
                <el-checkbox
                  v-model="model.openNow"
                  :size="$componentSize.SMALL"
                >
                  Open now
                </el-checkbox>
              </el-form-item>

              <el-form-item label-width="0">
                <span class="text-sm text-info">or enter specific time and date</span>
              </el-form-item>

              <el-form-item
                :label="data.date.label"
                :prop="data.date.prop"
                @change="config.validateField(['to','from'])"
              >
                <el-date-picker
                  v-model="model.date"
                  class="w-full"
                  :size="$componentSize.SMALL"
                  :disabled="model.openNow"
                  placeholder="Enter date"
                />
              </el-form-item>

              <el-form-item
                :label="data.from.label"
                :prop="data.from.prop"
                :required="model.date"
              >
                <el-time-picker
                  v-model="model.from"
                  :size="$componentSize.SMALL"
                  class="w-full"
                  :disabled="model.openNow"
                  placeholder="Enter start time"
                />
              </el-form-item>

              <el-form-item
                :label="data.to.label"
                :prop="data.to.prop"
                :required="model.date"
              >
                <el-time-picker
                  v-model="model.to"
                  :size="$componentSize.SMALL"
                  class="w-full"
                  :disabled="model.openNow"
                  placeholder="Enter end time"
                />
              </el-form-item>

              <el-divider />

              <el-form-item
                label-width="0"
              >
                <el-checkbox v-model="model.searchByLocation" @change="!$event && config.validateField('within')">
                  <div class="flex gap-[6px] items-center">
                    <span>Search by location within </span>
                    <el-form-item
                      :required="model.searchByLocation"
                      prop="within"
                      class="mb-0"
                    >
                      <el-input
                        v-model="model.within"
                        :size="$componentSize.SMALL"
                        style="width: 50px"
                        :disabled="!model.searchByLocation"
                        @click.stop
                      />
                    </el-form-item>
                    <span>km</span>
                  </div>
                </el-checkbox>
              </el-form-item>

              <div class="flex flex-col justify-between w-full gap-5 h-full">
                <div class="w-full">
                  <el-form-item
                    :prop="data.country.prop"
                    :label="data.country.label"
                    :required="model.searchByLocation"
                  >
                    <el-select
                      v-model="model.country"
                      :size="$componentSize.SMALL"
                      :disabled="!model.searchByLocation"
                      class="w-full"
                      filterable
                    >
                      <el-option
                        v-for="_country of countries.list"
                        :key="`space-category-${_country.id}`"
                        :label="_country.country"
                        :value="_country.country"
                      />
                    </el-select>
                  </el-form-item>

                  <el-form-item
                    :prop="data.city.prop"
                    :label="data.city.label"
                    :required="model.searchByLocation"
                  >
                    <el-input
                      v-model="model.city"
                      :size="$componentSize.SMALL"
                      :disabled="!model.searchByLocation"
                    />
                  </el-form-item>

                  <el-form-item
                    :prop="data.street.prop"
                    :label="data.street.label"
                    :required="model.searchByLocation"
                  >
                    <el-input
                      v-model="model.street"
                      :size="$componentSize.SMALL"
                      :disabled="!model.searchByLocation"
                    />
                  </el-form-item>

                  <el-form-item
                    :prop="data.house.prop"
                    :label="data.house.label"
                    :required="model.searchByLocation"
                  >
                    <el-input
                      v-model="model.house"
                      :disabled="!model.searchByLocation"
                      :size="$componentSize.SMALL"
                    />
                  </el-form-item>
                </div>

                <div class="xl:w-3/5 w-full h-60">
                  <Compute
                    #default="{ lat, lon, showMarker }"
                    :lat="geocodeSearch?.lat"
                    :lon="geocodeSearch?.lon"
                    :showMarker="model.searchByLocation && geocodeSearch"
                  >
                    <AppMap
                      v-if="geocodeSearch"
                      ref="map"
                      class="h-full"
                      :zoom="1"
                    >
                      <MapboxMarker :lngLat="[lon, lat]" />
                      <MapboxGeogeometryCircle
                        :center="[Number(lon), Number(lat)]"
                        :radius="model.within"
                        :edges="40"
                        fillColor="#f30067"
                        :opacity="0.3"
                      />

                      <template
                        v-for="_space of filtered"
                        :key="`marker-${_space.id}`"
                      >
                        <Compute
                          #default="{lon:_lon, lat: _lat}"
                          :lon="_space.location.lon"
                          :lat="_space.location.lat"
                        >
                          <MapboxMarker :lngLat="[_lon, _lat]" color="#f30067">
                            <!-- <MapboxPopup className="ss-popup">
                              <SpaceMapCardPopup :space="_space" />
                            </MapboxPopup> -->
                          </MapboxMarker>
                        </Compute>
                      </template>
                    </AppMap>
                  </Compute>
                </div>
              </div>
            </el-form>
          </div>
        </Compute>
      </ClientOnly>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ILocation, ISpace, TNullableField } from '@/types'
import { countries } from '@/util/mock-data.util'
import { MapboxGeogeometryCircle, MapboxMarker } from 'vue-mapbox-ts'
import {
  categoryFilter,
  featuresFilter,
  locationFilter,
  dateFilter
} from './space-filter-functions'

const props = defineProps<{spaces: ISpace[]}>()

const filtered = ref(props.spaces)

const general = useGeneral()
const geocode = useGeocode()
const geocodeSearch = ref<TNullableField<ILocation>>(null)
const map = ref()
const loading = ref(false)

const useFilterDrawer = (() => {
  const opened = ref(false)
  function open () {
    opened.value = true
  }
  function close () {
    opened.value = false
  }
  return {
    state: reactive({ opened }),
    open,
    close
  }
})()

const useForm = (() => {
  const model = reactive(create())

  const config = useFormConfig({
    // QUALITATIVE
    categoryId: { label: 'Category', type: 'array' },
    features: { label: 'Features', type: 'array' },

    // SPACIAL
    country: { label: 'Country' },
    city: { label: 'City' },
    street: { label: 'Street' },
    house: { label: 'Building' },

    // STEP 3
    date: { label: 'On' },
    from: { label: 'From' },
    to: { label: 'To' }
    // STEP 4
  })

  function create () {
    return {
      // STEP 1
      categoryId: [] as string[],
      features: [] as string[],

      // STEP 2
      searchByLocation: false,
      within: null as TNullableField<number>,
      country: 'Ukraine',
      city: 'Львів',
      street: 'Сахарова',
      house: '45',

      // TIME
      openNow: false,
      date: null as TNullableField<string>,
      from: '',
      to: ''
    }
  }

  return {
    model,
    config,
    create,
    get address () {
      return {
        country: model.country,
        city: model.city,
        street: model.street,
        house: model.house
      }
    },
    get canSearchLocation () {
      return !!geocode.joinAddress(this.address)
    }
  }
})()

// if (map.value && geocodeSearch.value) {
//   map.value.setZoom(12)
//   const { lat, lon } = geocodeSearch.value
//   map.value.setCenter([lon, lat])
// }

async function submit () {
  await useForm.config.validate()
  loading.value = true
  try {
    const {
      searchByLocation,
      within,
      categoryId,
      features,
      from,
      to,
      date,
      openNow
    } = useForm.model
    if (searchByLocation) {
      geocodeSearch.value = await geocode.getGeodata(useForm.address)
    }
    filtered.value = props.spaces.filter((_space) => {
      return categoryFilter(_space, categoryId) &&
      featuresFilter(_space, features) &&
      dateFilter(_space, { from, to, date, openNow }) &&
      locationFilter(_space, { searchByLocation, within: Number(within), location: geocodeSearch.value })
    })
    // useFilterDrawer.close()
  } finally {
    loading.value = false
  }
}

watch(() => props.spaces, _spaces => {
  filtered.value = _spaces
})
</script>
