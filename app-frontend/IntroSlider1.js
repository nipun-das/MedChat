// // import React, { Component } from "react";
// // import { View, Text, Image, Dimensions } from 'react-native';
// // import AppIntroSlider from "react-native-app-intro-slider";
// // import * as Font from 'expo-font';
// // import { useFonts } from 'expo-font';
// // import * as SplashScreen from 'expo-splash-screen';
// // import intro1 from './assets/images/intro1.png';
// // import intro2 from './assets/images/intro2.png';
// // import intro3 from './assets/images/intro3.png';
// // import DMSansRegular from './assets/fonts/DMSans-Regular.ttf';
// // import DMSansBold from './assets/fonts/DMSans-Bold.ttf';
// // import DMSansMedium from './assets/fonts/DMSans-Medium.ttf';
// // import AppLoading from "expo-app-loading";
// // import { LogBox } from 'react-native';

// // LogBox.ignoreLogs(['expo-app-loading is deprecated']);


// // const slides = [
// //   {
// //     key: 'one',
// //     title: 'Talk to our Smart Bot',
// //     text: 'Share your symptoms and\nget instant disease\npredictions.',
// //     image: intro1,
// //   },
// //   {
// //     key: 'two',
// //     title: 'Know-It-All Disease Database',
// //     text: 'Get detailed info on\ndiseases and conditions.\nFind symptoms, causes,\ntreatments, and prevention\ntips from our reliable\nchatbot.',
// //     image: intro2,
// //   },
// //   {
// //     key: 'three',
// //     title: 'Discover Nearby\nHospitals',
// //     text: 'Emergency? No problem! Find the closest hospitals with a tap. Get the care you need, when you need it.',
// //     image: intro3,
// //   }
// // ];

// // class IntroSlider1 extends Component {
// //   state = {
// //     showHomePage: false,
// //     fontsLoaded: false,
// //   };

// //   async componentDidMount() {
// //     await Font.loadAsync({
// //       'DMSans-Regular': DMSansRegular,
// //       'DMSans-Bold': DMSansBold,
// //       'DMSans-Medium': DMSansMedium,
// //     });

// //     this.setState({ fontsLoaded: true });
// //     await SplashScreen.preventAutoHideAsync();
// //     SplashScreen.hideAsync();
// //   }


// //   renderItem = ({ item }) => {
// //     const { fontsLoaded } = this.state;

// //     if (!fontsLoaded) {
// //       return <AppLoading/>;
// //     }

// //     return (
// //       <View style={{ flex: 1 }}>
// //         <Image
// //           source={item.image}
// //           style={{
// //             width: Dimensions.get('window').width,
// //             paddingTop: 430,
// //             alignSelf: 'center',
// //             height: Dimensions.get('window').width,
// //           }}
// //         />
// //         <Text
// //           style={{
// //             alignSelf: 'center',
// //             paddingTop: 6,
// //             fontSize: 28,
// //             textAlign: 'center',
// //             color: 'black',
// //             fontFamily: 'DMSans-Regular',
// //           }}
// //         >
// //           {item.title}
// //         </Text>
// //         <Text style={{
// //           alignSelf: 'center',
// //           textAlign: 'center',
// //           fontSize: 19.25,
// //           paddingLeft: 47.35,
// //           paddingRight: 47.3,
// //           paddingTop: 11,
// //           color: '#4A4A4A',
// //           fontFamily: 'DMSans-Regular',
// //         }}>{item.text}</Text>
// //       </View>
// //     );
// //   };

// //   render() {
// //     return (
// //       <View style={{ flex: 1 }}>
// //         <AppIntroSlider
// //           renderItem={this.renderItem}
// //           data={slides}
// //           activeDotStyle={{
// //             backgroundColor: '#0AA7FF'
// //           }}
// //         />
// //       </View>
// //     );
// //   }

// // }

