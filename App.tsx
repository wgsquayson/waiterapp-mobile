import { useFonts } from 'expo-font';
import { Main } from './src/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default function App() {
  const [areFontsLoaded] = useFonts({
    'GeneralSans-400': require('./src/assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-600': require('./src/assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans-700': require('./src/assets/fonts/GeneralSans-Bold.otf')
  });

  if (!areFontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}
