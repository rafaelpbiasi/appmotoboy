import * as ImagePicker from 'expo-image-picker'

export const MEDIA = {
  CANCEL: 'CANCEL',
  PERMISSIONS: 'PERMISSIONS',
}

export const Gallery = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

  if (status !== 'granted') {
    return MEDIA.PERMISSIONS
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  })
  if (result.cancelled) {
    return MEDIA.CANCEL
  }

  return result
}

export const Camera = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync()

  if (status !== 'granted') {
    return MEDIA.PERMISSIONS
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 1,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  })

  if (result.cancelled) {
    return MEDIA.CANCEL
  }

  return result
}
