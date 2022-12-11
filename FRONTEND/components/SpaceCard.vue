<script lang="ts" setup>
import { ISpace } from '@/types'

const key = Date.now() * Math.random()
const props = defineProps<{
  space: ISpace
}>()
const isBookmarked = ref(true)
const cardMain = ref()

const general = useGeneral()
const auth = useAuth()

const category = computed(() => general.spaceCategories.find(_c => _c.id === props.space?.categoryId))
const thumbnail = computed(() => `${props.space?.images[0]?.url}` || '')
</script>

<template>
  <div
    :key="key"
    class="card cursor-pointer"
    @click="$router.push({path: `/spaces/${space.id}`})"
  >
    <div
      ref="cardMain"
      class="card-main"
      :style="{backgroundImage: `linear-gradient(to bottom, #666 40%, #000 100%), url('${thumbnail}')`}"
    >
      <div class="card-main-info">
        <CategoryLabel :label="category?.label || '-'" />
        <div class="some-wrapper">
          <div class="card-main-info-details">
            <div
              class="card-main-info-details-title cursor-pointer"
            >
              {{ space?.title }}
            </div>
            <div class="card-main-info-details-address">{{ space?.location?.label }}</div>
          </div>
          <div
            class="favorites isBookmarked"
            :data-tooltip="!auth.isLoggedIn
              ? 'Login to bookmark items'
              : isBookmarked ? 'Remove from favorites' : 'Add to favorites'"
          >
            <Icon :name="$icons.fasHeart" />
          </div>
        </div>
      </div>
      <div class="open-now">Now open!</div>
    </div>
    <div class="card-reviews">No reviews yet</div>
  </div>
</template>

<style lang="scss" scoped>
.card {
    @apply flex flex-col h-[350px];
    box-shadow: 0 0 10px 0 #777;
    &-main {
        @apply relative flex items-end h-[300px];
        @apply p-5 overflow-hidden cursor-pointer;
        @apply bg-center bg-no-repeat bg-blend-hard-light bg-cover -z-10;
        width: inherit;

        &-info {
            @apply w-full;

            &-category {
                @apply bg-primary rounded-full p-2 w-max;
                @apply text-white text-xs mb-[10px];
            }

            &-details {
                &-title {
                    font-family: Nunito-Bold;
                    @apply text-xl mb-[10px];
                }
                &-address {
                    @apply text-xs;
                }
            }

            .some-wrapper {
                @apply flex justify-between items-center text-white;
                width: inherit;

                .favorites {
                    @apply relative rounded-[50%] w-11 h-11 transition-colors duration-300 text-white;
                    @apply flex items-center justify-center flex-shrink-0;
                    background-color: rgba(0,0,0,0.6);

                    &:hover {
                        @apply bg-danger;

                        &::before, &::after {
                            animation-name: fadeIn;
                            @apply inline;
                        }
                    }

                    &.bookmarked {
                        @apply bg-danger;
                    }

                    &::after {
                        content: attr(data-tooltip);
                        @apply top-1/2 w-max absolute bg-info p-[7px] rounded-md;
                        transform: translate(calc(-100% - 36px), -50%);
                        // background-color: #333333;
                    }

                    &::before {
                        content: '';
                        @apply absolute p-[7px] top-1/2 -left-5 bg-info;
                        transform: translateY(-50%) rotate(45deg);
                        // background-color: #333333;
                    }
                    &::before, &::after {
                        @apply opacity-0 hidden duration-150;
                        animation-fill-mode: forwards;
                    }
                }
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
            font-size: 14px;
            transform-origin: right center;
        }
    }
    @screen md {
        .card {
            &-main {
                background-position: center bottom;
            }
        }
    }

    &-reviews {
        @apply text-info;
        display: flex;
        align-items: center;
        flex: 0;
        padding: 20px;
    }
}

</style>
