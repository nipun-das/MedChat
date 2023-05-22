// // import React, { useState, useEffect } from 'react';
// // import { View, Text, TouchableOpacity } from 'react-native';
// // import * as Permissions from 'expo-permissions';
// // import * as location from 'expo-location';

import { loadDefaultErrorComponents } from "next/dist/server/load-components"

// // const MapScreen = () => {
// //     const [location, setLocation] = useState(null);
  
// //     useEffect(() => {
// //       getCurrentLocation();
// //     }, []);
  
// //     const getCurrentLocation = async () => {
// //       try {
// //         const { status } = await Permissions.askAsync(Permissions.LOCATION);
// //         if (status !== 'granted') {
// //           console.log('Permission denied');
// //           return;
// //         }
  
// //         const location = await Location.getCurrentPositionAsync({});
// //         setLocation(location.coords);
// //       } catch (error) {
// //         console.log('Error:', error);
// //       }
// //     };
  
// //     return (
// //       <View style={{ flex: 1 }}>
// //         {/* Display the location or nearby hospitals based on the state */}
// //         {location ? (
// //           <Text>
// //             Latitude: {location.latitude}, Longitude: {location.longitude}
// //           </Text>
// //         ) : (
// //           <Text>Loading...</Text>
// //         )}
  
// //         {/* Button to trigger location retrieval */}
// //         <TouchableOpacity
// //           style={{
// //             position: 'absolute',
// //             bottom: 20,
// //             right: 20,
// //             backgroundColor: '#0AA7FF',
// //             padding: 10,
// //             borderRadius: 5,
// //           }}
// //           onPress={getCurrentLocation}
// //         >
// //           <Text style={{ color: 'white', fontSize: 16 }}>Get Nearby Hospitals</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   };
  
// //   export default MapScreen;
  
// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import * as Location from 'expo-location';

// const HospitalLoc = () => {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     getLocationAsync();
//   }, []);

//   const getLocationAsync = async () => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location.coords);
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {/* Display the location or nearby hospitals based on the state */}
//       {location ? (
//         <Text>
//           Latitude: {location.latitude}, Longitude: {location.longitude}
//         </Text>
//       ) : (
//         <Text>Loading...</Text>
//       )}

//       {/* Button to trigger location retrieval */}
//       <TouchableOpacity
//         style={{
//           position: 'absolute',
//           bottom: 20,
//           right: 20,
//           backgroundColor: '#0AA7FF',
//           padding: 10,
//           borderRadius: 5,
//         }}
//         onPress={getLocationAsync}
//       >
//         <Text style={{ color: 'white', fontSize: 16 }}>Get Nearby Hospitals</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default MapScreen;

// import React, { useEffect, useState } from 'react';
// import { View, Text, PermissionsAndroid, Platform } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';

// const MapScreen = () => {
//   const [location, setLocation] = useState(null);
//   const [hospitals, setHospitals] = useState([]);

//   useEffect(() => {
//     // Request location permission
//     requestLocationPermission();
//   }, []);

//   useEffect(() => {
//     if (location) {
//       // Fetch nearby hospitals based on user's location
//       fetchNearbyHospitals();
//     }
//   }, [location]);

//   const requestLocationPermission = async () => {
//     try {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           getCurrentLocation();
//         } else {
//           // Handle permission denied
//         }
//       } else if (Platform.OS === 'ios') {
//         getCurrentLocation();
//       }
//     } catch (error) {
//       console.error('Location permission error:', error);
//     }
//   };

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });
//       },
//       (error) => {
//         console.error('Location error:', error);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   const fetchNearbyHospitals = async () => {
//     try {
//       // Call your API or data source to fetch nearby hospitals
//       // Pass the user's location (latitude and longitude) to the API
//       // Parse the response and set the hospitals state
//       const response = await fetch(
//         `https://api.example.com/hospitals?lat=${location.latitude}&lng=${location.longitude}`
//       );
//       const data = await response.json();
//       setHospitals(data);
//     } catch (error) {
//       console.error('Error fetching hospitals:', error);
//     }
//   };

