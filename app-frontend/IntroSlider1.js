import React from "react";
import {View,Text,StyleSheet} from 'react-native'
import AppIntroSlider from "react-native-app-intro-slider";


const slides=[
    {
        key:'one',
        title:'Title 1',
        text:'text sample is this an apple mango orange all at one place.',
        image:
    }
]




export default class IntroSlider1 extends React.Component{
    render(){
        return(
            <View style={StyleSheet.container}>
                <View>
                    <Text>skfbhksdfj</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:'1'
    }
})