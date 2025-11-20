import { Pressable, Switch, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useApp } from './Contexts';
import { AnimatePresence, MotiView } from 'moti';
const Header = () => {
  const { changeTheme, darkTheme } = useApp()
  return (
    <View className='flex-row justify-between py-2 items-center'>
        <MotiView from={{translateX:-50}} animate={{translateX:0}}>
          <Text className={`text-3xl text-blue-500 font-[Bold] mx-2`}>To Do</Text>
        </MotiView>
        <MotiView from={{translateX:50}} animate={{translateX:0}}>
          <Pressable className='flex-row items-center rounded-full bg-blue-500 h-11 px-2'>
            <Ionicons name='sunny' color={darkTheme ? "#000000" : "#ffffff"} size={17} />
            <Switch trackColor={{ false: 'grey', true: "skyblue" }} value={darkTheme} onValueChange={changeTheme} />
            <Ionicons name='moon' size={17} color={darkTheme ? "#000000" : "#ffffff"} />
          </Pressable>
        </MotiView>
    </View>
  )
}
export default Header