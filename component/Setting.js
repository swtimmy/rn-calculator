import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Image, Text, View, ScrollView, TextInput, TouchableHighlight, TouchableOpacity, SafeAreaView } from 'react-native';
import {Dimensions} from "react-native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';



var screen = Dimensions.get("window");
var groupFixWidth = screen.width - 10;

export default function Setting({navigation}) {

  navigation.setOptions({
    title: 'Option', 
    headerStyle: {backgroundColor: '#000'},
    headerTintColor: "#fff",
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text>Listing</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: "space-between",
  },
  space:{
    padding:5,
  },
  
});