// // export default IntroSlider1;


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
// import AppLoading from "expo-app-loading";
// import { LogBox } from 'react-native';
// import HomePage from "./HomePage";

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
//     this.setState({ showHomePage: true });
//   };

//   renderItem = ({ item, index }) => {
//     const { fontsLoaded } = this.state;

//     if (!fontsLoaded) {
//       return <AppLoading />;
//     }

//     if (index === slides.length - 1) {
//       return (
//         <View style={{ flex: 1 }}>
//           <Image
//             source={item.image}
//             style={{
//               width: Dimensions.get('window').width,
//               paddingTop: 430,
//               alignSelf: 'center',
//               height: Dimensions.get('window').width,
//             }}
//           />
//           <Text
//             style={{
//               alignSelf: 'center',
//               paddingTop: 6,
//               fontSize: 28,
//               textAlign: 'center',
//               color: 'black',
//               fontFamily: 'DMSans-Regular',
//             }}
//           >
//             {item.title}
//           </Text>
//           <Text style={{
//             alignSelf: 'center',
//             textAlign: 'center',
//             fontSize: 19.25,
//             paddingLeft: 47.35,
//             paddingRight: 47.3,
//             paddingTop: 11,
//             color: '#4A4A4A',
//             fontFamily: 'DMSans-Regular',
//           }}>{item.text}</Text>
//           <TouchableOpacity
//             style={{
//               position: 'absolute',
//               bottom: 20,
//               right: 20,
//               backgroundColor: 'red',
//               padding: 10
//             }}
//             onPress={this.handleSkip}
//           >
//             <Text style={{ color: 'white', fontSize: 16 }}>Skip</Text>
//           </TouchableOpacity>
//         </View>
//       );
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
//     const { showHomePage } = this.state;

//     if (showHomePage) {
//       return <HomePage />;
//     }

//     return (
//       <View style={{ flex: 1 }}>
//         <AppIntroSlider
//           renderItem={this.renderItem}
//           data={slides}
//           activeDotStyle={{
//             backgroundColor: '#0AA7FF'
//           }}
//         />
//       </View>
//     );
//   }

// }

// export default IntroSlider1;

// import React, { useEffect } from "react";
// import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
// import AppIntroSlider from "react-native-app-intro-slider";
// import * as Font from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import intro1 from './assets/images/intro1.png';
// import HomePage from './HomePage';
// import intro2 from './assets/images/intro2.png';
// import intro3 from './assets/images/intro3.png';
// import DMSansRegular from './assets/fonts/DMSans-Regular.ttf';
// import DMSansBold from './assets/fonts/DMSans-Bold.ttf';
// import DMSansMedium from './assets/fonts/DMSans-Medium.ttf';
// import AppLoading from "expo-app-loading";
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { LogBox } from 'react-native';
// import { withNavigation } from "react-navigation";

// LogBox.ignoreLogs(['expo-app-loading is deprecated']);

// const Stack = createStackNavigator();

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

// const IntroSlider1 = ({ navigation }) => {

// const handleSkip = () => {
//     navigation.navigate('HomePage');
//   };
//   const [fontsLoaded, setFontsLoaded] = React.useState(false);

//   useEffect(() => {
//     const loadFonts = async () => {
//       await Font.loadAsync({
//         'DMSans-Regular': DMSansRegular,
//         'DMSans-Bold': DMSansBold,
//         'DMSans-Medium': DMSansMedium,
//       });

//       setFontsLoaded(true);
//       await SplashScreen.preventAutoHideAsync();
//       SplashScreen.hideAsync();
//     };

//     loadFonts();
//   }, []);

//   const renderItem = ({ item, index }) => {
//     if (!fontsLoaded) {
//       return <AppLoading />;
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
//         {index === slides.length - 1 && (
//           <TouchableOpacity
//             style={{
//               position: 'absolute',
//               bottom: 20,
//               right: 20,
//               backgroundColor: 'red',
//               padding: 10
//             }}
//             onPress={() => navigation.navigate('HomePage')}
//           >
//             <Text style={{ color: 'white', fontSize: 16 }}>Skip</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     );
//   };

