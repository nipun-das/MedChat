// const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=AIzaSyAVBEpOVStIM8N7qD3MXnWMXjFDXe8wr8Y`;


// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Linking } from 'react-native';
// import * as Location from 'expo-location';
// import MapView, { Marker } from 'react-native-maps';

// const MapPage = () => {
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
//     const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=AIzaSyAVBEpOVStIM8N7qD3MXnWMXjFDXe8wr8Y`;

//     console.log(apiUrl);
//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();
//       console.log(data.results);

//       // Update the hospitals state with the fetched data
//       setHospitals(data.results);
//     } catch (error) {
//       console.log('Error fetching hospitals:', error);
//     }
//   };

//   const handleMarkerPress = (hospital) => {
//     const { geometry } = hospital;
//     const lat = geometry.location.lat;
//     const lng = geometry.location.lng;
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
//     Linking.openURL(url);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {location ? (
//         <MapView
//           style={{ flex: 1 }}
//           region={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           {/* Render markers for each hospital */}
//           {hospitals.map((hospital) => (
//             <Marker
//               key={hospital.place_id}
//               coordinate={{
//                 latitude: hospital.geometry.location.lat,
//                 longitude: hospital.geometry.location.lng,
//               }}
//               title={hospital.name}
//               onPress={() => handleMarkerPress(hospital)} // Handle marker press
//             />
//           ))}

//           {/* Mark the current location */}
//           <Marker
//             coordinate={{
//               latitude: location.latitude,
//               longitude: location.longitude,
//             }}
//             title="My Location"
//             pinColor="blue" // Customize the pin color here
//           />
//         </MapView>
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

// export default MapPage;

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Linking, Modal, StyleSheet } from 'react-native';
// import * as Location from 'expo-location';
// import MapView, { Marker, Callout } from 'react-native-maps';

// const MapPage = () => {
//   const [location, setLocation] = useState(null);
//   const [hospitals, setHospitals] = useState([]);
//   const [selectedHospital, setSelectedHospital] = useState(null);

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
//    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=AIzaSyAVBEpOVStIM8N7qD3MXnWMXjFDXe8wr8Y`;


//     console.log(apiUrl);
//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();
//       console.log(data.results);

//       // Update the hospitals state with the fetched data
//       setHospitals(data.results);
//     } catch (error) {
//       console.log('Error fetching hospitals:', error);
//     }
//   };

//   const handleMarkerPress = (hospital) => {
//     setSelectedHospital(hospital);
//   };

//   const handleGoButtonPress = () => {
//     if (selectedHospital) {
//       const { geometry } = selectedHospital;
//       const lat = geometry.location.lat;
//       const lng = geometry.location.lng;
//       const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
//       Linking.openURL(url);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {location ? (
//         <MapView
//           style={{ flex: 1 }}
//           region={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           {/* Render markers for each hospital */}
//           {hospitals.map((hospital) => (
//             <Marker
//               key={hospital.place_id}
//               coordinate={{
//                 latitude: hospital.geometry.location.lat,
//                 longitude: hospital.geometry.location.lng,
//               }}
//               title={hospital.name}
//               onPress={() => handleMarkerPress(hospital)} // Handle marker press
//             >
//               {/* Show the popup with name and distance */}
//               <Callout>
//                 <View style={styles.calloutContainer}>
//                   <Text style={styles.calloutTitle}>{hospital.name}</Text>
//                   <Text style={styles.calloutDistance}>{hospital.distance}</Text>
//                   <TouchableOpacity style={styles.calloutButton} onPress={handleGoButtonPress}>
//                     <Text style={styles.calloutButtonText}>Go</Text>
//                   </TouchableOpacity>
//                 </View>
//               </Callout>
//             </Marker>
//           ))}

//           {/* Mark the current location */}
//           <Marker
//             coordinate={{
//               latitude: location.latitude,
//               longitude: location.longitude,
//             }}
//             title="My Location"
//             pinColor="blue" // Customize the pin color here
//           />
//         </MapView>
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

//       {/* Modal for showing the selected hospital */}
//       <Modal visible={selectedHospital !== null} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>{selectedHospital?.name}</Text>
//           <Text style={styles.modalDistance}>{selectedHospital?.distance}</Text>
//           <TouchableOpacity style={styles.modalButton} onPress={handleGoButtonPress}>
//             <Text style={styles.modalButtonText}>Go</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={() => setSelectedHospital(null)}
//           >
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   calloutContainer: {
//     width: 200,
//   },
//   calloutTitle: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   calloutDistance: {
//     marginBottom: 10,
//   },
//   calloutButton: {
//     backgroundColor: '#0AA7FF',
//     padding: 5,
//     borderRadius: 5,
//   },
//   calloutButtonText: {
//     color: 'white',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     marginBottom: 10,
//   },
//   modalDistance: {
//     marginBottom: 20,
//   },
//   modalButton: {
//     backgroundColor: '#0AA7FF',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   modalButtonText: {
//     color: 'white',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   closeButton: {
//     backgroundColor: '#FF0000',
//     padding: 10,
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default MapPage;


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Modal, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Callout } from 'react-native-maps';

const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

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
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=AIzaSyAVBEpOVStIM8N7qD3MXnWMXjFDXe8wr8Y`;


    console.log(apiUrl);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data.results);

      // Update the hospitals state with the fetched data
      setHospitals(data.results);
    } catch (error) {
      console.log('Error fetching hospitals:', error);
    }
  };

  const handleMarkerPress = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleGoButtonPress = () => {
    if (selectedHospital) {
      const { geometry } = selectedHospital;
      const lat = geometry.location.lat;
      const lng = geometry.location.lng;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      Linking.openURL(url);
    }
  };

  const getOpeningHours = (hospital) => {
    if (!hospital || !hospital.opening_hours || hospital.opening_hours.open_now === null) {
      return 'Status : Unknown';
    }
    return hospital.opening_hours.open_now ? 'Open Now' : 'Closed';
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
              onPress={() => handleMarkerPress(hospital)} // Handle marker press
            >
              {/* Show the popup with name, distance, and opening hours */}
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{hospital.name}</Text>
                  <Text style={styles.calloutDistance}>{hospital.distance}</Text>
                  <Text style={styles.calloutOpeningHours}>{getOpeningHours(hospital)}</Text>
                  <TouchableOpacity
                    style={styles.calloutButton}
                    onPress={() => handleGoButtonPress(hospital)}
                  >
                    <Text style={styles.calloutButtonText}>Go</Text>
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          ))}

          {/* Mark the current location */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="My Location"
            pinColor="blue" // Customize the pin color here
          />
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

      {/* Modal for showing the selected hospital */}
      <Modal visible={selectedHospital !== null} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedHospital?.name}</Text>
          <Text style={styles.modalDistance}>{selectedHospital?.distance}</Text>
          <Text style={styles.modalOpeningHours}>{getOpeningHours(selectedHospital)}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={handleGoButtonPress}>
            <Text style={styles.modalButtonText}>Go</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedHospital(null)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  calloutContainer: {
    width: 200,
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutDistance: {
    marginBottom: 5,
  },
  calloutOpeningHours: {
    marginBottom: 10,
  },
  calloutButton: {
    backgroundColor: '#0AA7FF',
    padding: 5,
    borderRadius: 5,
  },
  calloutButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  modalDistance: {
    marginBottom: 5,
  },
  modalOpeningHours: {
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#0AA7FF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MapPage;
