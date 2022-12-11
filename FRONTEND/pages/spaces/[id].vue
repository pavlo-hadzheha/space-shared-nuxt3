<script lang="ts" setup>
import { TNullableField, ISpace } from '@/types'
import { MapboxMarker } from 'vue-mapbox-ts'

const router = useRouter()
const route = useRoute()
const spaces = useSpaces()
const general = useGeneral()
const auth = useAuth()
const space = ref<TNullableField<ISpace>>(null)
const isBookmarked = ref(false)

const category = computed(() => general.spaceCategories.find(_c => _c.id === space.value?.categoryId))
const features = computed(() => general.spaceFeatures.filter(_f => space.value?.features.includes(_f.id)))

space.value = await spaces.getSpaceByID(route.params.id as string)

async function onBookmarkClick () {
  if (auth.isLoggedIn) {
    if (isBookmarked.value) {
      await spaces.deleteFromBookmarks(space.value?.id as string)
    } else {
      await spaces.addToBookmarks(space.value?.id as string)
    }
    isBookmarked.value = await spaces.isBookmarked(space.value?.id as string)
  } else {
    router.push({ path: '/auth' })
  }
}

onMounted(async () => {
  await general.getSpaceCategories()
  await general.getSpaceFeatures()
})

watch(() => space.value, async _space => {
  if (_space && auth.isLoggedIn) {
    isBookmarked.value = await spaces.isBookmarked(_space.id)
  }
}, { immediate: true })
</script>

<template>
  <div>
    <ScrollableGallery
      v-if="space?.images?.length"
      :images="space?.images.map((_i) => _i.url) || []"
      card-width="500px"
    />

    <ElContainer class="container pt-10">
      <div class="grid-space-details">
        <div class="space space__meta">
          <CategoryLabel :label="category?.label || '-'" />
          <h1 class="text-[34px] font-[Nunito-Bold]">{{ space?.title }}</h1>
          <div class="text-info text-md">
            <i class="fas fa-map-marker-alt" />
            {{ space?.location.label }}
          </div>

          <AppButton
            :size="$buttonSize.LG"
            :type="isBookmarked ? $componentType.PRIMARY : $componentType.INFO"
            text
            class="mt-2"
            style="padding-left: 0;"
            @click="onBookmarkClick"
          >
            <i class="fas fa-heart" />
            {{ !auth.isLoggedIn
              ? 'Login to bookmark items'
              : isBookmarked ? 'Remove from favorites' : 'Add to favorites' }}
          </AppButton>
        </div>
        <div class="space space__description">
          <p class="mb-4 text-gray-500 text-lg">
            {{ space?.description }}
          </p>

          <h1 class="text-[24px] font-[Nunito-Bold]">Features</h1>
          <p class="grid grid-cols-2 mb-4 text-gray-500 text-lg">
            <el-checkbox
              v-for="_f of features"
              :key="`space-feature-${_f.id}`"
              :model-value="true"
              class="cursor-default"
            >
              <span class="text-info">
                {{ _f.label }}
              </span>
            </el-checkbox>
          </p>

          <ClientOnly
            v-if="!!space"
            fallback-tag="div"
            fallback="Loading map..."
          >
            <Compute
              #default="{lon, lat}"
              :lon="space?.location.lon"
              :lat="space?.location.lat"
            >
              <AppMap
                :center="[lon, lat]"
                :zoom="!space ? 1 : 14"
                class="h-[400px]"
              >
                <MapboxMarker :lngLat="[lon, lat]" />
              </AppMap>
            </Compute>
          </ClientOnly>
        </div>
        <div class="space space__aside">
          <SpaceDetailsSideBar :space="space" />
        </div>

        <div class="space space__reviews pt-10">
          <SpaceDetailsReviews :space="space" />
        </div>
      </div>
    </ElContainer>
  </div>
</template>

<style>
.grid-space-details {
  display: grid;
  grid-template-columns: auto 300px;
  grid-template-rows: auto auto auto auto;
  gap: 20px;
  .space {
    /* border: 2px dashed; */
    min-height: 200px;
    &__meta {
      grid-column: 1/-2;
      border-color: blueviolet;
    }
    &__description {
      grid-column: 1/-2;
      grid-row: 2/3;
      border-color: darkgoldenrod;
    }
    &__aside {
      border-color: brown;
      grid-column: 2/-1;
      grid-row: 1/-1;
    }
    &__reviews {
      border-color: green;
      grid-column: 1/-2;
      grid-row: 3/4;
    }
  }
  .header {
    grid-column: 1/-2;
  }

  .content {
    grid-column: 1/-2;
    grid-row: 2/3;
  }

  .location {
    grid-column: 1/2;
    grid-row: 3/4;
  }

  .aside {
    grid-column: 2/-1;
    grid-row: 1/-1;
  }
}
</style>
