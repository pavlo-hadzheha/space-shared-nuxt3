<template>
  <div class="py-3">
    <p class="flex items-center gap-2">
      <span class="font-[Nunito-Bold] text-lg">{{ review.userFirstName }} {{ review.userLastName }}</span>
      <span class="text-md text-gray-400">on {{ $filters.date(review.leftOn) }}</span>
      <AppButton
        v-if="auth.userId === review.userId"
        round
        :size="$buttonSize.SM"
        @click="$emit('delete', review.id)"
      >
        <i class="fas fa-trash" />
      </AppButton>
    </p>
    <p>
      <el-rate
        :model-value="review.count"
        :size="$componentSize.LARGE"
        disabled
        allow-half
      />
    </p>
    <p>{{ review.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { IReview } from '@/types'

defineProps<{ review: IReview }>()
defineEmits(['delete'])

const auth = useAuth()
</script>
