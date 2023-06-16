// import React, { Component } from "react";
// import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
// import AppIntroSlider from "react-native-app-intro-slider";
// import * as Font from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import intro1 from './assets/images/intro1.png';
// import intro2 from './assets/images/intro2.png';
// import intro3 from './assets/images/intro3.png';
// import DMSansRegular from './assets/fonts/DMSans-Regular.ttf';
// import DMSansBold from './assets/fonts/DMSans-Bold.ttf';
// import DMSansMedium from './assets/fonts/DMSans-Medium.ttf';
// import { useNavigation } from '@react-navigation/native';
// import { LogBox } from 'react-native';
// import BottomNavigator from "./BottomNavigator";

// LogBox.ignoreLogs(['expo-app-loading is deprecated']);

// const slides = [
//   {
//     key: 'one',
//     title: 'Talk to our Smart Bot',
//     text: 'Share your symptoms and\nget instant disease\npredictions.',
//     image: intro1,
//   },
//   {
//     key: 'two',
//     title: 'Know-It-All Disease Database',
//     text: 'Get detailed info on\ndiseases and conditions.\nFind symptoms, causes,\ntreatments, and prevention\ntips from our reliable\nchatbot.',
//     image: intro2,
//   },
//   {
//     key: 'three',
//     title: 'Discover Nearby\nHospitals',
//     text: 'Emergency? No problem! Find the closest hospitals with a tap. Get the care you need, when you need it.',
//     image: intro3,
//   }
// ];

// class IntroSlider1 extends Component {
//   state = {
//     showHomePage: false,
//     fontsLoaded: false,
//   };

//   async componentDidMount() {
//     await Font.loadAsync({
//       'DMSans-Regular': DMSansRegular,
//       'DMSans-Bold': DMSansBold,
//       'DMSans-Medium': DMSansMedium,
//     });

//     this.setState({ fontsLoaded: true });
//     await SplashScreen.preventAutoHideAsync();
//     SplashScreen.hideAsync();
//   }

//   handleSkip = () => {
//     const { navigation } = this.props;
//     navigation.navigate('HomeNew');
//   };


//   renderItem = ({ item }) => {
//     const { fontsLoaded } = this.state;

//     if (!fontsLoaded) {
//       return null;
//     }

//     return (
//       <View style={{ flex: 1 }}>
//         <Image
//           source={item.image}
//           style={{
//             width: Dimensions.get('window').width,
//             paddingTop: 430,
//             alignSelf: 'center',
//             height: Dimensions.get('window').width,
//           }}
//         />
//         <Text
//           style={{
//             alignSelf: 'center',
//             paddingTop: 6,
//             fontSize: 28,
//             textAlign: 'center',
//             color: 'black',
//             fontFamily: 'DMSans-Regular',
//           }}
//         >
//           {item.title}
//         </Text>
//         <Text style={{
//           alignSelf: 'center',
//           textAlign: 'center',
//           fontSize: 19.25,
//           paddingLeft: 47.35,
//           paddingRight: 47.3,
//           paddingTop: 11,
//           color: '#4A4A4A',
//           fontFamily: 'DMSans-Regular',
//         }}>{item.text}</Text>
//       </View>
//     );
//   };

//   render() {
//     const { navigation } = this.props;

//     return (
//       <View style={{ flex: 1, backgroundColor: 'white' }}>
//         <AppIntroSlider
//           renderItem={this.renderItem}
//           data={slides}
//           activeDotStyle={{
//             backgroundColor: '#0AA7FF'
//           }}
//           renderNextButton={() => null}
//           renderDoneButton={() => (
//             <TouchableOpacity style={{ marginRight: 20 }} onPress={this.handleSkip}>
//               <Text style={{ fontSize: 18, color: 'blue' }}>Skip</Text>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//     );
//   }
// }

// const IntroSliderWrapper = () => {
//   const navigation = useNavigation();

//   return <IntroSlider1 navigation={navigation} />;
// };

// export default IntroSliderWrapper;

