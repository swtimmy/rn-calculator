import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { StyleSheet, Image, Text, View, ScrollView, TextInput, TouchableHighlight, TouchableOpacity, SafeAreaView, Clipboard, ImageBackground} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import { Icon } from 'react-native-elements';
import ViewPager from '@react-native-community/viewpager';

var screen = Dimensions.get("window");
var groupFixWidth = screen.width;
const smallFont = (screen.height<690)?16:20;
const fractionFont = (screen.height<690)?10:10;
const bigFont = (screen.height<690)?60:70;
const btnMarginTop = (screen.height<690)?5:8;
const keyFont = (screen.height<690)?28:38;
const numOfRow = 6;
const btnMarginLeftRight = groupFixWidth/6/6/2;
const spacePadding = (screen.height<569)?3:5;
const activeBackground = "#011638";
const nonactiveBackground = "#DFF8EB";
const labelTextColor = "#DFF8EB";
const settingColor = "#011638";
const settingBackground = "#DFF8EB";
const isIOS = (Platform.OS=="ios")?true:false;

const maxPage = 10;

const changeScrollView = (page,setTutorialPage,tutorialScrollView)=>{
    if(page>maxPage){
        tutorialScrollView.current.setPageWithoutAnimation(0);
        setTutorialPage(-1);
        doneTutorial();
    }else{
        setTutorialPage(page);
    }
}

const doneTutorial = ()=>{
    try{
        AsyncStorage.setItem('doneTutorial',String("true"));
    }catch{

    }
}

const goTutorialPage = (page,setTutorialPage,tutorialScrollView)=>{
    tutorialScrollView.current.setPage(page);
}

