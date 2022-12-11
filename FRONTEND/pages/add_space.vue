<script lang="ts" setup>
import { FontAwesomeIconsList } from '@/plugins/font-awesome.plugin'
import { countries, weekdays } from '@/util'
import {
  IDayTimeSpan,
  ISchedule,
  ISpacePayload,
  ILocation,
  TNullableField
} from '@/types'
import { capitalize } from 'lodash'
import { MapboxMarker } from 'vue-mapbox-ts'
import { promiseTimeout } from '@vueuse/shared'

definePageMeta({
  pageLabel: 'Add',
  navOrder: 5,
  icon: FontAwesomeIconsList.fasPlus,
  middleLink: true
})

const general = useGeneral()
const spaces = useSpaces()
const geocode = useGeocode()
const imageUploader = ref()
const map = ref()

const steps = [
  { description: 'Step 1', title: 'Description' },
  { description: 'Step 2', title: 'Location' },
  { description: 'Step 3', title: 'Schedule' },
  { description: 'Step 4', title: 'Pictures' },
  { description: 'Step 5', title: 'Confirm' }
]
const step = ref<number>(0)

const useForm = (() => {
  const model = reactive(create())

  const config = useFormConfig({
    // STEP 1
    categoryId: { label: 'Category', required: true },
    title: { label: 'Title', required: true },
    description: { label: 'Description', required: false },
    features: { label: 'Features', type: 'array' },
    images: { label: 'Images', type: 'array' },

    // STEP 2
    country: { label: 'Country', required: true },
    city: { label: 'City', required: true },
    street: { label: 'Street', required: true },
    house: { label: 'Building', required: true }
    // STEP 3
    // STEP 4
  })

  function create () {
    return {
      // STEP 1
      categoryId: '',
      title: 'Український католицький університет (УКЦ)',
      description: 'Description',
      hourly_rate: null as TNullableField<number>,
      phone: '',
      features: [],
      images: [],
      // STEP 2
      country: 'Ukraine',
      city: 'Львів',
      street: 'Сахарова',
      house: '45',

      // STEP 3
      opened_at: (Object.fromEntries(
        weekdays.list.map((_day, _index) => {
          return [
            _day.label as keyof ISchedule,
            {
              available: ![6, 7].includes(_day.id),
              order: _index + 1,
              from: '2022-11-18T07:00:00.000Z',
              to: '2022-11-18T16:00:00.000Z'
            } as IDayTimeSpan
          ]
        })
      ) as unknown) as ISchedule
      // STEP 4
    }
  }

  function payload (): ISpacePayload {
    return {
      opened_at: model.opened_at,
      categoryId: model.categoryId,
      title: model.title,
      description: model.description,
      images: model.images,
      features: model.features,
      hourly_rate: (model.hourly_rate as number) || 100,
      location: geocode.lastSearch as ILocation,
      phone: model.phone
    }
  }

  return {
    model,
    config,
    create,
    get payload () {
      return payload()
    },
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

async function submit () {
  await useForm.config.validate()
  general.loading = true
  try {
    await promiseTimeout(3000)
    useForm.model.images = await imageUploader.value.save()
    await geocode.getGeodata(useForm.address)
    await spaces.postSpace(useForm.payload)
  } finally {
    general.loading = false
  }
}

async function nextStep () {
  general.loading = true
  const step1RequiredFields = ['categoryId', 'title']
  const step2RequiredFields = ['country', 'city', 'street', 'house']
  const step3RequiredFields = [
    ...weekdays.list.map((_day) => `opened_at.${_day.label}.from`),
    ...weekdays.list.map((_day) => `opened_at.${_day.label}.to`)
  ]
  try {
    await useForm.config.validate()
    step.value++
  } catch (err: any) {
    switch (step.value) {
    case 0:
      if (!Object.keys(err).every((_key) => step1RequiredFields.includes(_key))) {
        step.value++
      }
      break

    case 1:
      if (!Object.keys(err).every((_key) => step2RequiredFields.includes(_key))) {
        step.value++
      }
      break

    case 2:
      if (!Object.keys(err).every((_key) => step3RequiredFields.includes(_key))) {
        step.value++
      }
      break
    }
  } finally {
    general.loading = false
  }
}

async function init () {
  general.loading = true
  try {
    await Promise.all([general.getSpaceCategories(), general.getSpaceFeatures()])
  } finally {
    general.loading = false
  }
}

async function onCheckLocation () {
  general.loading = true
  try {
    const data = await geocode.getGeodata(useForm.address)
    if (map.value && data) {
      map.value.setZoom(12)
      const { lat, lon } = data
      map.value.setCenter([lon, lat])
    }
  } finally {
    general.loading = false
  }
}

await init()
</script>

<template>
  <ElContainer class="container h-full">
    <el-steps
      :active="step"
      align-center
      class="my-5"
    >
      <el-step
        v-for="(_step, _index) of steps"
        :key="`add-space-step-${_step.title}`"
        :title="_step.title"
        @click="step = _index"
      />
    </el-steps>

    <el-divider />

    <div class="mx-auto w-[80%]">
      <ClientOnly>
        <Compute
          #default="{ model, data, config }"
          :model="useForm.model"
          :data="useForm.config.data"
          :config="useForm.config"
        >
          <el-form
            :ref="config.ref"
            :model="model"
            :rules="config.rules"
            label-width="100px"
            class="flex flex-col justify-between gap-4"
            @submit.prevent
          >
            <div
              :class="{ 'h-[440px]': [1, 4].includes(step) }"
              class="overflow-auto min-h-[440px] overflow-x-hidden"
            >
              <div v-show="step === 0">
                <el-form-item :prop="data.categoryId.prop" :label="data.categoryId.label">
                  <el-select v-model="model.categoryId" :size="$componentSize.SMALL">
                    <el-option
                      v-for="_category of general.spaceCategories"
                      :key="`space-category-${_category.id}`"
                      :label="_category.label"
                      :value="_category.id"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item
                  :prop="data.title.prop"
                  :label="data.title.label"
                  class="w-[500px]"
                >
                  <el-input
                    v-model="model.title"
                    class="w-80"
                    :size="$componentSize.SMALL"
                  />
                </el-form-item>

                <el-form-item
                  :prop="data.description.prop"
                  :label="data.description.label"
                  class="w-[500px]"
                >
                  <el-input
                    v-model="model.description"
                    :size="$componentSize.SMALL"
                    rows="5"
                    type="textarea"
                  />
                </el-form-item>

                <el-form-item :prop="data.features.prop" :label="data.features.label">
                  <el-checkbox-group v-model="model.features">
                    <div class="grid grid-cols-3">
                      <el-checkbox
                        v-for="_feature of general.spaceFeatures"
                        :key="`space-feature-${_feature.id}`"
                        :size="$componentSize.SMALL"
                        :label="_feature.id"
                      >
                        {{ _feature.label }}
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </el-form-item>
              </div>

              <div
                v-show="step === 1"
                class="flex flex-col xl:flex-row justify-between w-full gap-5 h-full"
              >
                <div
                  class="flex xl:flex-col flex-row justify-between gap-10 xl:w-2/5 w-full h-full"
                >
                  <div class="w-full">
                    <el-form-item :prop="data.country.prop" :label="data.country.label">
                      <el-select
                        v-model="model.country"
                        :size="$componentSize.SMALL"
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

                    <el-form-item :prop="data.city.prop" :label="data.city.label">
                      <el-input v-model="model.city" :size="$componentSize.SMALL" />
                    </el-form-item>

                    <el-form-item :prop="data.street.prop" :label="data.street.label">
                      <el-input v-model="model.street" :size="$componentSize.SMALL" />
                    </el-form-item>

                    <el-form-item :prop="data.house.prop" :label="data.house.label">
                      <el-input v-model="model.house" :size="$componentSize.SMALL" />
                    </el-form-item>
                  </div>
                  <AppButton
                    :type="$componentType.INFO"
                    :disabled="!useForm.canSearchLocation"
                    @click="onCheckLocation"
                  >
                    Check out location
                  </AppButton>
                </div>

                <div class="xl:w-3/5 w-full h-full">
                  <Compute
                    #default="{ lat, lon, showMarker }"
                    :lat="geocode.lastSearch?.lat"
                    :lon="geocode.lastSearch?.lon"
                    :showMarker="useForm.canSearchLocation && geocode.lastSearch"
                  >
                    <AppMap
                      ref="map"
                      class="h-full"
                      :zoom="1"
                    >
                      <MapboxMarker v-if="showMarker" :lngLat="[lon, lat]" />
                    </AppMap>
                  </Compute>
                </div>
              </div>

              <div v-show="step === 2">
                <div class="grid grid-cols-3 grid-rows-1 gap-4">
                  <div>Opened</div>
                  <div>From</div>
                  <div>To</div>
                </div>
                <el-divider style="margin-block: 10px" />
                <div class="flex flex-col gap-y-3 gap-4">
                  <div
                    v-for="(_config, _day) in model.opened_at"
                    :key="`schedule-day-${_day}`"
                    class="grid grid-cols-3 grid-rows-1 gap-4"
                  >
                    <div>
                      <el-switch
                        v-model="_config.available"
                        :size="$componentSize.SMALL"
                        @change="!$event && ((_config.from = ''), (_config.to = ''))"
                      />
                      {{ capitalize(_day) }}
                    </div>

                    <el-form-item
                      :prop="`opened_at.${_day}.from`"
                      :required="_config.available"
                      class="mb-0"
                    >
                      <el-time-picker
                        v-model="_config.from"
                        :size="$componentSize.SMALL"
                        :disabled="!_config.available"
                        placeholder="From..."
                      />
                    </el-form-item>

                    <el-form-item
                      :prop="`opened_at.${_day}.to`"
                      :required="_config.available"
                      class="mb-0"
                    >
                      <el-time-picker
                        v-model="_config.to"
                        :size="$componentSize.SMALL"
                        :disabled="!_config.available"
                        placeholder="To..."
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>

              <div v-show="step === 3">
                <ImageUpload ref="imageUploader" v-model="useForm.model.images" />
                <!-- <pre class="text-blue-800">
                  {{ useForm.model.images.map(({response, ...rest}) => rest ) }}
                </pre> -->
              </div>

              <div v-show="step === 4">
                <pre>
                  {{ useForm.payload }}
                </pre>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <AppButton :disabled="step === 0" @click.prevent="step--">
                <Icon :name="$icons.fasArrowLeft" />
                Previous
              </AppButton>

              <AppButton v-if="step < 4" @click.prevent="nextStep">
                <Icon :name="$icons.fasArrowRight" />
                Next
              </AppButton>

              <AppButton v-else-if="step === 4" @click.prevent="submit">
                <Icon :name="$icons.farCheckCircle" />
                Post
              </AppButton>
            </div>
          </el-form>
        </Compute>
      </ClientOnly>
    </div>
  </ElContainer>
</template>
