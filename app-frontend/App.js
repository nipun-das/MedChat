import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, FlatList } from 'react-native';

export default function App() {
  const [responses, setResponses] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [cgpa, setcgpa] = useState('');
  const [iq, setiq] = useState('');
  const [profile_score, setprofile_score] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    const message = { message: cgpa };
    setChatMessages([...chatMessages, message]);
    const formData = new FormData();
    formData.append('cgpa', cgpa);
    formData.append('iq', iq);
    formData.append('profile_score', profile_score);
    try {
      const response = await fetch('https://test-backend-lpvl.onrender.com/predict', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      })
      const data = await response.json();
      const placement = data.placement;
      const responseMessage = { message: placement === '1' ? 'The result is positive!' : 'The result is negative.' };
      setChatMessages([...chatMessages, responseMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  let outputText = '';
  if (result === '1') {
    outputText = 'The result is positive!';
  } else if (result === '0') {
    outputText = 'The result is negative.';
  }
  else {
    outputText = 'No result yet.';
  }


  return (
    <View style={styles.containerouter}>
      <View style={styles.containerform}>
        <Text style={{ fontSize: 20, fontWeight: "800" }}>PLACEMENT PREDICTOR</Text>
        <TextInput style={styles.input}
          placeholder="cgpa"
          onChangeText={text => setcgpa(text)}
          value={cgpa}
        />
        <TextInput style={styles.input}
          placeholder="iq"
          onChangeText={text => setiq(text)}
          value={iq}
        />
        <TextInput style={styles.input}
          placeholder="profile_score"
          onChangeText={text => setprofile_score(text)}
          value={profile_score}
        />
        <Button
          title="predict"
          onPress={handleSubmit}
        />
      </View>
      {/* <Text style={styles.out}>{outputText}</Text> */}
      {responses.map((response, index) => (
        <Text key={index} style={styles.out}>{response === '1' ? 'The result is positive!' : 'The result is negative.'}</Text>
      ))}
      <FlatList
        data={chatMessages}
        renderItem={({ item }) => (
          <View style={styles.chatMessageContainer}>
            <Text style={styles.chatMessage}>{item.message}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerouter: {
    flex: 1,

  },
  containerform: {
    paddingTop: 50,
    alignItems: "center",
    paddingBottom: 20
  },
  input: {
    marginTop: 50
  },
  out: {
    fontSize: 10

  },
  chatMessageContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
    alignSelf: 'flex-start'
  },
  chatMessage: {
    fontSize: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: '80%',
    borderRadius: 10
  }
})
