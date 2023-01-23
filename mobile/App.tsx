import { StatusBar, View } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter'
import './src/utils/dayjs'

// Screens
import { Home } from './src/screens/Home';

// Components
import { Loading } from './src/components/Loading';
import { AppRoutes } from './src/routes/app.routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  })

  if (!fontsLoaded) return <Loading />

  return (
    <View className='flex-1 bg-background'>
      <AppRoutes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </View>
  );
}
