import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Image, ImageBackground, Text, View, ScrollView, TextInput, TouchableHighlight, TouchableOpacity, SafeAreaView } from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import { Icon } from 'react-native-elements';

import {formula_lesson_content} from '../source/formula_lesson_content'

var screen = Dimensions.get("window");
var groupFixWidth = screen.width - 10;
const isIOS = (Platform.OS=="ios")?true:false;

export default function Content({navigation,route}) {

  const { page } = route.params; //get param from prev screen
  const { title } = route.params; //get param from prev screen
  const [bookmarkList, setBookmarkList] = useState([]);

  useEffect(() => {
    try{
      AsyncStorage.getItem('bookmark',(err,result)=>{
        var bookmarkArr = [];
        if(result){
          JSON.parse(result).map((v,i)=>{
            bookmarkArr.push(v);
          })
        }
        setBookmarkList(bookmarkArr);
      });
    }catch(error){

    }
  },[]);
  
  function add(){
    try{
      bookmarkList.push(page);
      setBookmarkList(bookmarkList);
      AsyncStorage.setItem(
        'bookmark',JSON.stringify(bookmarkList)
      );
      AsyncStorage.removeItem('bookmarkLastPos');
    }catch(error){

    }
  }
  
  function remove(){
    try{
      setBookmarkList(bookmarkList.filter((v)=>(v!==page)));
      AsyncStorage.setItem(
        'bookmark',JSON.stringify(bookmarkList.filter((v)=>(v!==page)))
      );
    }catch(error){

    }
  }
  
  const RenderBookmarkButton = (Props)=>{
    let bookmarked = false;
    bookmarkList.map((v,i)=>{
      if(v==page){
        bookmarked = true;
      }
    })
    if(!bookmarked){
      if(isIOS){
        return(
          <Icon name='star-o' type='font-awesome' color="#FFF" size="36" onPress={() => add(page)} />
        )
      }else{
        return(
          <Icon name='star-o' type='font-awesome' color="#FFF" onPress={() => add(page)} />
        )
      }
    }else{
      if(isIOS){
        return(
          <Icon name='star' type='font-awesome' color="#FFF" size="36" onPress={() => remove(page)} />
        )
      }else{
        return(
          <Icon name='star' type='font-awesome' color="#FFF" onPress={() => remove(page)} />
        )
      }
    }
  }

  navigation.setOptions({
    title: title, 
    headerStyle: {
      backgroundColor: '#2e2e2e',
      shadowColor: 'transparent', //hide the navigation border bottom line
    },
    headerTintColor: "#fff",
    headerRight: () => (
      <View style={styles.bookmarkView}>
        <RenderBookmarkButton/>
      </View>
    ),
  });

  function Page() {
    return (
      formula_lesson_content[page]
    );
  }

  return (
    <ImageBackground source={require("../assets/blackboard.png")} style={styles.bg_img}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1,justifyContent:"center"}}>
          <Page/>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bg_img: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "#000"
  },
  space:{
    padding:5,
  },
  text:{ 
    fontSize:40,
    textAlign:"center",
    flexWrap:"wrap"
  },
  bookmarkView:{
    paddingRight:10
  }
});
