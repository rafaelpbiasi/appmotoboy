import * as Notifications from 'expo-notifications'

export async function RecuperarTokenNotificacao() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== 'granted') {
    return ''
  }

  var registrationToken = await (
    await Notifications.getExpoPushTokenAsync()
  ).data
  return registrationToken
}
