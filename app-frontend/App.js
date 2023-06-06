import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import IntroSliderWrapper from './IntroSlider1';
import HomePage from './HomePage';
import PredictionPage from './PredictionPage';
import DiseaseInfoPage from './DiseaseInfoPage';
import MapPage from './MapPage';
import { LogBox } from 'react-native';
import HomeNew from './HomeNew';

LogBox.ignoreLogs(['Bottom Tab Navigator:']);

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
    'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="IntroSlider" component={IntroSliderWrapper} /> */}
        <Stack.Screen name="HomeNew" component={HomeNew} />
        <Stack.Screen name="PredictionPage" component={PredictionPage} />
        <Stack.Screen name="DiseaseInfoPage" component={DiseaseInfoPage} />
        {/* <Stack.Screen name="MapPage" component={MapPage} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
