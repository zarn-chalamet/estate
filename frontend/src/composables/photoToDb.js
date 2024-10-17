import { ref } from 'vue'
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  getStorage,
} from 'firebase/storage'

let storeDataToDatabase = () => {
  let storage = getStorage()
  const err = ref(null)

  const uploadFile = async file => {
    try {
      // Create a storage reference
      const storageReference = storageRef(
        storage,
        `uploads/estate/${file.name}`,
      )

      // Upload the file
      const uploadResult = await uploadBytes(storageReference, file)

      // Get the download URL
      const downloadURL = await getDownloadURL(uploadResult.ref)

      return downloadURL
    } catch (error) {
      err.value = error.message
      return null
    }
  }
  return {
    uploadFile,
  }
}

export default storeDataToDatabase
