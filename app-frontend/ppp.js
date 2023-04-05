import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';


export default function App() {
  const [symptoms, setSymptoms] = useState('');
  const [symptomsList, setSymptomsList] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [isAskingSymptom, setIsAskingSymptom] = useState(true);

  const handleAddSymptom = () => {
    if (symptoms) {
      setSymptomsList([...symptomsList, symptoms]);
      setSymptoms('');
      console.log("1." + symptoms)

    }
  };

  const handleFinishSymptoms = () => {
    setIsAskingSymptom(false);
    console.log("2." + symptoms)
    handleSubmit()

  };
  console.log("3list." + symptomsList)
  // console.log("4." + isAskingSymptom)

  const renderSymptomItem = ({ item }) => (
    <View style={styles.symptomItem}>
      <Text style={styles.symptomText}>{item}</Text>
    </View>
  );

  const handleSubmit = async () => {
    //     // console.log("afte0")
    //     if (symptoms === 'end') {
    //     console.log("inside end")
    //    
    setSymptoms('');
    //       return;
    //     }
    //     const message = { message: symptoms };
    //     setChatMessages([...chatMessages, message]);
    //     // console.log("afte1")
    //     console.log(symptoms)

    try {
      const response = await fetch('http://192.168.1.73:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ symptoms: symptomsList })
      });
      //       // console.log("afte2")

      const data = await response.json();
      setPrediction(data.prediction);
      // const responseMessage = { message: `The result is ${data.prediction}.` };
      // setChatMessages([...chatMessages, responseMessage]);
    } catch (error) {
      console.error(error);
    }
    // setSymptoms('');
  };
  //   // console.log("afte3")

  let outputText = '';
  if (prediction) {
    outputText = `The result is ${prediction}.`;
  } else {
    outputText = 'No result yet.';
  }

  return (
    <View style={styles.container}>
      {/* {isAskingSymptom ? ( */}
      <>
        <Text style={styles.prompt}>How are you feeling?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a symptom"
            value={symptoms}
            onChangeText={setSymptoms}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddSymptom}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.symptomsList}
          data={symptomsList}
        //   renderItem={renderSymptomItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleFinishSymptoms}>
          <Text style={styles.submitButtonText}>Finish</Text>
        </TouchableOpacity>
      </>
      {/* // ) : ( */}
      <>
        {/* <Text style={styles.prompt}>Thank youuu. Your symptoms have been recorded.</Text> */}
        <Text style={styles.prompt}>{outputText}</Text>
        <FlatList
          style={styles.symptomsList}
          data={symptomsList}
        //   renderItem={renderSymptomItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </>

      {/* // )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    paddingTop: 50,
    paddingLeft: 50,
    paddingRight: 50
  },
  prompt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    borderRadius: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  symptomsList: {
    flex: 1,
    width: '100%',
    // paddingHorizontal: 20,
  },
  symptomItem: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
  },
  symptomText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20

  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});