//   const goToHomePage = () => {
//     navigation.navigate('HomePage');
//   };
//   return (
//     <View style={{ flex: 1 }}>
//       {/* AppIntroSlider component */}
//       {/* Slides */}
//       <TouchableOpacity
//         style={{
//           position: 'absolute',
//           bottom: 20,
//           right: 20,
//           backgroundColor: 'red',
//           padding: 10
//         }}
//         onPress={goToHomePage}
//       >
//         <Text style={{ color: 'white', fontSize: 16 }} onPress={goToHomePage}>Skip</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
// /*--------------------------
// const HomePage = ({ navigation }) => {
//   const goToSymptomPage = () => {
//     navigation.navigate('PredictionPage');
//   };

//   const goToDiseaseInfoPage = () => {
//     navigation.navigate('DiseaseInfoPage');
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Symptom Page" onPress={goToSymptomPage} />
//       <Button title="Disease Info Page" onPress={goToDiseaseInfoPage} />
//     </View>
//   );
// };
// ---------------------------------------*/

// // function HomePagee() {
// //   return <HomePage/>
// // }

// // function IntroSlider1() {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator initialRouteName="IntroSlider" screenOptions={{
// //           headerShown: false,
// //         }}>
// //         <Stack.Screen name="IntroSlider1" component={IntroSlider1} />
// //         <Stack.Screen name="HomePage" component={HomePagee} />
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // }

// export default IntroSlider1;

// import React, { Component } from "react";
// import { View, Text, Image, Dimensions } from 'react-native';
// import AppIntroSlider from "react-native-app-intro-slider";
// import * as Font from 'expo-font';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import intro1 from './assets/images/intro1.png';
// import intro2 from './assets/images/intro2.png';
// import intro3 from './assets/images/intro3.png';
// import DMSansRegular from './assets/fonts/DMSans-Regular.ttf';
// import DMSansBold from './assets/fonts/DMSans-Bold.ttf';
// import DMSansMedium from './assets/fonts/DMSans-Medium.ttf';
// import AppLoading from "expo-app-loading";
// import { LogBox } from 'react-native';

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


//   renderItem = ({ item }) => {
//     const { fontsLoaded } = this.state;

//     if (!fontsLoaded) {
//       return <AppLoading/>;
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
//     return (
//       <View style={{ flex: 1 }}>
//         <AppIntroSlider
//           renderItem={this.renderItem}
//           data={slides}
//           activeDotStyle={{
//             backgroundColor: '#0AA7FF'
//           }}
//         />
//       </View>
//     );
//   }

// }

// export default IntroSlider1;


import React, { Component } from "react";
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

class IntroSlider1 extends Component {
  state = {
    showHomePage: false,
    fontsLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'DMSans-Regular': DMSansRegular,
      'DMSans-Bold': DMSansBold,
      'DMSans-Medium': DMSansMedium,
    });

    this.setState({ fontsLoaded: true });
    await SplashScreen.preventAutoHideAsync();
    SplashScreen.hideAsync();
  }

  handleSkip = () => {
    const { navigation } = this.props;
    navigation.navigate('HomePage');
  };

  renderItem = ({ item }) => {
    const { fontsLoaded } = this.state;

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
      </View>
    );
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 ,backgroundColor: 'white'}}>
        <AppIntroSlider
          renderItem={this.renderItem}
          data={slides}
          activeDotStyle={{
            backgroundColor: '#0AA7FF'
          }}
          renderNextButton={() => null}
          renderDoneButton={() => (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={this.handleSkip}>
              <Text style={{ fontSize: 18, color: 'blue' }}>Skip</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const IntroSliderWrapper = () => {
  const navigation = useNavigation();

  return <IntroSlider1 navigation={navigation} />;
};

export default IntroSliderWrapper;



