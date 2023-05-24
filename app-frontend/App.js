// import React, { useEffect } from 'react';
// import AppContainer from './AppContainer';
// import SplashScreen from 'react-native-splash-screen';
// import IntroSlider1 from './IntroSlider1';
// import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AppLoading from 'expo-app-loading';
// import { useFonts } from 'expo-font';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';


// const Stack = createNativeStackNavigator();

// const App = () => {



//   return (
//     // <AppContainer />
//     // <NavigationContainer>
//     //   <Stack.Navigator>
//     //     <Stack.Screen name="‎" component={IntroSlider1} />
//     //   </Stack.Navigator>
//     // </NavigationContainer>

//     <IntroSlider1/>


//   );
// };



// export default App;

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AppLoading from 'expo-app-loading';
// import { useFonts } from 'expo-font';
// import IntroSliderWrapper from './IntroSlider1';
// import HomePage from './HomePage';

// const Stack = createNativeStackNavigator();

// const App = () => {
//   const [fontsLoaded] = useFonts({
//     'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
//     'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
//     'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
//   });

//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="IntroSlider" component={IntroSliderWrapper} />
//         <Stack.Screen name="HomePage" component={HomePage} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import IntroSliderWrapper from './IntroSlider1';
import HomePage from './HomePage';
import PredictionPage from './PredictionPage';
import DiseaseInfoPage from './DiseaseInfoPage';
import MapPage from './MapPage';
import BottomNavigator from './BottomNavigator';

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
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="IntroSlider" component={IntroSliderWrapper} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="PredictionPage" component={PredictionPage} />
        <Stack.Screen name="DiseaseInfoPage" component={DiseaseInfoPage} />
        <Stack.Screen name="MapPage" component={MapPage} />
      </Stack.Navigator> */}
       <BottomNavigator />
    </NavigationContainer>
  )

  // return (
  //   <MapPage/>
  // );
};

export default App;
