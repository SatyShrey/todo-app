import LottieView from 'lottie-react-native'
import { View } from 'react-native'
import loadingAnimation from "../assets/lottie/loading.json"


const LoadingScreen = () => {
  return (
    <View className='items-center justify-center flex-1'>
      <LottieView source={loadingAnimation} autoPlay style={{width:500,height:500}} />
    </View>
  )
}
export default LoadingScreen