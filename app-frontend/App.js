// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, StyleSheet, FlatList } from 'react-native';

// export default function App() {
//   const [responses, setResponses] = useState([]);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [cgpa, setcgpa] = useState('');
//   const [iq, setiq] = useState('');
//   const [profile_score, setprofile_score] = useState('');
//   const [result, setResult] = useState('');

//   const handleSubmit = async () => {
//     const message = { message: cgpa };
//     setChatMessages([...chatMessages, message]);
//     const formData = new FormData();
//     formData.append('cgpa', cgpa);
//     formData.append('iq', iq);
//     formData.append('profile_score', profile_score);
//     try {
//       const response = await fetch('http://localhost:5000/predict', {
//         method: 'POST',
//         // headers: {
//         //   'Content-Type': 'application/json'
//         // },
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         body: formData
//       })
//       const data = await response.json();
//       const placement = data.placement;
//       const responseMessage = { message: placement === '1' ? 'The result is positive!' : 'The result is negative.' };
//       setChatMessages([...chatMessages, responseMessage]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   let outputText = '';
//   if (result === '1') {
//     outputText = 'The result is positive!';
//   } else if (result === '0') {
//     outputText = 'The result is negative.';
//   }
//   else {
//     outputText = 'No result yet.';
//   }


//   return (
//     <View style={styles.containerouter}>
//       <View style={styles.containerform}>
//         <Text style={{ fontSize: 20, fontWeight: "800" }}>Work avumo?</Text>
//         <TextInput style={styles.input}
//           placeholder="cgpa"
//           onChangeText={text => setcgpa(text)}
//           value={cgpa}
//         />
//         <TextInput style={styles.input}
//           placeholder="iq"
//           onChangeText={text => setiq(text)}
//           value={iq}
//         />
//         <TextInput style={styles.input}
//           placeholder="profile_score"
//           onChangeText={text => setprofile_score(text)}
//           value={profile_score}
//         />
//         <Button
//           title="predict"
//           onPress={handleSubmit}
//         />
//       </View>
//       {/* <Text style={styles.out}>{outputText}</Text> */}
//       {responses.map((response, index) => (
//         <Text key={index} style={styles.out}>{response === '1' ? 'The result is positive!' : 'The result is negative.'}</Text>
//       ))}
//       <FlatList
//         data={chatMessages}
//         renderItem={({ item }) => (
//           <View style={styles.chatMessageContainer}>
//             <Text style={styles.chatMessage}>{item.message}</Text>
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   containerouter: {
//     flex: 1,

//   },
//   containerform: {
//     paddingTop: 50,
//     alignItems: "center",
//     paddingBottom: 20
//   },
//   input: {
//     marginTop: 50
//   },
//   out: {
//     fontSize: 10

//   },
//   chatMessageContainer: {
//     backgroundColor: '#f2f2f2',
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: 5,
//     maxWidth: '80%',
//     alignSelf: 'flex-start'
//   },
//   chatMessage: {
//     fontSize: 16
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#777',
//     padding: 8,
//     margin: 10,
//     width: '80%',
//     borderRadius: 10
//   }
// })
////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, StyleSheet, FlatList } from 'react-native';

// export default function App() {
//   const [responses, setResponses] = useState([]);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [symptoms, setSymptoms] = useState('');
//   const [prediction, setPrediction] = useState('');

//   const handleSubmit = async () => {
//     // console.log("afte0")
//     if (symptoms === 'end') {
//     console.log("inside end")
//       setSymptoms('');
//       return;
//     }
//     const message = { message: symptoms };
//     setChatMessages([...chatMessages, message]);
//     // console.log("afte1")
//     console.log(symptoms)

//     try {
//       const response = await fetch('http://localhost:5000/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ symptoms: [symptoms] })
//       });
//       // console.log("afte2")

//       const data = await response.json();
//       setPrediction(data.prediction);
//       const responseMessage = { message: `The result is ${data.prediction}.` };
//       setChatMessages([...chatMessages, responseMessage]);
//     } catch (error) {
//       console.error(error);
//     }
//     setSymptoms('');
//   };
//   // console.log("afte3")

//   let outputText = '';
//   if (prediction) {
//     outputText = `The result is ${prediction}.`;
//   } else {
//     outputText = 'No result yet.';
//   }

//   return (
//     <View style={styles.containerouter}>
//       <View style={styles.containerform}>
//         <Text style={{ fontSize: 20, fontWeight: "800" }}>Work avumo?</Text>
//         <TextInput style={styles.input}
//           placeholder="Enter a symptom or type 'end' to finish"
//           onChangeText={text => setSymptoms(text)}
//           value={symptoms}
//         />
//         <Button
//           title="Submit"
//           onPress={handleSubmit}
//         />
//       </View>
//       <Text style={styles.out}>{outputText}</Text>
//       <FlatList
//         data={chatMessages}
//         renderItem={({ item }) => (
//           <View style={styles.chatMessageContainer}>
//             <Text style={styles.chatMessage}>{item.message}</Text>
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   containerouter: {
//     flex: 1,
//   },
//   containerform: {
//     paddingTop: 50,
//     alignItems: "center",
//     paddingBottom: 20
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#777',
//     padding: 8,
//     margin: 10,
//     width: '80%',
//     borderRadius: 10
//   },
//   out: {
//     fontSize: 20,
//     textAlign: 'center',
//     marginVertical: 10
//   },
//   chatMessageContainer: {
//     backgroundColor: '#f2f2f2',
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: 5,
//     maxWidth: '80%',
//     alignSelf: 'flex-start'
//   },
//   chatMessage: {
//     fontSize: 16
//   }
// });

// ----------------------

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

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
      const response = await fetch('http://localhost:5000/predict', {
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
      {isAskingSymptom ? (
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
            renderItem={renderSymptomItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleFinishSymptoms}>
            <Text style={styles.submitButtonText}>Finish</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.prompt}>Thank you. Your symptoms have been recorded.</Text>
          <Text style={styles.prompt}>{outputText}</Text>
          <FlatList
            style={styles.symptomsList}
            data={symptomsList}
            renderItem={renderSymptomItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingHorizontal: 20,
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
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
