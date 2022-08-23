import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { colors } from '../../../styles/colors'

export const RadioButton = ({
  checked,
  setChecked,
  title,
  ml,
  disableBuiltInState = true,
}) => {
  return (
    <BouncyCheckbox
      size={25}
      fillColor="greenDark"
      unfillColor="#FFFFFF"
      useNativeDriver
      text={title}
      textStyle={{
        textDecorationLine: 'none',
      }}
      style={{
        marginLeft: ml || 0,
      }}
      isChecked={checked}
      innerIconStyle={{
        borderWidth: 2,
        borderColor: checked ? 'greenDark' : colors.green,
      }}
      disableBuiltInState={disableBuiltInState}
      onPress={(isChecked) => {
        setChecked(isChecked)
      }}
    />
  )
}
