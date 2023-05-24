import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// import HomeScreen from './HomeScreen';
// import MapScreen from './MapScreen';
// import ProfileScreen from './ProfileScreen';
// import SettingsScreen from './SettingsScreen';
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
          let iconName;
          if (route.name === 'PredictionPage') {
            iconName = 'home';
          } else if (route.name === 'MapPage') {
            iconName = 'map';
          } else if (route.name === 'DiseaseInfoPage') {
            iconName = 'person';
          } else if (route.name === 'AboutUs') {
            iconName = 'settings';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
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
