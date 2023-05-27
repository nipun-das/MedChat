import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { LogBox } from 'react-native';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native';
// Ignore the VirtualizedLists warning
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);


export default function PredictionPage() {
  const [inputText, setInputText] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [symptomsList, setSymptomsList] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [isAskingSymptom, setIsAskingSymptom] = useState(true);
  const [chatbotResponses, setChatbotResponses] = useState([]);
  const [isGreeting, setIsGreeting] = useState(true);
  const [isChatbotOnline, setIsChatbotOnline] = useState(true); // Online/offline status of the chatbot



  const [userMessages, setUserMessages] = useState([]);
  const [lastSender, setLastSender] = useState("chatbot");

  const prompts = {
    greeting: [
      "Hey there! How are you feeling today?",
      "Hello! What's going on?",
      "Hi user!",
      "Hello user!",
      "Hey nice to meet you!",
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
        setLastSender("chatbot");
        // setUserSendState(false)
      } else {
        // use a symptom prompt
        const prompt = prompts.symptom[Math.floor(Math.random() * prompts.symptom.length)];
        setChatbotResponses([...chatbotResponses, { text: prompt, sender: 'chatbot' }]);
        setLastSender("chatbot");
        // setUserSendState(false)
        // handleSubmit();
      }
    }
  };

  const handleFinishSymptoms = () => {
    setIsAskingSymptom(false);
    console.log("2." + symptomsList)
    handleSubmit()
  };

  const handleReloadChat = () => {
    // Reset the chat state here
    setUserMessages([]);
    setChatbotResponses([]);
    setIsGreeting(true);
    setSymptomsList([]);
    setPrediction('');
    setIsAskingSymptom(true);
    setSymptoms('');
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.1.76:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ symptoms: symptomsList })
      });

      const data = await response.json();
      setPrediction(data.prediction);

      setChatbotResponses([...chatbotResponses, { text: data.prediction, sender: 'chatbot' }]);
      setLastSender("chatbot");
    } catch (error) {
      console.error(error);
    }
  };



  // const handleUserSend = () => {
  //   const lowerCaseInput = symptoms.toLowerCase();
  //   setUserMessages((prevMessages) => [...prevMessages, { text: symptoms, sender: 'user' },]);
  //   setLastSender("user");
  //   // check if the user input matches a greeting prompt
  //   const greetingPrompt = Object.values(prompts.greeting).find(prompt =>
  //     prompt.toLowerCase().includes(lowerCaseInput)
  //   );

  //   if (greetingPrompt) {
  //     setIsGreeting(true);
  //   } else {
  //     setSymptomsList([...symptomsList, symptoms]);
  //     setSymptoms('');
  //     setIsGreeting(false);
  //   }
  //   // setUserSendState(true) ////////////////////////////////////
  // };
  const handleUserSend = () => {
    const lowerCaseInput = symptoms.toLowerCase();
    setUserMessages((prevMessages) => [...prevMessages, { text: symptoms, sender: 'user' }]);
    setLastSender("user");

    // Check if the user input contains greeting words
    const greetingWords = ["hey", "hi", "hello"];
    const hasGreeting = greetingWords.some(word => lowerCaseInput.includes(word));

    if (hasGreeting) {
      setIsGreeting(true);
      // Use a greeting prompt
      const prompt = prompts.greeting[Math.floor(Math.random() * prompts.greeting.length)];
      setChatbotResponses(prevResponses => [...prevResponses, { text: prompt, sender: 'chatbot' }]);
      setLastSender("chatbot");
    } else {
      setSymptomsList([...symptomsList, symptoms]);
      setSymptoms('');
      setIsGreeting(false);
    }
  };

  const renderChatItem = ({ item }) => {
    return (
      <View style={styles.messagesContainer}>
        <View style={[styles.message, item.sender === "user" ? styles.userMessage : styles.chatbotMessage]}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const scrollViewRef = useRef();
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  });
  const chatItems = [].concat(
    userMessages.map((message, index) => (
      <View style={styles.messagesContainer} key={index}>
        <View style={[styles.message, styles.userMessage]}>
          <Text style={styles.text}>{message.text}</Text>
        </View>
      </View>
    )),
    chatbotResponses.map((message, index) => (
      <View style={styles.messagesContainer} key={index}>
        <View style={[styles.message, styles.chatbotMessage]}>
          <Text style={styles.text}>{message.text}</Text>
        </View>
      </View>
    ))
  );


  // const messages = [];

  // userMessages.forEach((message, index) => {
  //   messages.push({ text: message, sender: 'user', id: index });
  //   if (chatbotResponses[index]) {
  //     messages.push({ text: chatbotResponses[index], sender: 'chatbot', id: index + 1 });
  //   }
  // });
  //put a count ..
  //check odd even

  const combinedMessages = [];
  number = 0;
  for (let i = 0; i < userMessages.length || i < chatbotResponses.length; i++) {
    if (userMessages[i]) {
      number += 1;
      combinedMessages.push({ text: userMessages[i], sender: "user", number });

    }
    if (chatbotResponses[i]) {
      number += 1;
      combinedMessages.push({ text: chatbotResponses[i], sender: "chatbot", number });
    }
  }
  console.log(combinedMessages, "\n")
  // const chatTexts = chatItems.map((item) => item.text);
  return (

    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.profileContainer}>
            <Image
              source={require('./assets/images/hamburger-icon.png')}
              style={styles.profilePicture}
            />
            <Text style={styles.profileName}>Chatbot Name</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{isChatbotOnline ? 'Online' : 'Offline'}</Text>
          </View>
          <TouchableOpacity style={styles.reloadButton} onPress={handleReloadChat}>
            <Text style={styles.reloadButtonText}>Reload</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView ref={scrollViewRef}>
        <FlatList
          data={combinedMessages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const messageStyle = item.sender === 'user' ? styles.userMessage : styles.chatbotMessage;
            return (
              <View style={styles.messagesContainer}>
                <View style={[styles.message, messageStyle]}>
                  <Text style={styles.text}>{item.text.text}</Text>
                </View>
              </View>
            );
          }}
          ListHeaderComponent={<View style={styles.header} />} // Add this line
          ListFooterComponent={<View style={styles.footer} />} // Add this line
          contentContainerStyle={styles.flatListContent} // Add this line
        />



      </ScrollView>

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

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  messagesContainer: {
    flex: 1,
    // marginTop: 50,
    padding: 3,
    backgroundColor: '#4CAF50',

    // backgroundColor: "blue",
    // marginBottom: 50
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
    backgroundColor: '#007AFF',
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
  header: {
    height: 0,
  },

  footer: {
    height: 0,
  },

  // flatListContent: {
  //   flexGrow: 1,
  // },


  topBar: {
    marginTop: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#FFF',
  },
  reloadButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#2196F3',
    borderRadius: 12,
  },
  reloadButtonText: {
    fontSize: 12,
    color: '#FFF',
  },
});