import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import AppIntroSlider from "react-native-app-intro-slider";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import intro1 from './assets/images/intro1.png';
import intro2 from './assets/images/intro2.png';
import intro3 from './assets/images/intro3.png';
import DMSansRegular from './assets/fonts/DMSans-Regular.ttf';
import DMSansBold from './assets/fonts/DMSans-Bold.ttf';
import DMSansMedium from './assets/fonts/DMSans-Medium.ttf';
import { useNavigation } from '@react-navigation/native';
import { LogBox } from 'react-native';
import BottomNavigator from "./BottomNavigator";

LogBox.ignoreLogs(['expo-app-loading is deprecated']);

const slides = [
  {
    key: 'one',
    title: 'Talk to our Smart Bot',
    text: 'Share your symptoms and\nget instant disease\npredictions.',
    image: intro1,
  },
  {
    key: 'two',
    title: 'Know-It-All Disease Database',
    text: 'Get detailed info on\ndiseases and conditions.\nFind symptoms, causes,\ntreatments, and prevention\ntips from our reliable\nchatbot.',
    image: intro2,
  },
  {
    key: 'three',
    title: 'Discover Nearby\nHospitals',
    text: 'Emergency? No problem! Find the closest hospitals with a tap. Get the care you need, when you need it.',
    image: intro3,
  }
];

const IntroSlider1 = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'DMSans-Regular': DMSansRegular,
        'DMSans-Bold': DMSansBold,
        'DMSans-Medium': DMSansMedium,
      });

      setFontsLoaded(true);
      await SplashScreen.preventAutoHideAsync();
      SplashScreen.hideAsync();
    };

    loadFonts();
  }, []);

  const handleSkip = () => {
    console.log('Skip button pressed');
    // console.log(navigation);
    navigation.navigate('HomeNew');
  };


  const renderItem = ({ item, index }) => {
    if (!fontsLoaded) {
      return null;
    }

    return (
      <View style={{ flex: 1 }}>
        <Image
          source={item.image}
          style={{
            width: Dimensions.get('window').width,
            paddingTop: 430,
            alignSelf: 'center',
            height: Dimensions.get('window').width,
          }}
        />
        <Text
          style={{
            alignSelf: 'center',
            paddingTop: 6,
            fontSize: 28,
            textAlign: 'center',
            color: 'black',
            fontFamily: 'DMSans-Regular',
          }}
        >
          {item.title}
        </Text>
        <Text style={{
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 19.25,
          paddingLeft: 47.35,
          paddingRight: 47.3,
          paddingTop: 11,
          color: '#4A4A4A',
          fontFamily: 'DMSans-Regular',
        }}>{item.text}</Text>


        {/* <View style={{ flex: 1, justifyContent: 'flex-end' }}> */}
        <View style={{ alignItems: 'flex-end', marginRight: 20, marginBottom: 20, marginTop: 147 }}>
          {(index === 0) && (
            <TouchableOpacity
              style={{
                // backgroundColor: '#0AA7FF',
                padding: 10,
                borderRadius: 5,
              }}
              onPress={handleSkip}
            >
              <Text style={{ fontSize: 18, color: '#0AA7FF', fontFamily: "DMSans-Medium" }}>Skip</Text>
            </TouchableOpacity>
          )}

          {/* </View >
        <View style={{ alignItems: 'flex-end', marginRight: 20, marginBottom: 20 }}> */}
          
          {(index === 2) && (
        <View style={{ alignItems: 'flex-end', marginRight: 20}}>

            <TouchableOpacity
              style={{
                // backgroundColor: 'red',
                padding: 10,
                borderRadius: 5,
                bottom:62,
                right:-28
              }}
              onPress={handleSkip}
            >
              <Text style={{ fontSize: 18, color: '#0AA7FF', fontFamily: "DMSans-Medium" }}>Done</Text>
            </TouchableOpacity>
          </View>

          )}
        </View>
        {/* </View> */}

      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        activeDotStyle={{
          backgroundColor: '#0AA7FF'
        }}
        renderNextButton={() => null}
      />
    </View>
  );
};

const IntroSliderWrapper = () => {
  const navigation = useNavigation();

  return <IntroSlider1 navigation={navigation} />;
};

export default IntroSliderWrapper;


