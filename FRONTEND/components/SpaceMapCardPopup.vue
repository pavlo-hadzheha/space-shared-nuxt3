<script lang="ts" setup>
import { ISpace } from '@/types'
const props = defineProps<{space: ISpace}>()
const thumbnail = computed(() => `${props.space?.images[0]?.url}` || '')
</script>

<template>
  <div class="card">
    <div
      class="card-main"
      :style="{backgroundImage: `linear-gradient(#666 26%, #000 109%), url('${thumbnail}')`}"
    >
      <div class="card-main-info">
        <div class="some-wrapper">
          <div class="card-main-info-details">
            <div class="card-main-info-details-title">{{ space.title }}</div>
            <div class="card-main-info-details-address">{{ space.location.label }}</div>
          </div>
        </div>
      </div>
      <div class="open-now">Now open!</div>
    </div>
    <div class="card-reviews">
      <el-rate
        :model-value="3.5"
        allow-half
        :size="$componentSize.LARGE"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
      .card {
        --padding: 20px;
        display: flex;
        flex-direction: column;
        height: 220px;
        max-width: 240px;
        box-shadow: 0 0 10px 0 #777;
        border-radius: 5px;;
        &-main {
            @apply bg-black;
            position: relative;
            width: inherit;
            height: 180px;
            border-radius: 5px 5px 0 0;
            display: flex;
            align-items: flex-end;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            background-blend-mode: hard-light;
            padding: 10px;
            overflow: hidden;
            cursor: pointer;
            &-info {
                width: 100%;
                &-details {
                    &-title {
                        font-family: Nunito-Bold;
                        font-size: 20px;
                        margin-bottom: 5px;
                    }
                }

                .some-wrapper {
                    width: inherit;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: white;
                }
            }
            .open-now {
                position: absolute;
                top: 10%;
                right: 10%;
                transform: rotate(45deg) translateX(48%);
                background-color: #54BA1D;
                height: 30px;
                line-height: 30px;
                width: 200px;
                text-align: center;
                color: white;
                font-family: Nunito-Bold;
                font-size: 11px;
                transform-origin: right center;
            }
        }

        &-reviews {
            @apply text-info flex items-center flex-grow px-2;
        }
    }
</style>
