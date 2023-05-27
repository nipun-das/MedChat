// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';

// // import HomeScreen from './HomeScreen';
// // import MapScreen from './MapScreen';
// // import ProfileScreen from './ProfileScreen';
// // import SettingsScreen from './SettingsScreen';
// import PredictionPage from './PredictionPage';
// import MapPage from './MapPage';
// import DiseaseInfoPage from './DiseaseInfoPage';
// import AboutUs from './AboutUs';

// const Tab = createBottomTabNavigator();

// const BottomNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           let iconName;
//           if (route.name === 'PredictionPage') {
//             iconName = 'home';
//           } else if (route.name === 'MapPage') {
//             iconName = 'map';
//           } else if (route.name === 'DiseaseInfoPage') {
//             iconName = 'person';
//           } else if (route.name === 'AboutUs') {
//             iconName = 'settings';
//           }
//           return <Icon name={iconName} size={size} color={color} />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: 'blue',
//         inactiveTintColor: 'gray',
//       }}
//     >
//       <Tab.Screen name="PredictionPage" component={PredictionPage} />
//       <Tab.Screen name="MapPage" component={MapPage} />
//       <Tab.Screen name="DiseaseInfoPage" component={DiseaseInfoPage} />
//       <Tab.Screen name="AboutUs" component={AboutUs} />
//     </Tab.Navigator>
//   );
// };

// export default BottomNavigator;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { SvgUri } from 'react-native-svg';
import PredictionPage from './PredictionPage';
import MapPage from './MapPage';
import DiseaseInfoPage from './DiseaseInfoPage';
import AboutUs from './AboutUs';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconSource;
          if (route.name === 'PredictionPage') {
            iconSource = require('./assets/icons/Medical-Shield.png');
          } else if (route.name === 'MapPage') {
            iconSource = require('./assets/icons/Location.png');
          } else if (route.name === 'DiseaseInfoPage') {
            iconSource = require('./assets/icons/Microscope.png');
          } else if (route.name === 'AboutUs') {
            iconSource = require('./assets/icons/Microscope.png');
          }
          
          // Render the icon based on the file type
          if (typeof iconSource === 'string' && iconSource.endsWith('.svg')) {
            return <SvgUri uri={iconSource} width={size} height={size} fill={color} />;
          } else if (typeof iconSource === 'number') {
            return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
          } else {
            return null;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#CCCCCC',
        },
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          display:'none'
        },
        tabStyle: {
          paddingVertical: 10,
        },
        indicatorStyle: {
          backgroundColor: 'blue',
        },
      }}
    >
      <Tab.Screen name="PredictionPage" component={PredictionPage} />
      <Tab.Screen name="MapPage" component={MapPage} />
      <Tab.Screen name="DiseaseInfoPage" component={DiseaseInfoPage} />
      <Tab.Screen name="AboutUs" component={AboutUs} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
