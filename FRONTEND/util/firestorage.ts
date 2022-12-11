import {
  deleteObject,
  getDownloadURL, getStorage,
  ref,
  uploadBytes
} from 'firebase/storage'
import { app } from './firebase'

export const storage = (() => {
  const storage = getStorage(app)

  async function uploadFile (_file: File, _folder = 'images'): Promise<string> {
    let storageRef = ref(storage, _folder)
    console.log({ storageRef })
    console.log({ file: _file })
    storageRef = ref(storageRef, _file.name)
    await uploadBytes(storageRef, _file)
    return getDownloadURL(storageRef)
  }

  async function deleteFile (_path: string) {
    const storageRef = ref(storage, _path)
    return deleteObject(storageRef)
  }

  function parseFileName (_fileURL: string) {
    const regex = /.+(\/|%2F)(.+)\?.+/
    return _fileURL.match(regex).at(0)
  }

  return {
    uploadFile,
    deleteFile,
    parseFileName
  }
})()
