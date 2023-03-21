import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground, Text, SectionList, View } from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import { Icon } from 'react-native-elements';

import {formula_lesson} from '../source/formula_lesson'

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from '../source/language/en.json'
import zh from '../source/language/zh.json'
i18n.translations = { en, zh };
// i18n.locale = "en"; //default EN, other language use English
i18n.fallbacks = true;

var screen = Dimensions.get("window");
var groupFixWidth = screen.width - 10;
const isIOS = (Platform.OS=="ios")?true:false;

export default function Listing({navigation}) {

  const [bookmarkList, setBookmarkList] = useState([]);
  const [goPage, setGoPage] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try{
        AsyncStorage.getItem('bookmark',(err,result)=>{
          var bookmarkArr = [];
          if(result){
            JSON.parse(result).map((v,i)=>{
              console.log(v)
              bookmarkArr.push(v);
            })
          }
          setBookmarkList(bookmarkArr);
          setGoPage(false);
        });
      }catch(error){

      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(()=>{
    AsyncStorage.getItem('language',(err,result)=>{
      if(result){
        i18n.locale = result;
      }else{
        i18n.locale = "en";
      }
    });
  },[]);
  
  function add(page){
    try{
      setBookmarkList([...bookmarkList,page]);
      bookmarkList.push(page);
      AsyncStorage.setItem(
        'bookmark',JSON.stringify(bookmarkList)
      );
      AsyncStorage.removeItem('bookmarkLastPos');
    }catch(error){

    }
  }
  
  function remove(page){
    let index = bookmarkList.indexOf(page);
    if(index>=0){
      setBookmarkList(bookmarkList.filter((v)=>(v!==page)));
    }
    try{
      AsyncStorage.setItem(
        'bookmark',JSON.stringify(bookmarkList.filter((v)=>(v!==page)))
      );
    }catch(error){

    }
  }
  
  const RenderBookmarkButton = (Props)=>{
    let bookmarked = false;
    bookmarkList.map((v,i)=>{
      if(v==Props.page){
        bookmarked = true;
      }
    })
    if(!bookmarked){
      return(
        <View style={styles.bookmarkView}>
          {(isIOS)?
          <Icon name='star-o' type='font-awesome' color="#FFF" size="36" onPress={() => add(Props.page)} />
          :
          <Icon name='star-o' type='font-awesome' color="#FFF" onPress={() => add(Props.page)} />
          }
        </View>
      )
    }else{
      return(
        <View style={styles.bookmarkView}>
          {(isIOS)?
          <Icon name='star' type='font-awesome' color="#FFF" size="36" onPress={() => remove(Props.page)} />
          :
          <Icon name='star' type='font-awesome' color="#FFF" onPress={() => remove(Props.page)} />
          }
        </View>
      )
    }
  }

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity activeOpacity={0.5} style={{paddingRight:10,display:"none"}}>
        {(isIOS)?
          <Icon name='cog' type='font-awesome' color="#FFF" size="28" onPress={() => navigation.push("Setting")} />
          :
          <Icon name='cog' type='font-awesome' color="#FFF" onPress={() => navigation.push("Setting")} />
        }
      </TouchableOpacity>
    ),
    title: i18n.t('listing'), 
    headerBackTitle: i18n.t('calculator'),
    // headerTransparent: true, //make navigation bg to transparent
    headerStyle: {
      backgroundColor: '#2e2e2e',
      shadowColor: 'transparent', //hide the navigation border bottom line
    },
    headerTintColor: "#fff",
  });

  const onSelect = (page,title) =>{
    if(goPage){
      return;
    }
    setGoPage(true);
    navigation.push("Content",{page:page,title:title});
  }

  const Header = ({section}) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderTitle}>{section.title}</Text>
    </View>
  )

  const Item = ({item,section}) => (
    <TouchableOpacity onPress={()=>{onSelect(item.page,section.title)}}>
      <View style={styles.sectionItem}>
        <Text style={styles.sectionItemTitle}>{item.en} {item.zh}</Text>
        <RenderBookmarkButton page={item.page}/>  
      </View>
    </TouchableOpacity>
  )

  return (
    <ImageBackground source={require("../assets/blackboard.png")} style={styles.bg_img}>
      <SafeAreaView style={styles.container}>
        <SectionList style={styles.sectionList}
          sections={formula_lesson}
          renderSectionHeader={({section}) => (
            <Header section={section}/>
          )}
          renderItem={({item,section}) => (
            <Item item={item} section={section}/>
          )}
          keyExtractor={(item, index) => index}
          stickySectionHeadersEnabled={true} // keep header sticky to top side
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-between"
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
  sectionList:{
    width: groupFixWidth + 10
  },
  sectionHeader:{
    // backgroundColor:"#2e2e2e",
    backgroundColor:"#fff",
    // borderBottomColor:"#FFF",
    // marginBottom:4,
    borderBottomWidth:1,
  },
  sectionHeaderTitle:{
    // color:"#FFF",
    color:"#2e2e2e",
    // fontWeight:"bold",
    fontSize:18,
    padding:5,
  },
  sectionItem: {
    padding: 5,
    paddingVertical: 15,
    marginBottom: 1,
    flexDirection: "row"
  },
  sectionItemTitle:{
    fontSize:20,
    color:"#FFF",
    flex:1,
    paddingRight:10,
    paddingTop:8,
  },
  title: {
    fontSize: 32,
  },
  bookmarkView: {

  }
  
});
