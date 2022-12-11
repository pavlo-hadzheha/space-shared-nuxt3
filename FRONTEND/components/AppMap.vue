<script setup lang="ts">
import { MapboxMap, MapboxNavigationControl } from 'vue-mapbox-ts'
import { TIndexedObject, TNullableField } from '~~/types'
const apiKey = useRuntimeConfig().public.mapboxApikey
const props = withDefaults(defineProps<{
  mapStyle?: string
  center?: [number | string, number | string]
  zoom?: number
}>(), {
  mapStyle: 'streets-v11',
  height: '300px'
})

const map = ref<TNullableField<TIndexedObject>>(null)

function onLoaded (mapObject: any) {
  map.value = mapObject
  if (map.value) {
    if (props.zoom && map.value) map.value?.setZoom(props.zoom)
    if (props.center) map.value.setCenter(props.center)
  }
}

function setZoom (_zoom?: number) {
  if (_zoom && map.value) {
    map.value.setZoom(_zoom)
  }
}

function setCenter (_lngLat: [number | string, number | string]) {
  if (_lngLat && map.value) {
    map.value.setCenter(_lngLat)
  }
}
watch(() => props.zoom, setZoom, { immediate: true })

defineExpose({
  setZoom,
  setCenter
})
</script>

<template>
  <div>
    <MapboxMap
      :accessToken="apiKey"
      mapStyle="streets-v11"
      :center="center"
      @loaded="onLoaded"
    >
      <MapboxNavigationControl />
      <slot />
    </MapboxMap>
  </div>
</template>
