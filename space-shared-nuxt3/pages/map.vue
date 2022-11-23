<script lang="ts" setup>
import { FontAwesomeIconsList } from '@/plugins/font-awesome.plugin'
import { MapboxMarker, MapboxPopup, MapboxGeogeometryCircle } from 'vue-mapbox-ts'

definePageMeta({
  pageLabel: 'Map',
  navOrder: 3,
  icon: FontAwesomeIconsList.fasMapMarked,
  middleLink: true,
  footer: false,
  screenHeight: true
})

const shown = ref(true)
const general = useGeneral()
const spaces = useSpaces()
onMounted(async () => {
  general.loading = true
  try {
    // await new Promise(resolve => setTimeout(resolve, 1000)).then(() => { shown.value = true })
    await spaces.getSpaces()
  } finally {
    general.loading = false
  }
})
</script>

<template>
  <ClientOnly>
    <AppMap
      v-if="shown"
      class="h-full w-full"
      height="100vh"
    >
      <template
        v-for="_space of spaces.spaces"
        :key="`marker-${_space.id}`"
      >
        <Compute
          #default="{lon, lat}"
          :lon="_space.location.lon"
          :lat="_space.location.lat"
        >
          <MapboxGeogeometryCircle
            :center="[Number(lon),Number(lat)]"
            :radius="15"
            :edges="30"
          />

          <MapboxMarker :lngLat="[lon, lat]">
            <MapboxPopup className="ss-popup">
              <SpaceMapCardPopup :space="_space" />
            </MapboxPopup>
          </MapboxMarker>
        </Compute>
      </template>
    </AppMap>
  </ClientOnly>
</template>