const RenderTutorialTool = (Props)=>{
    if(Props.tutorialPage==0){
        return(
            <View style={styles.tutorialBtnView}>
                <TouchableOpacity onPress={()=>{goTutorialPage(Props.tutorialPage+1,Props.setTutorialPage,Props.tutorialScrollView)}} style={styles.tutorialBtn}>
                    <View style={styles.tutorialEndView}>
                        <Text style={styles.tutorialEndText}>{Props.nextTxt}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }else if(Props.tutorialPage>=maxPage){
        return(
            <View style={styles.tutorialBtnView}>
                <TouchableOpacity onPress={()=>{goTutorialPage(maxPage+1,Props.setTutorialPage,Props.tutorialScrollView)}} style={styles.tutorialBtn}>
                    <View style={styles.tutorialEndView}>
                        <Text style={styles.tutorialEndText}>{Props.dismissTxt}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }else{
        return(
            <View style={styles.tutorialBtnView}>
                <TouchableOpacity onPress={()=>{goTutorialPage(Props.tutorialPage-1,Props.setTutorialPage,Props.tutorialScrollView)}} style={styles.tutorialBtn}>
                    <View style={styles.tutorialEndView}>
                        <Text style={styles.tutorialEndText}>{Props.prevTxt}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{goTutorialPage(Props.tutorialPage+1,Props.setTutorialPage,Props.tutorialScrollView)}} style={styles.tutorialBtn}>
                    <View style={styles.tutorialEndView}>
                        <Text style={styles.tutorialEndText}>{Props.nextTxt}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const RenderPagenationDot = (Props) => {
    return(
        <View style={styles.pagenation}>
        {[0,1,2,3,4,5,6,7,8,9,10].map((i)=>{
            return(
                <View style={[styles.dot,(Props.page==i)?styles.dot_active:{}]}></View>
            );
        })}
        </View>
    );
}

export const RenderTutorialGroup = memo(({tutorialScrollView,tutorialPage,setTutorialPage,skipTxt,prevTxt,nextTxt,dismissTxt,i18nLang})=>{
    if(tutorialPage<0){
        return null;
    }
    return(
        <View style={styles.tutorialGroup}>
            <View style={styles.tutorialBg}></View>
            <ViewPager style={styles.tutorialScrollView} initialPage={0} pageMargin={10} onPageSelected={(e)=>{changeScrollView(e.nativeEvent.position,setTutorialPage,tutorialScrollView)}} ref={tutorialScrollView}>
                <View style={styles.page} key="0">
                    <View style={styles.imageGroup}>
                        <ImageBackground resizeMode='contain' source={require("../assets/tutorial/0.png")} style={styles.bg_img}></ImageBackground>
                    </View>
                </View>
                <View style={styles.page} key="1">
                    <View style={styles.imageGroup}>
                        <ImageBackground resizeMode='contain' source={require("../assets/tutorial/1.png")} style={styles.bg_img}></ImageBackground>
                    </View>
                </View>
                <View style={styles.page} key="2">
                    <View style={styles.imageGroup}>
                        <ImageBackground resizeMode='contain' source={require("../assets/tutorial/2.png")} style={styles.bg_img}></ImageBackground>
                    </View>
                </View>
                <View style={styles.page} key="3">
                    <View style={styles.imageGroup}>
                        <ImageBackground resizeMode='contain' source={require("../assets/tutorial/3.png")} style={styles.bg_img}></ImageBackground>
                    </View>
                </View>
                <View style={styles.page} key="4">
                    <View style={styles.imageGroup}>
                        <ImageBackground resizeMode='contain' source={require("../assets/tutorial/4.png")} style={styles.bg_img}></ImageBackground>
                    </View>
                </View>
                <View style={styles.page} key="5">
                    <View style={styles.imageGroup}>
                        <ImageBackground resizeMode='contain' source={require("../assets/tutorial/5.png")} style={styles.bg_img}></ImageBackground>
                    </View>
                </View>
                <View style={styles.page} key="6">
                    <View style={styles.imageGroup}>
                        <ImageBackground resizeMode='contain' source={require("../assets/tutorial/6.png")} style={styles.bg_img}></ImageBackground>
                    </View>
                </View>
                <View style={styles.page} key="7">
                    <View style={styles.imageGroup}>
                        <ImageBackground resizeMode='contain' source={require("../assets/tutorial/7.png")} style={styles.bg_img}></ImageBackground>
                    </View>
                </View>
                <View style={styles.page} key="8">
                    <View style={styles.imageGroup}>
                        <ImageBackground resizeMode='contain' source={require("../assets/tutorial/8.png")} style={styles.bg_img}></ImageBackground>
                    </View>
                </View>
                <View style={styles.page} key="9">
                    <View style={styles.imageGroup}>
                        <ImageBackground resizeMode='contain' source={require("../assets/tutorial/9.png")} style={styles.bg_img}></ImageBackground>
                    </View>
                </View>
                <View style={styles.page} key="10">
                    <View style={styles.imageGroup}>
                        <ImageBackground resizeMode='contain' source={require("../assets/tutorial/10.png")} style={styles.bg_img}></ImageBackground>
                    </View>
                </View>
                <View style={styles.page} key="11">
                    
                </View>
            </ViewPager>
            <View style={styles.skipView}>
                <TouchableOpacity style={styles.skipBtn} onPress={()=>{goTutorialPage(maxPage+1,setTutorialPage,tutorialScrollView)}}>
                    <Text style={styles.skipText}>{skipTxt}</Text>
                </TouchableOpacity>
            </View>
            <RenderPagenationDot
                page = {tutorialPage}
            />
            <RenderTutorialTool
                setTutorialPage = {setTutorialPage}
                tutorialScrollView = {tutorialScrollView}
                tutorialPage = {tutorialPage}
                prevTxt = {prevTxt}
                nextTxt = {nextTxt}
                dismissTxt = {dismissTxt}
            />
        </View>
    )
});

const styles = StyleSheet.create({
    tutorialGroup:{
        position:'absolute',
        width:screen.width,
        height:screen.height,
    },
    tutorialBg:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor:"black",
        opacity:0.9,
    },
    tutorialScrollView:{
        position:"relative",
        flex:1,
        margin:0,
    },
    page:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageGroup:{
        flex:1,
        width:screen.width,
        height:screen.height,
        marginBottom:100,
        position:"relative"
    },
    bg_img:{
        flex:1,
    },
    tutorialBtnView:{
        position:"absolute",
        bottom:40,
        left:0,
        right:0,
        flexDirection:"row",
    },
    tutorialBtn:{
        flex:1,
    },
    tutorialEndView:{
      backgroundColor:"#00b976",
      borderRadius:20,
      padding:8,
      margin:8,
      marginBottom:10,
      justifyContent:"center",
    },
    tutorialEndText:{
        color:"#FFF",
        alignSelf:"center",
        fontSize:smallFont-5,
    },
    pagenation:{
        width:screen.width,
        position:"absolute",
        bottom:100,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row"
    },
    dot:{
        width:14,
        height:14,
        borderWidth:2,
        borderColor:"#FFF",
        borderRadius:7,
        marginLeft:3,
        marginRight:3,
    },
    dot_active:{
        backgroundColor:"#FFF",
    },
    skipView:{
        position:"absolute",
        bottom:130,
        left:0,
        right:0,
    },
    skipBtn:{
        alignSelf:"center",
        borderBottomWidth:1,
        borderBottomColor:"#FFF"
    },
    skipText:{
        color:"#FFF"
    },
});