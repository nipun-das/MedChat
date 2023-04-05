import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');

  const [symptoms, setSymptoms] = useState('');
  const [symptomsList, setSymptomsList] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [isAskingSymptom, setIsAskingSymptom] = useState(true);
  const [chatbotResponses, setChatbotResponses] = useState([]);

  const handleAddSymptom = () => {
    if (symptoms) {
      setSymptomsList([...symptomsList, symptoms]);
      setSymptoms('');
      console.log("1." + symptoms)
      handleUserSend()
    }
  };

  const handleFinishSymptoms = () => {
    setIsAskingSymptom(false);
    console.log("2." + symptomsList)
    handleSubmit()
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.1.73:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ symptoms: symptomsList })
      });

      const data = await response.json();
      setPrediction(data.prediction);

      setChatbotResponses([...chatbotResponses, { text: data.prediction, sender: 'chatbot' }]);
    } catch (error) {
      console.error(error);
    }
  };

  const [userMessages, setUserMessages] = useState([]);

  const handleUserSend = () => {
    setUserMessages((prevMessages) => [...prevMessages, { text: symptoms, sender: 'user' },]);
  };

  let outputText = '';
  if (prediction) {
    outputText = `The result is ${prediction}.`;
  } else {
    outputText = 'No result yet.';
  }

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        {userMessages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              message.sender === 'user' ? styles.userMessage : styles.chatbotMessage,
            ]}>
            <Text style={[styles.text]}>{message.text}</Text>
          </View>
        ))}
        {chatbotResponses.map((response, index) => (
          <View
            key={index}
            style={[
              styles.message,
              response.sender === 'user' ? styles.userMessage : styles.chatbotMessage,
            ]}>
            <Text>{response.text}</Text>
          </View>
        ))}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message here..."
            value={symptoms}
            onChangeText={setSymptoms}

          />
          <TouchableOpacity style={styles.sendButton} onPress={handleFinishSymptoms}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddSymptom}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesContainer: {
    flex: 1,
    marginTop: 50,
    padding: 10,
  },
  text: {
    color: 'white'
  },
  message: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    color: '#fff',
  },
  chatbotMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F2F2F2',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    right: 0,
    left: 0,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    width: 60,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
