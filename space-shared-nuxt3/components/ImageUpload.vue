<template>
  <el-upload
    :file-list="images"
    action=""
    list-type="picture-card"
    :on-preview="usePreviewModal.open"
    :before-upload="beforUpload"
    @update:file-list="onChange"
  >
    <!-- :on-change="onChange" -->

    <el-icon><Plus /></el-icon>
  </el-upload>
  <!-- <pre>
    {{ images.map(({response, ...rest}) => rest) }}
  </pre> -->

  <el-dialog
    v-model="usePreviewModal.state.opened"
    top="40px"
    width="70%"
    class="bg-transparent"
  >
    <img
      class="h-[calc(100vh-200px)] mx-auto"
      :src="usePreviewModal.state.previewed?.url || ''"
      alt="Preview Image"
    >
  </el-dialog>
</template>

<script setup lang="ts">
import type { TNullableField, IImage } from '@/types'
import { ElMessage, UploadFiles, UploadRawFile, UploadUserFile } from 'element-plus'

import { Plus } from '@element-plus/icons-vue'
import { storage } from '@/util/firestorage'

const emit = defineEmits<{
  (e: 'update:modelValue', files: UploadUserFile[]): void
}>()
const props = defineProps<{modelValue: UploadUserFile[]}>()
const images = ref<UploadUserFile[]>([])

const usePreviewModal = (() => {
  const opened = ref(false)
  const previewed = ref<TNullableField<UploadUserFile>>(null)

  function open (_file: TNullableField<UploadUserFile>) {
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

function save (): Promise<IImage[]> {
  return Promise.all(
    images.value
      .map(async (_image) => {
        const out: IImage = { name: _image.name, url: '' }
        if (_image.raw) {
          out.url = await storage.uploadFile(_image.raw)
        } else {
          out.url = _image.url as string
        }
        return out
      })
  )
}

function onChange (_files: UploadFiles) {
  emit('update:modelValue', _files)
}

function beforUpload (_file: UploadRawFile) {
  if (_file.size > 2_097_152) {
    ElMessage.warning('File size cannot exceed 2MB. Aborting...')
    return false
  }
}

watch(() => props.modelValue, _files => {
  images.value.splice(0, Infinity, ..._files)
}, { immediate: true })

defineExpose({
  save
})
</script>
