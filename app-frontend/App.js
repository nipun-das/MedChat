// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';


// export default function App() {
//   const [symptoms, setSymptoms] = useState('');
//   const [symptomsList, setSymptomsList] = useState([]);
//   const [prediction, setPrediction] = useState('');
//   const [isAskingSymptom, setIsAskingSymptom] = useState(true);

//   const handleAddSymptom = () => {
//     if (symptoms) {
//       setSymptomsList([...symptomsList, symptoms]);
//       setSymptoms('');
//       console.log("1." + symptoms)

//     }
//   };

//   const handleFinishSymptoms = () => {
//     setIsAskingSymptom(false);
//     console.log("2." + symptoms)
//     handleSubmit()

//   };
//   console.log("3list." + symptomsList)
//   // console.log("4." + isAskingSymptom)

//   const renderSymptomItem = ({ item }) => (
//     <View style={styles.symptomItem}>
//       <Text style={styles.symptomText}>{item}</Text>
//     </View>
//   );

//   const handleSubmit = async () => {
//     //     // console.log("afte0")
//     //     if (symptoms === 'end') {
//     //     console.log("inside end")
//     //    
//     setSymptoms('');
//     //       return;
//     //     }
//     //     const message = { message: symptoms };
//     //     setChatMessages([...chatMessages, message]);
//     //     // console.log("afte1")
//     //     console.log(symptoms)

//     try {
//       const response = await fetch('http://192.168.1.73:5000/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ symptoms: symptomsList })
//       });
//       //       // console.log("afte2")

//       const data = await response.json();
//       setPrediction(data.prediction);
//       // const responseMessage = { message: `The result is ${data.prediction}.` };
//       // setChatMessages([...chatMessages, responseMessage]);
//     } catch (error) {
//       console.error(error);
//     }
//     // setSymptoms('');
//   };
//   //   // console.log("afte3")

//   let outputText = '';
//   if (prediction) {
//     outputText = `The result is ${prediction}.`;
//   } else {
//     outputText = 'No result yet.';
//   }

//   return (
//     <View style={styles.container}>
//       {/* {isAskingSymptom ? ( */}
//       <>
//         <Text style={styles.prompt}>How are you feeling?</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter a symptom"
//             value={symptoms}
//             onChangeText={setSymptoms}
//           />
//           <TouchableOpacity style={styles.addButton} onPress={handleAddSymptom}>
//             <Text style={styles.addButtonText}>Add</Text>
//           </TouchableOpacity>
//         </View>
//         <FlatList
//           style={styles.symptomsList}
//           data={symptomsList}
//           renderItem={renderSymptomItem}
//           keyExtractor={(item, index) => index.toString()}
//         />
//         <TouchableOpacity style={styles.submitButton} onPress={handleFinishSymptoms}>
//           <Text style={styles.submitButtonText}>Finish</Text>
//         </TouchableOpacity>
//       </>
//       {/* // ) : ( */}
//       <>
//         {/* <Text style={styles.prompt}>Thank youuu. Your symptoms have been recorded.</Text> */}
//         <Text style={styles.prompt}>{outputText}</Text>
//         <FlatList
//           style={styles.symptomsList}
//           data={symptomsList}
//           renderItem={renderSymptomItem}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       </>

//       {/* // )} */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: "white",
//     paddingTop: 50,
//     paddingLeft: 50,
//     paddingRight: 50
//   },
//   prompt: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#777',
//     padding: 8,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   addButton: {
//     backgroundColor: '#4CAF50',
//     padding: 10,
//     borderRadius: 10,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   symptomsList: {
//     flex: 1,
//     width: '100%',
//     // paddingHorizontal: 20,
//   },
//   symptomItem: {
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//     backgroundColor: '#f2f2f2',
//   },
//   symptomText: {
//     fontSize: 16,
//   },
//   submitButton: {
//     backgroundColor: '#2196F3',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 20