//   return (
//     <View>
//       {hospitals.map((hospital) => (
//         <View key={hospital.id}>
//           <Text>{hospital.name}</Text>
//           <Text>{hospital.address}</Text>
//           <Text>{hospital.distance} km</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// export default MapScreen;


// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import * as Location from 'expo-location';

// const MapScreen = () => {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     getLocationAsync();
//   }, []);

//   const getLocationAsync = async () => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location.coords);
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {/* Display the location or nearby hospitals based on the state */}
//       {location ? (
//         <Text>
//           Latitude: {location.latitude}, Longitude: {location.longitude}
//         </Text>
//       ) : (
//         <Text>Loading...</Text>
//       )}

//       {/* Button to trigger location retrieval */}
//       <TouchableOpacity
//         style={{
//           position: 'absolute',
//           bottom: 20,
//           right: 20,
//           backgroundColor: '#0AA7FF',
//           padding: 10,
//           borderRadius: 5,
//         }}
//         onPress={getLocationAsync}
//       >
//         <Text style={{ color: 'white', fontSize: 16 }}>Get Nearby Hospitals</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default MapScreen;
// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import * as Location from 'expo-location';
// import MapView, { Marker } from 'react-native-maps';
// import axios from 'axios';

// const MapScreen = () => {
//   const [location, setLocation] = useState(null);
//   const [hospitals, setHospitals] = useState([]);

//   useEffect(() => {
//     getLocationAsync();
//   }, []);

//   const getLocationAsync = async () => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location.coords);

//       // Call the API to fetch nearby hospitals
//       fetchHospitals(location.coords.latitude, location.coords.longitude);
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };

//   const fetchHospitals = async (latitude, longitude) => {
//     const apiUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${latitude},${longitude})[amenity=hospital];out;`;
//     console.log(apiUrl);
//     try {
//       const response = await axios.get(apiUrl);
//       const data = response.data;
//       console.log(data.elements);

//       // Update the hospitals state with the fetched data
//       setHospitals(data.elements);
//     } catch (error) {
//       console.log('Error fetching hospitals:', error);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {location ? (
//         <MapView
//   style={{ flex: 1 }}
//   region={{
//     latitude: location.latitude,
//     longitude: location.longitude,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   }}
// >
//   {/* Render markers for each hospital */}
//   {hospitals.map((hospital) => (
//     <Marker
//       key={hospital.id}
//       coordinate={{
//         latitude: hospital.lat,
//         longitude: hospital.lon,
//       }}
//       title={hospital.tags.name}
//     />
//   ))}

//   {/* Mark the current location */}
//   {location && (
//     <Marker
//       coordinate={{
//         latitude: location.latitude,
//         longitude: location.longitude,
//       }}
//       title="My Location"
//       pinColor="blue" // Customize the pin color here
//     />
//   )}
// </MapView>

//       ) : (
//         <Text>Loading...</Text>
//       )}

//       <TouchableOpacity
//         style={{
//           position: 'absolute',
//           bottom: 20,
//           right: 20,
//           backgroundColor: '#0AA7FF',
//           padding: 10,
//           borderRadius: 5,
//         }}
//         onPress={getLocationAsync}
//       >
//         <Text style={{ color: 'white', fontSize: 16 }}>Get Nearby Hospitals</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default MapScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      // Call the API to fetch nearby hospitals
      fetchHospitals(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const fetchHospitals = async (latitude, longitude) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=AIzaSyDIiGVLxaOi0ubgvFbqMTs419czfs3OIlE`;
    console.log(apiUrl)
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      // console.log(response)
      // console.log(data)
      console.log(data.results)
      

      // Update the hospitals state with the fetched data
      setHospitals(data.results);
    } catch (error) {
      console.log('Error fetching hospitals:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Render markers for each hospital */}
          {hospitals.map((hospital) => (
            <Marker
              key={hospital.place_id}
              coordinate={{
                latitude: hospital.geometry.location.lat,
                longitude: hospital.geometry.location.lng,
              }}
              title={hospital.name}
            />
          ))}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#0AA7FF',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={getLocationAsync}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Get Nearby Hospitals</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;




// 12.09796, 75.56043
// mapbox
// leaflet 
// mapquest
// here

