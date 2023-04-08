import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');

  const [symptoms, setSymptoms] = useState('');
  const [symptomsList, setSymptomsList] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [isAskingSymptom, setIsAskingSymptom] = useState(true);
  const [chatbotResponses, setChatbotResponses] = useState([]);
  const [isGreeting, setIsGreeting] = useState(true);
  const prompts = {
    greeting: [
      "Hey there! How are you feeling today?",
      "Hello! What's going on?",
      "Hi! What symptoms are you experiencing?",
      "Hi user!",
      "Hello user!",
      "hey nice to meet you!",
    ],
    symptom: [
      "What symptoms are you experiencing?",
      "Can you tell me more about your symptoms?",
      "How are you feeling today?",
    ],
  };

  const handleAddSymptom = () => {
    if (symptoms) {
      setSymptomsList([...symptomsList, symptoms]);
      setSymptoms('');
      console.log("1." + symptoms)
      handleUserSend()

      if (isGreeting) {
        // use a greeting prompt
        const prompt = prompts.greeting[Math.floor(Math.random() * prompts.greeting.length)];
        setChatbotResponses([...chatbotResponses, { text: prompt, sender: 'chatbot' }]);
        
      } else {
        // use a symptom prompt
        const prompt = prompts.symptom[Math.floor(Math.random() * prompts.symptom.length)];
        setChatbotResponses([...chatbotResponses, { text: prompt, sender: 'chatbot' }]);
        // handleSubmit();
      }
    }
  };

  const handleFinishSymptoms = () => {
    setIsAskingSymptom(false);
    console.log("2." + symptomsList)
    handleSubmit()
  };

  // const handleFinishSymptoms = () => {
  //   if (isGreeting) {
  //     // use a greeting prompt
  //     const prompt = prompts.greeting[Math.floor(Math.random() * prompts.greeting.length)];
  //     setChatbotResponses([...chatbotResponses, { text: prompt, sender: 'chatbot' }]);
      
  //   } else {
  //     // use a symptom prompt
  //     const prompt = prompts.symptom[Math.floor(Math.random() * prompts.symptom.length)];
  //     setChatbotResponses([...chatbotResponses, { text: prompt, sender: 'chatbot' }]);
  //     handleSubmit();
  //   }
  //   setIsAskingSymptom(false);
  // };


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

  // const handleUserSend = () => {
  //   setUserMessages((prevMessages) => [...prevMessages, { text: symptoms, sender: 'user' },]);
  // };

  const handleUserSend = () => {
    const lowerCaseInput = symptoms.toLowerCase();
    setUserMessages((prevMessages) => [...prevMessages, { text: symptoms, sender: 'user' },]);

    // check if the user input matches a greeting prompt
    const greetingPrompt = Object.values(prompts.greeting).find(prompt =>
      prompt.toLowerCase().includes(lowerCaseInput)
    );

    if (greetingPrompt) {
      setIsGreeting(true);
    } else {
      setSymptomsList([...symptomsList, symptoms]);
      setSymptoms('');
      setIsGreeting(false);
    }
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
              response.sender === 'chatbot' ? styles.chatbotMessage : styles.userMessage,
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
          {/* <TextInput
            style={[
              styles.message,
              response.sender === 'user' ? styles.userMessage : styles.chatbotMessage,
            ]}
            placeholder={isGreeting ? prompts.greeting[0] : prompts.symptom[0]}
            value={symptoms}
            onChangeText={setSymptoms}
          /> */}


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





// fix chat response order