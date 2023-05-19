import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import PredictionPage from './PredictionPage';
import { useEffect } from 'react'
import DiseaseInfoPage from './DiseaseInfoPage';
import SplashScreen from 'react-native-splash-screen';

// ...

const Stack = createNativeStackNavigator();

const AppContainer = () => {
    

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="‎" component={HomePage} />
        <Stack.Screen name="PredictionPage" component={PredictionPage} />
        <Stack.Screen name="DiseaseInfoPage" component={DiseaseInfoPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// ‎
export default AppContainer;
