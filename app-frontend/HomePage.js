import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomePage = ({ navigation }) => {
  const goToSymptomPage = () => {
    navigation.navigate('PredictionPage');
  };

  const goToDiseaseInfoPage = () => {
    navigation.navigate('DiseaseInfoPage');
  };

  return (
    <View style={styles.container}>
      <Button title="Symptom Page" onPress={goToSymptomPage} />
      <Button title="Disease Info Page" onPress={goToDiseaseInfoPage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomePage;





