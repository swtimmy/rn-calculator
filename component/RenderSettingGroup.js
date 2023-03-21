import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { StyleSheet, Image, Text, View, ScrollView, TextInput, TouchableHighlight, TouchableOpacity, SafeAreaView, Clipboard, ImageBackground} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import { Icon } from 'react-native-elements';

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from '../source/language/en.json'
import zh from '../source/language/zh.json'
i18n.translations = { en, zh };
// i18n.locale = "en"; //default EN, other language use English
i18n.fallbacks = true;

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

const changeDecimal = (num)=>{
    try {
        AsyncStorage.setItem('decimal',String(num));
    } catch (error) {
        // Error saving data
    }
}

const changeLanguage = (lang)=>{
    try {
        AsyncStorage.setItem('language',String(lang));
    } catch (error) {
        // Error saving data
    }
}

const RenderSettingDecimalButton = (Props)=>{
    return(
        [0,1,2,3,4,5,6,7,8,9].map((i)=>{
            return(
                <TouchableOpacity onPress={()=>{changeDecimal(i);Props.setDecimal(i)}} style={[styles.settingBtn,styles.settingNumBtn,(Props.decimal==i)?styles.settingActiveBtn:{}]}>
                    <Text style={[styles.settingBtnText,(Props.decimal==i)?styles.settingActiveBtnText:{}]}>{i}</Text>
                </TouchableOpacity>
            );
        })
    );
}

export const RenderSettingGroup = (Props)=>{
    return (
        <View style={styles.settingGroup}>
            <ScrollView style={styles.settingScrollView}>
                <View style={styles.space}></View>
                <View style={styles.settingRow}>
                    <View style={styles.settingTitle}>
                        <Text style={styles.settingTitleText}>{i18n.t('decimal')}</Text>
                    </View>
                    <View style={styles.settingContent}>
                        <RenderSettingDecimalButton
                            setDecimal = {Props.setDecimal}
                            decimal = {Props.decimal}
                        />
                        <TouchableOpacity onPress={()=>{changeDecimal("Default");Props.setDecimal("Default")}} style={[styles.settingBtn,styles.settingTextBtn,(Props.decimal=="Default")?styles.settingActiveBtn:{}]}>
                            <Text style={[styles.settingBtnText,(Props.decimal=="Default")?styles.settingActiveBtnText:{}]}>{i18n.t('default')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.space}></View>
                <View style={styles.settingRow}>
                    <View style={styles.settingTitle}>
                        <Text style={styles.settingTitleText}>{i18n.t('language')}</Text>
                    </View>
                    <View style={styles.settingContent}>
                        <TouchableOpacity onPress={()=>{changeLanguage("en");Props.setLang("en")}} style={[styles.settingBtn,styles.settingTextBtn,(Props.lang=="en")?styles.settingActiveBtn:{}]}><Text style={[styles.settingBtnText,(Props.lang=="en")?styles.settingActiveBtnText:{}]}>English</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{changeLanguage("zh");Props.setLang("zh")}} style={[styles.settingBtn,styles.settingTextBtn,(Props.lang=="zh")?styles.settingActiveBtn:{}]}><Text style={[styles.settingBtnText,(Props.lang=="zh")?styles.settingActiveBtnText:{}]}>中文</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.space}></View>
                <View style={styles.space}></View>
                <TouchableOpacity onPress={()=>{Props.setTutorialPage(0)}}>
                    <View style={styles.tutorialView}>
                        <Text style={styles.tutorialText}>{i18n.t('tutorial')}</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    settingGroup:{
        marginTop:-10,
        width:groupFixWidth,
        flex:1,
        backgroundColor:settingBackground
    },
    settingScrollView:{
        padding:8,
    },
    settingRow:{
        flexDirection:"row"
    },
    settingTitle:{
        justifyContent:"center",
        paddingRight:10,
    },
    settingContent:{
        flexDirection:"row",
        flexWrap:"wrap",
        flex:1,
    },
    settingBtn:{
        marginTop:5,
        marginLeft:5,
        marginRight:5,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:5,
        borderWidth:1,
        borderColor:nonactiveBackground,
    },
    settingActiveBtn:{
        borderColor: activeBackground
    },
    settingTextBtn:{
        width:100,
    },
    settingNumBtn:{
        width:45,
    },
    settingBtnText:{
        alignSelf:"center",
        // color:settingBackground,
        color:activeBackground,
    },
    settingActiveBtnText:{
        alignSelf:"center",
        // color:nonactiveBackground,
    },
    settingTitleText:{
        color:settingColor,
        fontSize:smallFont,
        width:90,
    },
    space:{
      padding:spacePadding,
    },
    tutorialView:{
      backgroundColor:"#00b976",
      borderRadius:20,
      padding:8,
      margin:8,
      marginBottom:10,
      justifyContent:"center",
    },
    tutorialText:{
        color:"#FFF",
        alignSelf:"center",
        fontSize:smallFont-5,
    }
});