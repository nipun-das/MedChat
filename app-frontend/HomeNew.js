import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const HomeNew = () => {
  const navigation = useNavigation();

  const goToSymptomPage = () => {
    navigation.navigate('PredictionPage');
  };

  const goToDiseaseInfoPage = () => {
    navigation.navigate('DiseaseInfoPage');
  };

  const goToMapPage = () => {
    navigation.navigate('MapPage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.appName}>MedChat</Text> */}
        <Image
          source={require('./assets/images/logo-home.png')} // Replace with your hamburger menu icon
          style={styles.logoIcon}
        />
        <Image
          source={require('./assets/images/hamburger-icon.png')} // Replace with your hamburger menu icon
          style={styles.menuIcon}
        />
      </View>
      <Text style={styles.greeting}>
        Hey!
        {'\n'}
        Welcome.
      </Text>

      <Text style={styles.whatareyou}>What are you looking for?</Text>
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={goToSymptomPage}>
          <View style={styles.card1}>
            <Image
              source={require('./assets/images/f111.png')} // Replace with your card image
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Disease Prediction chat-bot</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToDiseaseInfoPage}>
          <View style={styles.card2}>
            <Image
              source={require('./assets/images/f22.png')} // Replace with your card image
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Disease info. chat-bot</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToMapPage}>
          <View style={styles.card3}>
            <Image
              source={require('./assets/images/f333.png')} // Replace with your card image
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Hospital information</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 40,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        // backgroundColor:'blue'

    },
    logoIcon: {
        width: 120,
        height: 50,
        resizeMode: 'contain',
    },
    menuIcon: {
        width: 24,
        height: 24,
        tintColor: 'black',
    },
    // greeting: {
    //     fontSize: 25,
    //     marginBottom: 16,
    //     fontFamily: 'DMSans-Medium',

    // },
    greeting: {
        fontSize: 25,
        fontFamily: 'DMSans-Medium',
        marginBottom: 39,
        marginLeft: 5,
    },
    whatareyou: {
        fontFamily: 'DMSans-Medium',
        fontSize: 17,
        marginLeft: 5,
        marginBottom: 11
    },
    cardContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // marginTop: 16,
        // backgroundColor: 'yellow',


    },
    card1: {
        width: width - 32,
        width: '100%',
        height:163,
        backgroundColor: '#34699A',
        marginBottom: 16,
        borderBottomLeftRadius: 18,
        borderTopLeftRadius:18,
        borderTopRightRadius:18

    },
    card2: {
        width: width - 32,
        width: '100%',
        height:163,
        backgroundColor: '#408AB4',
        marginBottom: 16,
        borderBottomLeftRadius: 18,
        borderTopLeftRadius:18,
        borderTopRightRadius:18

    },
    card3: {
        width: width - 32,
        width: '100%',
        height:163,
        backgroundColor: '#65C6C4',
        // marginBottom: 25,
        borderBottomLeftRadius: 18,
        borderTopLeftRadius:18,
        borderTopRightRadius:18
    },
    cardImage: {
        width: '100%',
        height: 105,
        marginBottom: 2,
        resizeMode: 'contain',
        marginTop:10
    },
    cardText: {
        fontSize: 15,
        fontFamily: 'DMSans-Regular',
        textAlign: "center",
        color:'white',
        height: 35.5,
        // justifyContent: 'center',
        // alignItems: 'center',
        textAlignVertical: 'bottom',
        backgroundColor:'transparent',
        // borderBottomLeftRadius: 18
    },
   
});

export default HomeNew;
