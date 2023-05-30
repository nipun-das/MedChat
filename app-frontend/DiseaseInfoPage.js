// import  React,{ useEffect, useRef, useState } from 'react';

// import { ScrollView,View, TextInput, Button, Text, StyleSheet } from 'react-native';
// import { parseString } from 'react-native-xml2js';

// const DiseaseInfoPage = () => {
//     const [inputValue, setInputValue] = useState('');
//     const [diseaseInfo, setDiseaseInfo] = useState('');


//     const handleRequest = async () => {
//         try {
//           const response = await fetch(
//             `https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=${inputValue}`
//           );
//           const xmlData = await response.text();
//           parseString(xmlData, (err, result) => {
//             if (err) {
//               console.error(err);
//             } else {
//               const documents = result.nlmSearchResult.list[0].document;
//               if (documents && documents.length > 0) {
//                 const firstDocument = documents[0];
//                 const contentElements = firstDocument.content;
//                 if (contentElements && contentElements.length > 0) {
//                   const fullSummaryElement = contentElements.find(
//                     (c) => c.$.name === 'FullSummary'
//                   );
//                   if (fullSummaryElement) {
//                     const fullSummary = fullSummaryElement._;
//                     const formattedSummary = formatHTML(fullSummary);
//                     setDiseaseInfo(formattedSummary);
//                   } else {
//                     setDiseaseInfo('FullSummary not found');
//                   }
//                 } else {
//                   setDiseaseInfo('Content elements not found');
//                 }
//               } else {
//                 setDiseaseInfo('Documents not found');
//               }
//             }
//           });
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       const formatHTML = (html) => {
//         const paragraphs = html.split('<p>').filter((p) => p !== '');
//         const formattedParagraphs = paragraphs.map((p) => {
//           const strippedText = p.replace(/<\/?[^>]+(>|$)/g, '');
//           return strippedText.trim();
//         });
//         const formattedHTML = formattedParagraphs.join('\n\n');

//         const listItems = formattedHTML.split('<li>').filter((li) => li !== '');
//         const formattedListItems = listItems.map((li) => {
//           const strippedText = li.replace(/<\/?[^>]+(>|$)/g, '');
//           return `• ${strippedText.trim()}`;
//         });
//         const formattedList = formattedListItems.join('\n');

//         return formattedList ? formattedList : formattedHTML;
//       };

//     const scrollViewRef = useRef();
//     useEffect(() => {
//       scrollViewRef.current.scrollToEnd({ animated: true });
//     });

//     return (
//         <ScrollView ref={scrollViewRef}>
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Enter a disease"
//                 value={inputValue}
//                 onChangeText={text => setInputValue(text)}
//             />
//             <Button title="Send Request" onPress={handleRequest} />
//             {diseaseInfo ? (
//                 <Text style={styles.infoText}>{diseaseInfo}</Text>
//             ) : null}
//         </View>
//         </ScrollView>

//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         paddingTop:50,
//         justifyContent: 'center',
//         paddingHorizontal: 20,
//     },
//     input: {
//         height: 40,
//         width: '100%',
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingHorizontal: 10,
//     },
//     infoText: {
//         marginTop: 20,
//         fontSize: 16,
//         color:'black'
//     },
// });


// export default DiseaseInfoPage;



import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { parseString } from 'react-native-xml2js';

const DiseaseInfoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [diseaseInfo, setDiseaseInfo] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleRequest = async () => {
    try {
      const response = await fetch(
        `https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=${inputValue}`
      );
      const xmlData = await response.text();
      parseString(xmlData, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          const documents = result.nlmSearchResult.list[0].document;
          if (documents && documents.length > 0) {
            const firstDocument = documents[0];
            const contentElements = firstDocument.content;
            if (contentElements && contentElements.length > 0) {
              const fullSummaryElement = contentElements.find(
                (c) => c.$.name === 'FullSummary'
              );
              if (fullSummaryElement) {
                const fullSummary = fullSummaryElement._;
                const formattedSummary = formatHTML(fullSummary);
                setDiseaseInfo(formattedSummary);
              } else {
                setDiseaseInfo('FullSummary not found');
              }
            } else {
              setDiseaseInfo('Content elements not found');
            }
          } else {
            setDiseaseInfo('Documents not found');
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formatHTML = (html) => {
    const paragraphs = html.split('<p>').filter((p) => p !== '');
    const formattedParagraphs = paragraphs.map((p) => {
      const strippedText = p.replace(/<\/?[^>]+(>|$)/g, '');
      return strippedText.trim();
    });
    const formattedHTML = formattedParagraphs.join('\n\n');

    const listItems = formattedHTML.split('<li>').filter((li) => li !== '');
    const formattedListItems = listItems.map((li) => {
      const strippedText = li.replace(/<\/?[^>]+(>|$)/g, '');
      return `• ${strippedText.trim()}`;
    });
    const formattedList = formattedListItems.join('\n');

    return formattedList ? formattedList : formattedHTML;
  };


  const scrollViewRef = useRef();
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  });

  const handleSend = () => {
    if (inputValue) {
      setChatHistory((prevHistory) => [...prevHistory, { message: inputValue, sender: 'user' }]);
      setInputValue('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.chatContainer}>
          {chatHistory.map((chat, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                chat.sender === 'user' ? styles.userMessageContainer : styles.botMessageContainer,
              ]}
            >
              <Text style={styles.messageText}>{chat.message}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'blue',
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'green',
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});

export default DiseaseInfoPage;
