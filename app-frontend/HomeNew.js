// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

// const { width } = Dimensions.get('window');

// const HomeNew = () => {
//   const navigation = useNavigation();

//   const goToSymptomPage = () => {
//     navigation.navigate('PredictionPage');
//   };

//   const goToDiseaseInfoPage = () => {
//     navigation.navigate('DiseaseInfoPage');
//   };

//   const goToMapPage = () => {
//     navigation.navigate('MapPage');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         {/* <Text style={styles.appName}>MedChat</Text> */}
//         <Image
//           source={require('./assets/images/logo-home.png')} // Replace with your hamburger menu icon
//           style={styles.logoIcon}
//         />
//         <Image
//           source={require('./assets/images/hamburger-icon.png')} // Replace with your hamburger menu icon
//           style={styles.menuIcon}
//         />
//       </View>
//       <Text style={styles.greeting}>
//         Hey!
//         {'\n'}
//         Welcome.
//       </Text>

//       <Text style={styles.whatareyou}>What are you looking for?</Text>
//       <View style={styles.cardContainer}>
//         <TouchableOpacity onPress={goToSymptomPage}>
//           <View style={styles.card1}>
//             <Image
//               source={require('./assets/images/f111.png')} // Replace with your card image
//               style={styles.cardImage}
//             />
//             <Text style={styles.cardText}>Disease Prediction chat-bot</Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={goToDiseaseInfoPage}>
//           <View style={styles.card2}>
//             <Image
//               source={require('./assets/images/f22.png')} // Replace with your card image
//               style={styles.cardImage}
//             />
//             <Text style={styles.cardText}>Disease info. chat-bot</Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={goToMapPage}>
//           <View style={styles.card3}>
//             <Image
//               source={require('./assets/images/f333.png')} // Replace with your card image
//               style={styles.cardImage}
//             />
//             <Text style={styles.cardText}>Hospital information</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         paddingTop: 40,
//         backgroundColor: 'white'
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 10,
//         // backgroundColor:'blue'

//     },
//     logoIcon: {
//         width: 120,
//         height: 50,
//         resizeMode: 'contain',
//     },
//     menuIcon: {
//         width: 24,
//         height: 24,
//         tintColor: 'black',
//     },
//     // greeting: {
//     //     fontSize: 25,
//     //     marginBottom: 16,
//     //     fontFamily: 'DMSans-Medium',

//     // },
//     greeting: {
//         fontSize: 25,
//         fontFamily: 'DMSans-Medium',
//         marginBottom: 39,
//         marginLeft: 5,
//     },
//     whatareyou: {
//         fontFamily: 'DMSans-Medium',
//         fontSize: 17,
//         marginLeft: 5,
//         marginBottom: 11
//     },
//     cardContainer: {
//         // flexDirection: 'row',
//         // justifyContent: 'space-between',
//         // marginTop: 16,
//         // backgroundColor: 'yellow',


//     },
//     card1: {
//         width: width - 32,
//         width: '100%',
//         height:163,
//         backgroundColor: '#34699A',
//         marginBottom: 16,
//         borderBottomLeftRadius: 18,
//         borderTopLeftRadius:18,
//         borderTopRightRadius:18

//     },
//     card2: {
//         width: width - 32,
//         width: '100%',
//         height:163,
//         backgroundColor: '#408AB4',
//         marginBottom: 16,
//         borderBottomLeftRadius: 18,
//         borderTopLeftRadius:18,
//         borderTopRightRadius:18

//     },
//     card3: {
//         width: width - 32,
//         width: '100%',
//         height:163,
//         backgroundColor: '#65C6C4',
//         // marginBottom: 25,
//         borderBottomLeftRadius: 18,
//         borderTopLeftRadius:18,
//         borderTopRightRadius:18
//     },
//     cardImage: {
//         width: '100%',
//         height: 105,
//         marginBottom: 2,
//         resizeMode: 'contain',
//         marginTop:10
//     },
//     cardText: {
//         fontSize: 15,
//         fontFamily: 'DMSans-Regular',
//         textAlign: "center",
//         color:'white',
//         height: 35.5,
//         // justifyContent: 'center',
//         // alignItems: 'center',
//         textAlignVertical: 'bottom',
//         backgroundColor:'transparent',
//         // borderBottomLeftRadius: 18
//     },
   
// });

// export default HomeNew;
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const HomeNew = () => {
  const navigation = useNavigation();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const goToSymptomPage = () => {
    navigation.navigate('PredictionPage');
  };

  const goToDiseaseInfoPage = () => {
    navigation.navigate('DiseaseInfoPage');
  };

  const goToMapPage = () => {
    navigation.navigate('MapPage');
  };

  const goToAboutPage = () => {
    navigation.navigate('AboutPage');
    setShowSidebar(false); // Close the sidebar after navigating to "About" page
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./assets/images/logo-home.png')}
          style={styles.logoIcon}
        />
        <TouchableOpacity onPress={toggleSidebar}>
          <Image
            source={require('./assets/images/hamburger-icon.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>

      {showSidebar && (
        <View style={styles.sidebar}>
          <TouchableOpacity onPress={goToAboutPage}>
            <Text style={styles.sidebarOption}>About</Text>
          </TouchableOpacity>
          {/* Add more sidebar options here if needed */}
        </View>
      )}

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
              source={require('./assets/images/f111.png')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Disease Prediction chat-bot</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToDiseaseInfoPage}>
          <View style={styles.card2}>
            <Image
              source={require('./assets/images/f22.png')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Disease info. chat-bot</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToMapPage}>
          <View style={styles.card3}>
            <Image
              source={require('./assets/images/f333.png')}
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
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  sidebar: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sidebarOption: {
    fontSize: 18,
    paddingVertical: 8,
  },
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
    marginBottom: 11,
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
    height: 163,
    backgroundColor: '#34699A',
    marginBottom: 16,
    borderBottomLeftRadius: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  card2: {
    width: width - 32,
    width: '100%',
    height: 163,
    backgroundColor: '#408AB4',
    marginBottom: 16,
    borderBottomLeftRadius: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  card3: {
    width: width - 32,
    width: '100%',
    height: 163,
    backgroundColor: '#65C6C4',
    // marginBottom: 25,
    borderBottomLeftRadius: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  cardImage: {
    width: '100%',
    height: 105,
    marginBottom: 2,
    resizeMode: 'contain',
    marginTop: 10,
  },
  cardText: {
    fontSize: 15,
    fontFamily: 'DMSans-Regular',
    textAlign: 'center',
    color: 'white',
    height: 35.5,
    textAlignVertical: 'bottom',
    backgroundColor: 'transparent',
  },
});

export default HomeNew;
