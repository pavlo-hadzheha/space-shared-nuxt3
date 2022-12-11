<script lang="ts" setup>
const props = defineProps<{
  images: (string | File | Blob)[]
  cardWidth?: string
}>()

const imageURLs = computed(() => {
  return props.images.map(_image => {
    if (typeof _image === 'string') {
      return _image
    } else {
      return URL.createObjectURL(_image)
    }
  })
})
const usePreviewModal = (() => {
  const opened = ref(false)
  const previewed = ref('')

  function open (_file: string) {
    opened.value = true
    previewed.value = _file
  }
  return {
    state: reactive({
      opened,
      previewed
    }),
    open
  }
})()
</script>

<template>
  <div>
    <div class="gallery">
      <div class="gallery-wrapper">
        <div
          class="gallery-wrapper-hs no-scrollbar"
          :style="(cardWidth ? '--card-width: ' + cardWidth + '; ' : '' ) + '--card-count: ' + images.length"
        >
          <div
            v-for="_image of imageURLs"
            :key="_image"
            class="card"
            :style="{ backgroundImage: `url('${_image}')` }"
            @click="usePreviewModal.open(_image)"
          >
            <slot />
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="usePreviewModal.state.opened"
      top="40px"
      width="70%"
      append-to-body
      :z-index="30000"
    >
      <img
        class="h-[calc(100vh-200px)] mx-auto"
        :src="usePreviewModal.state.previewed"
        alt="Preview Image"
      >
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.gallery {
  width: 100%;
  margin: auto;
  --card-width: 35%;
  --transition-time: 0.3s;
  --card-count: 4;

  &-title {
    font-size: 40px;
    text-align: center;
    margin-bottom: 30px;
  }

  &-wrapper {
    position: relative;

    &-hs {
      --gutter: 20px;
      display: grid;
      grid-gap: calc(var(--gutter) / 2);
      grid-template-rows: minmax(463px, 1fr);
      grid-template-columns: 10px repeat(var(--card-count), calc(var(--card-width) - var(--gutter) * 2)) 10px;

      overflow-x: scroll;
      scroll-snap-type: x proximity;
      padding-bottom: calc(.75 * var(--gutter));
      margin-bottom: calc(-.25 * var(--gutter));

      .card {
        position: relative;
        background: teal;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        cursor: pointer;
        transition: all var(--transition-time);
      }

      &::after,
      &::before {
        content: '';
        width: 10px;
      }

      &.no-scrollbar {
        scrollbar-width: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      &.no-scrollbar::-webkit-scrollbar {
        display: none;
      }
    }

  }
}

@media screen and (max-width: 992px) {
  .gallery {
    --card-width: 60%;
  }
}

@media screen and (max-width: 768px) {
  .gallery {
    --card-width: 70%;
  }
}

@media screen and (max-width: 576px) {
  .gallery {
    --card-width: 90%;
  }
}

</style>
