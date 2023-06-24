import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { parseString } from 'react-native-xml2js';
import { Image } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { FlatList } from 'react-native-gesture-handler';



const DiseaseInfoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [diseaseInfo, setDiseaseInfo] = useState('');
  const [chatbotResponses, setChatbotResponses] = useState([]);

  useEffect(() => {
    const delay = 500; // 1 second delay
  
    const timer = setTimeout(() => {
      setChatbotResponses(prevResponses => [
        ...prevResponses,
        { text: "Hello! I'm a disease information chat-bot. Enter a disease name, and I'll provide detailed information. \nLet's get started!", sender: 'chatbot' }
      ]);
    }, delay);
  
    return () => clearTimeout(timer); // Cleanup function to clear the timer if the component unmounts or re-renders before the delay
  
  }, []);

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
                setChatbotResponses(prevResponses => [...prevResponses, { text: formattedSummary, sender: 'chatbot' }]);
              } else {
                setDiseaseInfo('FullSummary not found');
                setChatbotResponses(prevResponses => [...prevResponses, { text: 'FullSummary not found', sender: 'chatbot' }]);
              }
            } else {
              setDiseaseInfo('Content elements not found');
              setChatbotResponses(prevResponses => [...prevResponses, { text: 'Content elements not found', sender: 'chatbot' }]);
            }
          } else {
            setDiseaseInfo('Documents not found');
            setChatbotResponses(prevResponses => [...prevResponses, { text: 'Documents not found', sender: 'chatbot' }]);
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


    return formattedHTML;
  };

  
  const flatListRef = useRef(null);
  useEffect(() => {
    if (flatListRef.current && chatbotResponses.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chatbotResponses]);


  const handleTextInputChange = (text) => {
    setInputValue(text);
  };

  const handleSendButtonPress = () => {
    if (inputValue.trim() !== '') {
      setChatbotResponses(prevResponses => [...prevResponses, { text: inputValue, sender: 'user' }]);
      setInputValue('');
      handleRequest();
    }
  };


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
                  {/* <MenuOption onSelect={handleReloadChat}> */}
                  <MenuOption>
                    <Text style={styles.menuOption}>Reload</Text>
                  </MenuOption>
                  {/* Add more menu options here */}
                </MenuOptions>
              </Menu>
            </View>
          </View>
        </SafeAreaView>


        <FlatList
          ref={flatListRef}
          data={chatbotResponses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const messageStyle = item.sender === 'user' ? styles.userMessage : styles.chatbotMessage;
            const messageContainerStyle = item.sender === 'user' ? styles.userMessageContainer : styles.chatbotMessageContainer;
            const avatarIcon = item.sender === 'chatbot' ? require('./assets/images/chatbot-iconn.png') : null;
            return (
              // <View style={[styles.chatContainer, messageStyle]}>
              <View style={messageContainerStyle}>
                {item.sender === 'chatbot' && (
                  <View style={styles.avatarContainer}>
                    <Image source={avatarIcon} style={styles.avatar} />
                  </View>
                )}
                <View style={[styles.message, messageStyle]}>
                  <Text style={styles.text}>{item.text}</Text>
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




        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Message"
            value={inputValue}
            onChangeText={handleTextInputChange}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendButtonPress}>
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
  chatbotMessageContainer: {
    // backgroundColor: '#F3F3F3',
    // marginRight: 'auto',
    flexDirection: 'row', // chatbot- icon same line
    // alignItems: 'center',
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
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#fff',
    fontFamily: "DMSans-Regular",
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
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    color: 'white'
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: '#e0e0e0',
    color: 'black',
    backgroundColor:'#E9EAFF'
  },
  sendButton: {
    backgroundColor: '#29A9E4',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: 'black',
    fontWeight: 'bold',
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

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth: 1,
    // borderTopColor: '#E5E5EA',
    backgroundColor: '#00043C',
    // position: 'absolute',
    bottom: 0,
    padding: 10,
    width: 370,
    right: 0,
    left: 0,
  },
  sendButton: {
    marginRight: 11,
    marginLeft: 11,
    backgroundColor: "#29A9E4",
    paddingHorizontal: 11,
    paddingVertical: 10,
    borderRadius: 8,
    width: 56,

  },
  sendButtonText: {
    color: 'black',
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
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 80,
    backgroundColor: '#00043C',
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

export default DiseaseInfoPage;