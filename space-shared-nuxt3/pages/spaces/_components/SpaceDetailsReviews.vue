<template>
  <div>
    <h1 class="text-2xl font-[Nunito-Bold] mb-5">Add a review</h1>
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
        label-position="top"
        class="mb-7"
        @submit.prevent
      >
        <el-form-item
          :prop="data.count.prop"
          :label="data.count.label"
        >
          <el-rate
            v-model="model.count"
            :size="$componentSize.LARGE"
            allow-half
          />
        </el-form-item>

        <el-form-item
          :prop="data.message.prop"
          :label="data.message.label"
        >
          <el-input
            v-model="model.message"
            type="textarea"
            rows="5"
            placeholder="Leave a review..."
          />
        </el-form-item>
        <AppButton
          :size="$buttonSize.MD"
          class="w-full"
          @click="submit"
        >
          Submit
        </AppButton>
      </el-form>
    </Compute>
    <div>
      <SpaceDetailsReviewItem
        v-for="_review of reviews"
        :key="`space-review-${_review.id}`"
        :review="_review"
        @delete="deleteReview"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ISpace, IReviewPayload, IReview, TNullableField } from '@/types'
import { cloneDeep } from 'lodash'

const props = defineProps<{
  space: TNullableField<ISpace>
}>()

const general = useGeneral()
const spaces = useSpaces()
const reviews = ref<IReview[]>([])

const useForm = (() => {
  const model = reactive(create())

  const config = useFormConfig({
    count: { label: 'Rate', required: true },
    message: { label: 'Comment' }

  })

  function create () {
    return {
      message: '',
      count: null
    }
  }

  function payload () {
    return cloneDeep(model) as IReviewPayload
  }

  return {
    model,
    config,
    create,
    get payload (): IReviewPayload {
      return payload()
    }
  }
})()

async function deleteReview (_id: string) {
  general.loading = true
  try {
    await spaces.deleteReview(_id)
    await getReviews()
  } finally {
    general.loading = false
  }
}

async function getReviews () {
  reviews.value = await spaces.getReviews(props.space?.id)
}

async function submit () {
  general.loading = true
  try {
    await spaces.postReview(props.space?.id as string, useForm.payload)
    await getReviews()
  } finally {
    general.loading = false
  }
}

await getReviews()
</script>