//   },
//   submitButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// export default function App() {
//   const [inputText, setInputText] = useState('');

//   const [symptoms, setSymptoms] = useState('');
//   const [symptomsList, setSymptomsList] = useState([]);
//   const [prediction, setPrediction] = useState('');
//   const [isAskingSymptom, setIsAskingSymptom] = useState(true);


//   const handleAddSymptom = () => {
//     if (symptoms) {
//       setSymptomsList([...symptomsList, symptoms]);
//       setSymptoms('');
//       console.log("1." + symptoms)
//       handleUserSend()

//     }
//   };

//   const handleFinishSymptoms = () => {
//     setIsAskingSymptom(false);
//     console.log("2." + symptomsList)
//     handleSubmit()

//   };

//   const handleSubmit = async () => {
//     //     // console.log("afte0")
//     //     if (symptoms === 'end') {
//     //     console.log("inside end")
//     //    
//     // setSymptoms('');
//     //       return;
//     //     }
//     //     const message = { message: symptoms };
//     //     setChatMessages([...chatMessages, message]);
//     //     // console.log("afte1")
//     //     console.log(symptoms)

//     try {
//       const response = await fetch('http://192.168.1.73:5000/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ symptoms: symptomsList })
//       });
//       //       // console.log("afte2")

//       const data = await response.json();
//       setPrediction(data.prediction);
//       // const responseMessage = { message: `The result is ${data.prediction}.` };
//       // setChatMessages([...chatMessages, responseMessage]);
//     } catch (error) {
//       console.error(error);
//     }
//     // setSymptoms('');
//   };
//   //   // console.log("afte3")




//   const [userMessages, setUserMessages] = useState([]);

//   const handleUserSend = () => {
//     // if (inputText.trim() === '') {
//     //   return;
//     // }
//     setUserMessages((prevMessages) => [
//       ...prevMessages,
//       { text: symptoms, sender: 'user' },
//     ]);
//     // console.log("usermsg : ", userMessages)
//     // console.log("inputtext : ", inputText)
//     // setInputText('');
//     // Call your chatbot API with the inputText here and add the chatbot's response to the messages state
//   };
//   //   const handleFinishSymptoms = () => {
//   //     setIsAskingSymptom(false);
//   //     console.log("2." + symptoms)
//   //     handleSubmit()

//   // const [chatResponses, setChatResponses] = useState([])

//   // const handleChatResponse = () => {
//   //   setChatResponses((prevMessages) => [
//   //     ...prevMessages,
//   //     { text: outputText, sender: 'chat' },
//   //   ]);
//   // }

//   let outputText = '';
//   if (prediction) {
//     outputText = `The result is ${prediction}.`;
//     // handleChatResponse()
//   } else {
//     outputText = 'No result yet.';
//     // handleChatResponse()
//   }

//   //   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.messagesContainer}>
//         {userMessages.map((message, index) => (
//           <View
//             key={index}
//             style={[
//               styles.message,
//               message.sender === 'user' ? styles.userMessage : styles.chatbotMessage,
//             ]}>
//             <Text>{message.text}</Text>
//           </View>
//         ))}
//       </View>
//       {/* <View style={styles.messagesContainer}>
//         {chatResponses.map((message, index) => (
//           <View
//             key={index}
//             style={[
//               styles.message,
//               message.sender === 'chat' ? styles.chatMessage : styles.chatbotMessage,
//             ]}>
//             <Text>{message.text}</Text>
//           </View>
//         ))}
//       </View> */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type your message here..."
//           value={symptoms}
//           onChangeText={setSymptoms}

//         />
//         <TouchableOpacity style={styles.sendButton} onPress={handleFinishSymptoms}>
//           {/* handleSend */}
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.addButton} onPress={handleAddSymptom}>
//           {/* handleSend */}
//           <Text style={styles.addButtonText}>Add</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

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
            {/* handleSend */}
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddSymptom}>
            {/* handleSend */}
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
