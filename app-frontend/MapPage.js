import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Modal, StyleSheet, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Callout } from 'react-native-maps';

import Constants from 'expo-constants';
const apiKey = Constants.expoConfig.extra.API_KEY;





const MapPage = () => {
    const [location, setLocation] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [showHospitalList, setShowHospitalList] = useState(false);

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
        // const API_KEY = process.env.API_KEY;
        const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=${apiKey}`;

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
    // const getVicinity=(hospital)=>{
    //     if (!hospital || !hospital.vicinity) {
    //         return vicinity;
    //     }
    //     // return hospital.opening_hours.open_now ? 'Open Now' : 'Closed';
    // }
    const handleCloseModal = () => {
        setSelectedHospital(null);
    };

    const handleShowHospitalList = () => {
        setShowHospitalList(true);
    };

    const handleCloseHospitalList = () => {
        setShowHospitalList(false);
    };

    const tileColors = ['#91C4F3', '#CBE4FB'];
    const getOpeningHoursStyle = (hospital) => {
        if (!hospital || !hospital.opening_hours || hospital.opening_hours.open_now === null) {
          return { color: '#800080' }; // Purple color for Status: Unknown
        } else if (hospital.opening_hours.open_now) {
          return { color: '#008000' }; // Green color for Open Now
        } else {
          return { color: '#FF0000' }; // Red color for Closed
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
                            onPress={() => handleMarkerPress(hospital)} // Handle marker press
                        >
                            {/* Show the popup with name, distance, and opening hours */}

                            <Callout>

                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutTitle}>{hospital.name}</Text>
                                    <Text style={[styles.calloutOpeningHours, getOpeningHoursStyle(hospital)]}>
      {getOpeningHours(hospital)}
    </Text>

                                    {/* <TouchableOpacity
                                        style={styles.calloutButton}
                                        onPress={() => handleGoButtonPress(hospital)}
                                    >
                                        <Text style={styles.calloutButtonText}>Take me here!</Text>
                                    </TouchableOpacity> */}
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
                style={styles.showHospitalListButton}
                onPress={handleShowHospitalList}
            >
                <Text style={styles.showHospitalListButtonText}>Show Nearby Hospitals</Text>
            </TouchableOpacity>


            {/* Modal for showing the selected hospital */}
            <Modal visible={selectedHospital !== null} animationType="slide" transparent>
                <View style={styles.modalContainerSmall}>
                    <View style={styles.modalContentSmall}>
                        {selectedHospital && (
                            <>
                                <Text style={styles.hospitalNameModal}>{selectedHospital.name}</Text>
                                <TouchableOpacity style={styles.goButton} onPress={handleGoButtonPress}>
                                    <Text style={styles.goButtonText}>Let's Go</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal for showing the hospital list */}
            <Modal visible={showHospitalList} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Nearby Hospitals</Text>
                        <ScrollView style={styles.hospitalList}>
                            {hospitals.map((hospital, index) => {
                                const colorIndex = index % tileColors.length;
                                const backgroundColor = tileColors[colorIndex];
                                const openingHours = getOpeningHours(hospital);

                                let openingHoursColor = 'darkblue'; // Default color for unknown status
                                if (openingHours === 'Open Now') {
                                    openingHoursColor = 'green';
                                } else if (openingHours === 'Closed') {
                                    openingHoursColor = 'red';
                                }

                                return (
                                    <View
                                        key={hospital.place_id}
                                        style={[styles.hospitalListItem, { backgroundColor }]}
                                    >
                                        <Text style={styles.hospitalName}>{hospital.name}</Text>
                                        <View style={styles.hospitalInfoContainer}>
                                            <Text style={[styles.openingHours, { color: openingHoursColor }]}>
                                                {openingHours}
                                            </Text>
                                            <Text style={styles.vicinity}>{hospital.vicinity}</Text>
                                        </View>
                                    </View>
                                );
                            })}

                        </ScrollView>
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseHospitalList}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};





const styles = StyleSheet.create({

    calloutContainer: {
        width: 200,
        color: 'black', // Dark blue color for Status: Unknown
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
      calloutTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
        color: 'black', // White color for the title text
      },
      calloutOpeningHours: {
        fontSize: 14,
        marginBottom: 10,
      },
    calloutButton: {
        backgroundColor: '#0AA7FF',
        padding: 8,
        borderRadius: 5,
        alignSelf: 'center',
    },
    calloutButtonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    // modalsty:{
    //     height:200
    // },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // height:1500
    },
    modalContainerSmall: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // height:1500
    },
    modalContent: {
        // justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '87%',
        height: '80%',
        alignItems: 'center',
    },
    modalContentSmall: {
        // justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '87%',
        // height: '80%',
        alignItems: 'center',
    },
    // modalTitle:{
    //     // marginTop:150,
    // },
    hospitalNameModal: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    distance: {
        fontSize: 16,
        marginBottom: 20,
    },
    goButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    goButtonText: {
        color: 'white',
        fontSize: 16,
    },
    closeButton: {
        marginTop: 10,
    },
    closeButtonText: {
        color: "#34699A",
        fontSize: 16,
    },



    hospitalListItem: {
        flexDirection: 'column',
        marginBottom: 10,
        padding: 10,
        borderRadius:3,

    },
    hospitalInfoContainer: {
        marginTop: 5,
    },
    hospitalName: {
        fontSize: 16,
        fontWeight: 'bold',
        // padding:10,
    },
    openingHours: {
        fontSize: 14,
        color: '#666666',
        // padding:10
    },

    showHospitalListButton: {
        position: 'absolute',
        top: 50,
        // left: 20,
        alignSelf: 'center',
        backgroundColor: '#34699A',
        padding: 10,
        borderRadius: 10,
        elevation: 2,
    },
    showHospitalListButtonText: {
        color: 'white',
        fontSize: 16,
        // fontWeight: 'bold',
    },


    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    hospitalList: {
        maxHeight: 480,
    },
});

export default MapPage;
