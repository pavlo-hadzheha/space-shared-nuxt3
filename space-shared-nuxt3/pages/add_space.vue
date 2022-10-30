<script lang="ts" setup>
import { FontAwesomeIconsList } from '@/plugins/font-awesome.plugin'
import { spaceCategories, spaceFeatures, countries, weekdays } from '@/util'
import { IDayTimeSpan } from '@/types'

definePageMeta({
  pageLabel: 'Add',
  navOrder: 5,
  icon: FontAwesomeIconsList.fasPlus,
  middleLink: true
})

const steps = [
  { description: 'Step 1', title: 'Description' },
  { description: 'Step 2', title: 'Location' },
  { description: 'Step 3', title: 'Schedule' },
  { description: 'Step 4', title: 'Confirm' }
]
const step = ref<number>(2)

const useForm = (() => {
  const model = reactive(create())
  console.log(model)

  const config = useFormConfig({
    // STEP 1
    category: { label: 'Category', required: true },
    title: { label: 'Title', required: true },
    description: { label: 'Description', required: false },
    features: { label: 'Features', type: 'array' },
    images: { label: 'Images', type: 'array' },

    // STEP 2
    country: { label: 'Country', required: true },
    city: { label: 'City', required: true },
    street: { label: 'Street', required: true },
    building: { label: 'Building', required: true }
    // STEP 3
    // STEP 4
  })

  function create () {
    return {
      // STEP 1
      category: undefined,
      title: '',
      description: '',
      features: [],
      images: [],

      // STEP 2
      country: undefined,
      city: undefined,
      street: undefined,
      building: undefined,

      // STEP 3
      schedule: Object.fromEntries(weekdays.list.map((_day, _index) => {
        console.log(_day)

        return [_day.label, {
          available: ![6, 7].includes(_day.id),
          order: _index + 1,
          from: '',
          to: ''
        } as IDayTimeSpan]
      }))
      // STEP 4
    }
  }
  return {
    model,
    config,
    create
  }
})()
</script>

<template>
  <ElContainer class="container">
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
          #default="{model, data, config}"
          :model="useForm.model"
          :data="useForm.config.data"
          :config="useForm.config"
        >
          <el-form
            :ref="config.ref"
            :model="model"
            :rules="config.rules"
            label-width="100px"
          >
            <div v-show="step === 0">
              <el-form-item
                :prop="data.category.prop"
                :label="data.category.label"
              >
                <el-select
                  v-model="model.category"
                >
                  <el-option
                    v-for="_category of spaceCategories.list"
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
                <el-input v-model="model.title" class="w-80" />
              </el-form-item>

              <el-form-item
                :prop="data.description.prop"
                :label="data.description.label"
                class="w-[500px]"
              >
                <el-input
                  v-model="model.description"
                  rows="5"
                  type="textarea"
                />
              </el-form-item>

              <el-form-item
                :prop="data.features.prop"
                :label="data.features.label"
              >
                <el-checkbox-group v-model="model.features">
                  <div class="grid grid-cols-3">
                    <el-checkbox
                      v-for="_feature of spaceFeatures.list"
                      :key="`space-feature-${_feature.id}`"
                      :label="_feature.id"
                    >
                      {{ _feature.label }}
                    </el-checkbox>
                  </div>
                </el-checkbox-group>
              </el-form-item>
            </div>

            <div v-show="step === 1">
              <el-form-item
                :prop="data.country.prop"
                :label="data.country.label"
              >
                <el-select
                  v-model="model.country"
                  filterable
                >
                  <el-option
                    v-for="_country of countries.list"
                    :key="`space-category-${_country.id}`"
                    :label="_country.country"
                    :value="_country.id"
                  />
                </el-select>
              </el-form-item>

              <el-form-item
                :prop="data.city.prop"
                :label="data.city.label"
                class="w-[500px]"
              >
                <el-input v-model="model.city" class="w-80" />
              </el-form-item>

              <el-form-item
                :prop="data.street.prop"
                :label="data.street.label"
                class="w-[500px]"
              >
                <el-input v-model="model.street" class="w-80" />
              </el-form-item>

              <el-form-item
                :prop="data.building.prop"
                :label="data.building.label"
                class="w-[500px]"
              >
                <el-input v-model="model.building" class="w-80" />
              </el-form-item>
            </div>

            <div
              v-show="step === 2"
            >
              <div
                class="grid grid-cols-3 grid-rows-1"
              >
                <div>Opened</div>
                <div>From </div>
                <div>To</div>
              </div>
              <el-divider style="margin-block: 10px" />
              <div
                class="flex flex-col gap-y-3"
              >
                <div
                  v-for="(_config, _day) of model.schedule"
                  :key="`schedule-day-${_day}`"
                  class="grid grid-cols-3 grid-rows-1"
                >
                  <div>
                    <el-switch v-model="_config.availabel" />
                  </div>
                  <div>
                    <el-time-picker v-model="_config.from" placeholder="From..." />
                  </div>
                  <div>
                    <el-time-picker v-model="_config.to" placeholder="To..." />
                  </div>
                </div>
              </div>
            </div>

            <div v-show="step === 3">
              Confirm
            </div>
          </el-form>
        </Compute>
      </ClientOnly>
    </div>
  </ElContainer>
</template>
