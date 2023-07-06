import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Modal } from 'react-native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
const { width } = Dimensions.get('window');

const HomeNew = () => {
  const navigation = useNavigation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleAboutModal = () => {
    setShowAboutModal(!showAboutModal);
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
    toggleSidebar();
    toggleAboutModal();
  };



  const closeSidebar = () => {
    setShowSidebar(false);
  };
  return (
    <TouchableWithoutFeedback onPress={closeSidebar} accessible={false}>
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

      <Modal visible={showAboutModal} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleAboutModal}>
            <Image
              source={require('./assets/images/close.png')}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <View style={styles.aboutContent}>
            <View style={styles.aboutTitleContainer}>
              <Text style={styles.aboutTitle1}>MedChat</Text>
              <Text style={styles.aboutTitle2}> v1.0</Text>
            </View>
            <Text style={styles.aboutDesc}>An app to help you with disease prediction, disease information, and finding nearby hospitals.</Text>
            <Text style={styles.aboutTitle3}>Team Members</Text>
            <Text style={styles.memberName}>Nipun Das</Text>
            <Text style={styles.memberName}>Abhinav Purushothaman</Text>
            <Text style={styles.memberName}>Jishnu P</Text>
            <Text style={styles.memberName}>Joel Jose</Text>

            {/* Add more team member names here */}
          </View>
        </View>
      </Modal>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: 'white',
  },
  aboutTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    resizeMode: 'contain'
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: 'black',
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
  cardContainer: {},
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
  span: {
    color: 'blue'
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
  sidebar: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    zIndex: 10,
  },
  sidebarOption: {
    fontSize: 18,
    fontFamily: 'DMSans-Medium',
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F3FBFF',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: 'black',
  },
  aboutContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutTitle1: {
    fontSize: 24,
    fontFamily: 'DMSans-Bold',
    marginBottom: 10,
    color: '#29A9E4',

  },
  aboutTitle2: {
    fontSize: 20,
    fontFamily: 'DMSans-Bold',
    marginBottom: 10,
    color: '#F4C430',

  },
  memberName: {
    fontSize: 18,
    fontFamily: 'DMSans-Medium',
    marginBottom: 10,
  },
  aboutTitle3: {
    fontSize: 24,
    fontFamily: 'DMSans-Bold',
    marginBottom: 20,

  },
  aboutDesc: {
    fontSize: 15,
    fontFamily: 'DMSans-Medium',
    marginBottom: 50,
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15
  }
});

export default HomeNew
