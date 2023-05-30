import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { LogBox } from 'react-native';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
// Ignore the VirtualizedLists warning
// LogBox.ignoreLogs(['VirtualizedLists should never be nested']);


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
      "1What symptoms are you experiencing?",
      "2Can you tell me more about your symptoms?",
      "3How are you feeling today?",
    ],
  };

  const handleAddSymptom = () => {
    if (symptoms) {
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
        // Add symptom to the symptom list
        setSymptomsList([...symptomsList, symptoms]);
        setSymptoms('');
        console.log("1." + symptoms);
  
        setIsGreeting(false);
  
        // Use a symptom prompt
        const prompt = prompts.symptom[Math.floor(Math.random() * prompts.symptom.length)];
        setChatbotResponses(prevResponses => [...prevResponses, { text: prompt, sender: 'chatbot' }]);
        setLastSender("chatbot");
      }
    }
  };
  


  const handleFinishSymptoms = () => {
    setIsAskingSymptom(false);
    // console.log("2." + symptomsList)
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
    // handleMenuClose();
    // menuRef.current.hide();

  };

  const handleSubmit = async () => {
    console.log("list" + symptomsList)
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




  // const scrollViewRef = useRef();

  // useEffect(() => {
  //   scrollViewRef.current.scrollToEnd({ animated: true });
  // });


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




  // const TopBar = () => {
  const MenuIcon = require('./assets/images/hamburger-icon.png');

  const menuRef = useRef(null);



  const handlePlaceholderOption = () => {
    // Implement your logic for the placeholder option here
    // ...
    // menuRef.current.hide();
  };


  const flatListRef = useRef(null);
  useEffect(() => {
    if (flatListRef.current && chatbotResponses.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chatbotResponses]);


  return (

    <MenuProvider>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.topBar}>
            <View style={styles.profileContainer}>
              <Image source={require('./assets/images/chat-icon.png')} style={styles.profilePicture} />
              <View style={styles.medContainer}>
                <Text style={styles.profileName}>MedChat</Text>
                <Text style={styles.online}>Online</Text>
              </View>
            </View>
            <View style={styles.menuContainer}>
              <Menu>
                <MenuTrigger>
                  <Image source={require('./assets/images/white-hamburger-icon.png')} style={styles.menuIcon} />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption onSelect={handleReloadChat}>
                    <Text style={styles.menuOption}>Reload</Text>
                  </MenuOption>
                  {/* Add more menu options here */}
                </MenuOptions>
              </Menu>
            </View>
          </View>
        </SafeAreaView>


        {/* <ScrollView ref={scrollViewRef}> */}
        {/* <ScrollView ref={scrollViewRef}> */}



        <FlatList
          ref={flatListRef}
          data={combinedMessages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const messageStyle = item.sender === 'user' ? styles.userMessage : styles.chatbotMessage;
            const messageContainerStyle = item.sender === 'user' ? styles.userMessageContainer : styles.chatbotMessageContainer;
            const avatarIcon = item.sender === 'chatbot' ? require('./assets/images/chatbot-iconn.png') : null;
            return (
              <View style={messageContainerStyle}>
                {item.sender === 'chatbot' && (
                  <View style={styles.avatarContainer}>
                    <Image source={avatarIcon} style={styles.avatar} />
                  </View>
                )}
                <View style={[styles.message, messageStyle]}>
                  <Text style={styles.text}>{item.text.text}</Text>
                </View>
                {item.sender === 'user' && (
                  <View style={styles.avatarContainer}>
                    <Image source={avatarIcon} style={styles.avatar} />
                  </View>
                )}
              </View>
            );
          }}
          ListHeaderComponent={<View style={styles.header} />}
          ListFooterComponent={<View style={styles.footer} />}
          contentContainerStyle={styles.flatListContent}
        />


        {/* </ScrollView> */}
        {/* </ScrollView> */}






        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message here..."
            value={symptoms}
            onChangeText={setSymptoms}

          />

          <TouchableOpacity style={styles.addButton} onPress={handleAddSymptom}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleFinishSymptoms}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>

      </View>
    </MenuProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesContainer: {
    flex: 1,
    padding: 3,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'white'
  },
  avatarContainer: {
    alignItems: 'flex-start',
    marginRight: 4,
    marginLeft: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    // borderRadius: 20,
  },
  // userMessageContainer: {
  //   // backgroundColor: '#DCF8C6',
  //   // marginLeft: 'auto',
  //   // flexDirection: 'row',
  //   // alignItems: 'center',
  // },
  chatbotMessageContainer: {
    // backgroundColor: '#F3F3F3',
    // marginRight: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    flexDirection: 'row', // Add this line to align the icon and text horizontally
    alignItems: 'center',
    padding: 10,
    // borderRadius: 8,
    // marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50
  },

  userMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'green',
    marginRight: 10,
    marginTop:5,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#fff',
    fontFamily: "DMSans-Regular"
  },
  chatbotMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#005D6C',
    maxWidth: 230,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    fontFamily: "DMSans-Regular",
    marginLeft: 4,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop:5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#005D6C',
    // position: 'absolute',
    bottom: 0,
    padding: 10,
    width: 370,
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

  addButton: {
    marginLeft: 8,
    backgroundColor: "#3CCDE1",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    width: 56,
  },
  addButtonText: {
    color: 'black',
    fontFamily: "DMSans-Regular"
  },
  sendButton: {
    marginRight: 11,
    marginLeft: 11,
    backgroundColor: "black",
    paddingHorizontal: 11,
    paddingVertical: 10,
    borderRadius: 8,
    width: 56,

  },
  sendButtonText: {
    color: 'white',
    fontFamily: "DMSans-Regular",

  },



  header: {
    height: 0,
  },
  footer: {
    height: 0,
  },
  flatListContent: {
    flexGrow: 1,
  },
  topBar: {
    marginTop: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 80,
    backgroundColor: '#005D6C',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 46,
    height: 46,
    marginRight: 12,
    marginLeft: 26,
    marginBottom: 10
    // borderRadius: 15,
  },
  medContainer: {
    marginBottom: 8,
  },
  profileName: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: "DMSans-Medium",
    // backgroundColor:'yellow',
    // marginBottom: 29,
    color: 'white',
  },
  online: {
    fontSize: 14,
    color: '#00FF1A',
    fontFamily: "DMSans-Medium",
    marginRight: 40,
    // marginTop: 2,
  },
  menuContainer: {
    marginRight: 6,
    marginBottom: 15,
  },
  menuIcon: {
    width: 20,
    height: 20,
    // color: "white"

  },
  menuOption: {
    padding: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

});

