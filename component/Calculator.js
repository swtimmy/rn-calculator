import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { Animated, StyleSheet, Image, Text, View, ScrollView, TextInput, TouchableHighlight, TouchableOpacity, SafeAreaView, Clipboard, ImageBackground, I18nManager} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {evaluate,round,fraction,format} from "mathjs"
import {isTablet} from 'react-native-device-detection';
import { Icon } from 'react-native-elements';

import * as Analytics from 'expo-firebase-analytics'; 

import { RenderHistoryGroup } from './RenderHistoryGroup';
import { RenderSettingGroup } from './RenderSettingGroup';
import { RenderTutorialGroup } from './RenderTutorialGroup';

import {formula_lesson_content} from '../source/formula_lesson_content'

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
const bigFont = (screen.height<690)?60:70;
const btnMarginTop = (screen.height<690)?5:8;
const spacePadding = (screen.height<569)?3:5;
const keyFont = (screen.height<690)?28:38;
const funcBtnBottom = (screen.height<569)?-8:-15;
const numOfRow = 6;
const btnMarginLeftRight = groupFixWidth/6/6/2;
const labelTextColor = "#DFF8EB";
const longHistoryColor = "#011638";
const longHistoryBackground = "#DFF8EB";
const isIOS = (Platform.OS=="ios")?true:false;

export default function Calculator({navigation}) {
  const animate_1 = useRef(new Animated.Value(1)).current;
  const animate_2 = useRef(new Animated.Value(1)).current;
  const animate_3 = useRef(new Animated.Value(1)).current;
  const animate_4 = useRef(new Animated.Value(1)).current;
  const animate_5 = useRef(new Animated.Value(1)).current;
  const animate_6 = useRef(new Animated.Value(1)).current;
  const animate_7 = useRef(new Animated.Value(1)).current;
  const animate_8 = useRef(new Animated.Value(1)).current;
  const animate_9 = useRef(new Animated.Value(1)).current;
  const animate_0 = useRef(new Animated.Value(1)).current;
  const animate_dot = useRef(new Animated.Value(1)).current;
  const animate_pi = useRef(new Animated.Value(1)).current;
  
  const [display, setDisplay] = useState("0");
  const [formula, setFormula] = useState('');
  const [history, setHistory] = useState([]);
  const [longHistory, setLongHistory] = useState([]);
  const [tabCurrent, setTabCurrent] = useState(0);
  const [buttonList, setButtonList] = useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]);
  const [sqrtOn, setSqrtOn] = useState(false);
  const [powOn, setPowOn] = useState(false);
  const [sin0On, setSin0On] = useState(false);
  const [cos0On, setCos0On] = useState(false);
  const [tan0On, setTan0On] = useState(false);
  const [sin1On, setSin1On] = useState(false);
  const [cos1On, setCos1On] = useState(false);
  const [tan1On, setTan1On] = useState(false);
  const [tutorialPage, setTutorialPage] = useState(-1);
  const [lang, setLang] = useState('en');
  const [decimal, setDecimal] = useState('Default');
  const [bookmarkList, setBookmarkList] = useState([]);
  const [tabViewHeight, setTabViewHeight] = useState(0);
  const [logOn, setLogOn] = useState(false);
  const [changeToolPage, setChangeToolPage] = useState(2);
  const smallScrollView = useRef(null);
  const textboxScrollView = useRef(null);
  const historyScrollView = useRef(null);
  const historyDataGroup = useRef(null);
  const longHistoryScrollView = useRef(null);
  const bookmarkScrollView = useRef(null);
  const tutorialScrollView = useRef(null);
  const [lastBtn, setLastBtn] = useState("");
  const [i18nLang, seti18nLang] = useState("");
  const pi = "𝛑";
  const sqrt = "√";
  const end_sqrt = "#";
  const pow = "^";
  const end_pow = "@";
  const sin = "Æ";
  const end_sin = "Á";
  const cos = "Â";
  const end_cos = "À";
  const tan = "Å";
  const end_tan = "Ã";
  const sin1 = "Ä";
  const end_sin1 = "Ç";
  const cos1 = "Ð";
  const end_cos1 = "É";
  const tan1 = "Ê";
  const end_tan1 = "È";
  const sinText = "sin0";
  const sin1Text = "sin1";
  const cosText = "cos0";
  const cos1Text = "cos1";
  const tanText = "tan0";
  const tan1Text = "tan1";
  const log = "Ë";
  const end_log = "Í";
  const logText = "log";
  const indivisibleText = "Indivisible";
  const errorText = "Error";
  const tipText = "Tips";
  const func1 = "Func2";
  const func2 = "Func3";
  const func3 = "Func1";
  
  useEffect(()=>{
    var longHistoryArr = [];
    try {
      AsyncStorage.removeItem('longHistoryLastPos');
      AsyncStorage.removeItem('bookmarkLastPos');
      AsyncStorage.getItem('longHistory',(err,result)=>{
        if(result){
          JSON.parse(result).map((v,i)=>{
            longHistoryArr.push(v);
          })
        }
      });
      AsyncStorage.getItem('decimal',(err,result)=>{
        if(result){
          setDecimal(result);
        }
      });
      AsyncStorage.getItem('language',(err,result)=>{
        if(result){
          setLang(result);
        }else{
          if(Localization.locale.indexOf("zh-")>=0){
            setLang("zh");
            AsyncStorage.setItem('language',String("zh"));
          }else{
            setLang("en");
            AsyncStorage.setItem('language',String("en"));
          }
        }
      });
      AsyncStorage.getItem('doneTutorial',(err,result)=>{
        if(result){
          setTutorialPage(-1);
        }else{
          setTutorialPage(0);
        }
      });
      setLongHistory(longHistoryArr);
    } catch (error) {
      // Error retrieving data
    }
  },[]);

  useEffect(()=>{
    i18n.locale = lang;
    seti18nLang(lang);
  },[lang]);

  useEffect(()=>{
    if(longHistory.length<=0){
      return;
    }
    try{
      AsyncStorage.setItem(
        'longHistory',JSON.stringify(longHistory)
      );
    } catch (error) {
      // Error saving data
    }
  },[longHistory]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTabCurrent(0);
      try {
        AsyncStorage.getItem('bookmark',(err,result)=>{
          var bookmarkArr = [];
          if(result){
            JSON.parse(result).map((v,i)=>{
              bookmarkArr.push(v);
            })
          }
          setBookmarkList(bookmarkArr);
        });
      }catch(exception){

      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(()=>{
    if(longHistoryScrollView.current!=null){
      try {
        AsyncStorage.getItem('longHistoryLastPos',(err,result)=>{
          if(result){
            longHistoryScrollView.current.scrollTo({y:result,animated: false});
          }
        });
      }catch(exception){

      }
    }else if(bookmarkScrollView.current!=null){
      try{
        AsyncStorage.getItem('bookmarkLastPos',(err,result)=>{
          if(result){
            bookmarkScrollView.current.scrollTo({y:result,animated: false});
          }
        });
      }catch(exception){

      }
    }
  },[tabCurrent,bookmarkList])

  const onPress = (val) =>{
    var displayStr = String(display);
    if(displayStr==i18n.t("error")||displayStr==i18n.t("infinity")){
      displayStr = "0";
    }
    if(["7","8","9","4","5","6","1","2","3",".","0","(",")","e",pi].includes(val)){
      var flashDisplayStr = "";
      if(String(lastBtn)=="="){
        displayStr = "0";
      }
      if(val=="." && String(displayStr.split(/[-|+|x|\/|\^|\(|\)]/).pop()).includes(".")){
        
      }else if(String(displayStr.split(/[-|+|x|\/|\^]/).pop()).includes(pi) && val==pi){
        
      }else if(String(displayStr.split(/[-|+|x|\/|\^]/).pop()).includes("e") && val=="e"){

      }else if(String(displayStr.split(/[-|+|x|\/|\^]/).pop()).includes("e") && val==pi){
        
      }else if(String(displayStr.split(/[-|+|x|\/|\^]/).pop()).includes(pi) && val=="e"){

      }else if(String(displayStr.split(/[-|+|x|\/|@]/).pop()).includes(pow) && val==pi){
        
      }else if(String(displayStr.split(/[-|+|x|\/|@]/).pop()).includes(pow) && val=="e"){
        
      }else if(val=="0" && displayStr == "0" && String(lastBtn)!="="){
      
      }else if(["7","8","9","4","5","6","1","2","3",".","0","(",")","e",pi].includes(val) && ["%"].includes(getLastChar(displayStr,1))){
        flashDisplayStr=displayStr + "(" + val;
        setDisplay(flashDisplayStr);
      }else if(val==pi && ["."].includes(getLastChar(displayStr,1))){
        flashDisplayStr=displayStr + "0" + val;
        setDisplay(flashDisplayStr);
      }else if(val=="e" && ["."].includes(getLastChar(displayStr,1))){
        flashDisplayStr=displayStr + "0" + val;
        setDisplay(flashDisplayStr);
      }else if(val=="." && !["0","1","2","3","4","5","6","7","8","9"].includes(getLastChar(displayStr,1))){
        flashDisplayStr=displayStr + "0" + val;
        setDisplay(flashDisplayStr);
      }else if(val=="(" && Boolean(powOn)){
        flashDisplayStr=displayStr + end_pow + val;
        setDisplay(flashDisplayStr);
        setPowOn(false);
      }else if(val==")"){
        let done = false;
        for(var i = displayStr.length-1;i>=0;i--){
          if([sin,cos,tan,sin1,cos1,tan1,sqrt,log,"("].includes(displayStr[i])){
            if(displayStr[i]=="(" && closeTheIncludeChar(displayStr,"(",")")){
              
            }else if(displayStr[i]==sin && closeTheIncludeChar(displayStr,sin,end_sin)){
              setSin0On(false);
              done = true;
              break;
            }else if(displayStr[i]==cos && closeTheIncludeChar(displayStr,cos,end_cos)){
              setCos0On(false);
              done = true;
              break;
            }else if(displayStr[i]==tan && closeTheIncludeChar(displayStr,tan,end_tan)){
              setTan0On(false);
              done = true;
              break;
            }else if(displayStr[i]==sin1 && closeTheIncludeChar(displayStr,sin1,end_sin1)){
              setSin1On(false);
              done = true;
              break;
            }else if(displayStr[i]==cos1 && closeTheIncludeChar(displayStr,cos1,end_cos1)){
              setCos1On(false);
              done = true;
              break;
            }else if(displayStr[i]==tan1 && closeTheIncludeChar(displayStr,tan1,end_tan1)){
              setTan1On(false);
              done = true;
              break;
            }else if(displayStr[i]==log && closeTheIncludeChar(displayStr,log,end_log)){
              setLogOn(false);
              done = true;
              break;
            }else if(displayStr[i]==sqrt && checkCanAddCloseWithStr(displayStr,"(",")") && closeTheIncludeChar(displayStr,sqrt,end_sqrt)){
              setSqrtOn(false);
              done = true;
              break;
            }else if(displayStr[i]==sqrt && closeTheIncludeChar(displayStr,sqrt,end_sqrt)){
              flashDisplayStr = displayStr;
              setDisplay(flashDisplayStr);
              setSqrtOn(false);
              displayStr = displayStr + end_sqrt;
            }
          }
        }
        if(!done && checkCanAddCloseWithStr(displayStr,"(",")")){
          displayStr = ifClosePowFormula(displayStr);
          if(getLastChar(displayStr,1)=="("){
            flashDisplayStr=removeLastChat(displayStr,1);
            setDisplay(flashDisplayStr);
          }else{
            flashDisplayStr=displayStr + val
            setDisplay(flashDisplayStr);
          }
        }
      }else{
        if(displayStr == "0" && val!="."){
          flashDisplayStr=val;
          setDisplay(flashDisplayStr);
        }else if(String(displayStr.split(/[-|+|x|\/|\^|\(|\)]/).pop()) == "0" && val!="."){
          flashDisplayStr=removeLastChat(displayStr,1)+val;
          setDisplay(flashDisplayStr);
        }else if(String(displayStr.split(/[√|Æ|Â|Å|Ä|Ð|Ê|Ë|e]/).pop()) == "0" && val!="."){
          flashDisplayStr=removeLastChat(displayStr,1)+val;
          setDisplay(flashDisplayStr);
        }else{
          flashDisplayStr=displayStr + val;
          setDisplay(flashDisplayStr);
        }
      }
      if(val!="("){
        onFlashCalculate(flashDisplayStr);
      }
    }else if(["/","x","-","+"].includes(val)){
      if(["/","x","-","+"].includes(getLastChar(displayStr,1))){
        setDisplay(removeLastChat(displayStr,1)+val);
        return;
      }
      if(["/","x"].includes(val)&&[sin,cos,tan,sin1,cos1,tan1,log].includes(getLastChar(displayStr,1))){
        return;
      }
      if(displayStr == "0" && val == "-"){
        setDisplay(val);
      }else if(checkCharWithStrNoIncludeIssue(displayStr,pow,end_pow)){
        setDisplay(displayStr + end_pow + val);
        setPowOn(false);
      }else{
        setDisplay(displayStr + val);
      }
    }else if(["%"].includes(val) && !["/","x","-","+",sin,cos,tan,sin1,cos1,tan1,log].includes(getLastChar(displayStr,1)) && powOn == false){
      flashDisplayStr = displayStr + val;
      setDisplay(flashDisplayStr);
      onFlashCalculate(flashDisplayStr);
    }else if([sin,cos,tan].includes(val)){
      if(String(lastBtn)=="="){
        displayStr = "0";
      }
      if(sin==val){
        if(cos0On||tan0On||sin1On||cos1On||tan1On){

        }else{
          displayStr = updateDisplayStrByOperator(displayStr,sin0On);
          if(sin0On){
            if(displayStr.length<=1){
              setDisplay(0);
            }else if([sin].includes(getLastChar(displayStr,1))){
              setDisplay(removeLastChat(displayStr,1));
            }else{
              setDisplay(displayStr + end_sin);
            }
            setSin0On(false);
          }else{
            setDisplay(displayStr + val);
            setSin0On(true);
          }
        }
      }else if(cos==val){
        if(sin0On||tan0On||sin1On||cos1On||tan1On){

        }else{
          displayStr = updateDisplayStrByOperator(displayStr,cos0On);
          if(cos0On){
            if(displayStr.length<=1){
              setDisplay(0);
            }else if([cos].includes(getLastChar(displayStr,1))){
              setDisplay(removeLastChat(displayStr,1));
            }else{
              setDisplay(displayStr + end_cos);
            }
            setCos0On(false);
          }else{
            setDisplay(displayStr + val);
            setCos0On(true);
          }
        }
      }else if(tan==val){
        if(sin0On||cos0On||sin1On||cos1On||tan1On){

        }else{
          displayStr = updateDisplayStrByOperator(displayStr,tan0On);
          if(tan0On){
            if(displayStr.length<=1){
              setDisplay(0);
            }else if([tan].includes(getLastChar(displayStr,1))){
              setDisplay(removeLastChat(displayStr,1));
            }else{
              setDisplay(displayStr + end_tan);
            }
            setTan0On(false);
          }else{
            setDisplay(displayStr + val);
            setTan0On(true);
          }
        }
      }
    }else if([sin1,cos1,tan1].includes(val)){
      if(String(lastBtn)=="="){
        displayStr = "0";
      }
      if(sin1==val){
        if(sin0On||cos0On||tan0On||cos1On||tan1On){

        }else{
          displayStr = updateDisplayStrByOperator(displayStr,sin1On);
          if(sin1On){
            if(displayStr.length<=1){
              setDisplay(0);
            }else if([sin1].includes(getLastChar(displayStr,1))){
              setDisplay(removeLastChat(displayStr,1));
            }else{
              setDisplay(displayStr + end_sin1);
            }
            setSin1On(false);
          }else{
            setDisplay(displayStr + val);
            setSin1On(true);
          }
        }
      }else if(cos1==val){
        if(sin0On||cos0On||tan0On||sin1On||tan1On){

        }else{
          displayStr = updateDisplayStrByOperator(displayStr,cos1On);
          if(cos1On){
            if(displayStr.length<=1){
              setDisplay(0);
            }else if([cos1].includes(getLastChar(displayStr,1))){
              setDisplay(removeLastChat(displayStr,1));
            }else{
              setDisplay(displayStr + end_cos1);
            }
            setCos1On(false);
          }else{
            setDisplay(displayStr + val);
            setCos1On(true);
          }
        }
      }else if(tan1==val){
        if(sin0On||cos0On||tan0On||sin1On||cos1On){

        }else{
          displayStr = updateDisplayStrByOperator(displayStr,tan1On);
          if(tan1On){
            if(displayStr.length<=1){
              setDisplay(0);
            }else if([tan1].includes(getLastChar(displayStr,1))){
              setDisplay(removeLastChat(displayStr,1));
            }else{
              setDisplay(displayStr + end_tan1);
            }
            setTan1On(false);
          }else{
            setDisplay(displayStr + val);
            setTan1On(true);
          }
        }
      }
    }else if([func1,func2,func3].includes(val)){
      if(val==func1){
        setChangeToolPage(1);
      }else if(val==func2){
        setChangeToolPage(2);
      }else{
        setChangeToolPage(0);
      }
    }else if([tipText].includes(val)){
      goToTips();
    }else if([log].includes(val)){
      if(String(lastBtn)=="="){
        displayStr = "0";
      }
      displayStr = updateDisplayStrByOperator(displayStr,logOn);
      if(Boolean(logOn)){
        if(displayStr.length<=1){
          setDisplay(0);
        }else if([log].includes(getLastChar(displayStr,1))){
          setDisplay(removeLastChat(displayStr,1));
        }else{
          setDisplay(displayStr + end_log);
        }
        setLogOn(false);
      }else{
        if(["0","1","2","3","4","5","6","7","8","9"].includes(getLastChar(displayStr,1))){
          displayStr = displayStr + "(";
        }
        if([end_log].includes(getLastChar(displayStr,1))){
          setDisplay(removeLastChat(displayStr,1));
        }else{
          setDisplay(displayStr + val);
        }
        setLogOn(true);
      }
    }else if([pow].includes(val)){
      if(Boolean(powOn)){
        if([pow].includes(getLastChar(displayStr,1))){
          setDisplay(removeLastChat(displayStr,1));
        }else{
          setDisplay(displayStr + end_pow);
        }
        setPowOn(false);
      }else{
        if(!['0','1','2','3','4','5','6','7','8','9','.',')','e',end_pow,end_sin,end_cos,end_tan,end_sin1,end_cos1,end_tan1].includes(getLastChar(displayStr,1))&&![pi].includes(displayStr.substr(-2))){
          
        }else{
          if([end_pow].includes(getLastChar(displayStr,1))){
            setDisplay(removeLastChat(displayStr,1));
          }else{
            setDisplay(displayStr + val);
          }
          setPowOn(true);
        }
      }
    }else if([sqrt].includes(val)){
      if(String(lastBtn)=="="){
        displayStr = "0";
      }
      displayStr = updateDisplayStrByOperator(displayStr);
      if(Boolean(sqrtOn)){
        if(displayStr.length<=1){
          setDisplay(0);
        }else if([sqrt].includes(getLastChar(displayStr,1))){
          setDisplay(removeLastChat(displayStr,1));
        }else{
          if(["("].includes(getLastChar(displayStr,1))){
            displayStr = removeLastChat(displayStr,1);
          }
          displayStr = ifClosePowFormula(displayStr);
          setDisplay(displayStr + end_sqrt);
        }
        setSqrtOn(false);
      }else{
        if([end_sqrt].includes(getLastChar(displayStr,1))){
          setDisplay(removeLastChat(displayStr,1));
        }else{
          setDisplay(displayStr + val);
        }
        setSqrtOn(true);
      }
    }else if(["="].includes(val) && lastBtn!="="){
      onCalculate();
    }else if(["AC"].includes(val)){
      setDisplay(0); 
      setFormula("");
      setLastBtn("");
      resetAllOperator();
    }
    setLastBtn(val);
  }

  const onFlashCalculate = (text)=>{
    var displayStr = String(text);
    if(displayStr==i18n.t("error")||displayStr==i18n.t("infinity")){
      displayStr = "0";
    }
    var formula = displayStr;
    var answer = errorText;
    while(checkCanAddCloseWithStr(formula,"(",")")){
      formula = formula + ")";
    }
    formula = formula.split(')'+'(').join(")x(");
    formula = formula.split(pi+'(').join(pi+"x(");
    formula = formula.split('e(').join("ex(");
    formula = formula.split(".(").join(".0x(");
    formula = formula.split(").").join(")x0.");
    formula = formula.split(")"+sin).join(")x"+sin);
    formula = formula.split(")"+cos).join(")x"+cos);
    formula = formula.split(")"+tan).join(")x"+tan);
    formula = formula.split(")"+sin1).join(")x"+sin1);
    formula = formula.split(")"+cos1).join(")x"+cos1);
    formula = formula.split(")"+tan1).join(")x"+tan1);
    formula = formula.split(")"+log).join(")x"+log);
    formula = formula.split(end_sin+sin).join(end_sin+"x"+sin);
    formula = formula.split("e"+log).join("ex"+log);
    formula = formula.split(pi+log).join(pi+"x"+log);
    formula = formula.split("%").join("/100");
    formula = handleNumberWithOperator(formula);
    formula = handleSpecialOperatorWithOperator(formula);
    formula = formula.split(pi).join("pi");
    formula = formula.split('@').join("");
    formula = handleSqrt(formula);
    formula = handleLog(formula);
    formula = handleSin0(formula);
    formula = handleCos0(formula);
    formula = handleTan0(formula);
    formula = handleSin1(formula);
    formula = handleCos1(formula);
    formula = handleTan1(formula);
    formula = handleNumberWithOperator(formula);
    formula = formula.split("x").join("*");
    try{
      //Avoiding Problems with Decimal Math in JavaScript, so use format+precision:14
      //extend more zero to display, so use format+lowerExp & format+upperExp
      answer = format(evaluate(formula),{precision: 14,lowerExp: -10, upperExp: 10});
      if(answer=="Infinity"){
        answer = i18n.t("infinity");
      }else if(decimal!='Default'){
        answer = round(answer,decimal).toFixed(decimal);
      }
      setFormula(answer);
    }catch(err){
      setFormula(i18n.t("error"));
      return;
    }
  }

  const onCalculate = ()=>{
    var displayStr = String(display);
    if(displayStr==i18n.t("error")||displayStr==i18n.t("infinity")){
      displayStr = "0";
    }
    Analytics.logEvent('ButtonPress', {
      name: 'Pressing',
      screen: 'Calculator',
      purpose: 'Testing',
    }).catch((err)=>{
      //err
      console.log(err)
    });
    console.log("sent")
    var formula = displayStr;
    var answer = errorText;
    var fractionTxt = "";
    var formula_str;

    //auto complete close char
    while(checkCanAddCloseWithStr(formula,"(",")")){
      formula = formula + ")";
    }

    setFormula(formula_str);

    formula = formula.split(')'+'(').join(")x(");
    formula = formula.split(pi+'(').join(pi+"x(");
    formula = formula.split('e(').join("ex(");
    formula = formula.split(".(").join(".0x(");
    formula = formula.split(").").join(")x0.");

    formula = formula.split(")"+sin).join(")x"+sin);
    formula = formula.split(")"+cos).join(")x"+cos);
    formula = formula.split(")"+tan).join(")x"+tan);
    formula = formula.split(")"+sin1).join(")x"+sin1);
    formula = formula.split(")"+cos1).join(")x"+cos1);
    formula = formula.split(")"+tan1).join(")x"+tan1);
    formula = formula.split(")"+log).join(")x"+log);
    formula = formula.split(end_sin+sin).join(end_sin+"x"+sin);
    formula = formula.split("e"+log).join("ex"+log);
    formula = formula.split(pi+log).join(pi+"x"+log);
    formula = formula.split("%").join("/100");
    formula = handleNumberWithOperator(formula);
    formula = handleSpecialOperatorWithOperator(formula);
    formula_str = formula;
    setFormula(formula_str);

    formula = formula.split(pi).join("pi");
    formula = formula.split('@').join("");
    formula = handleSqrt(formula);
    formula = handleLog(formula);
    formula = handleSin0(formula);
    formula = handleCos0(formula);
    formula = handleTan0(formula);
    formula = handleSin1(formula);
    formula = handleCos1(formula);
    formula = handleTan1(formula);

    formula = handleNumberWithOperator(formula);
    formula = formula.split("x").join("*");
    try{
      //Avoiding Problems with Decimal Math in JavaScript, so use format+precision:14
      //extend more zero to display, so use format+lowerExp & format+upperExp
      answer = format(evaluate(formula),{precision: 14,lowerExp: -10, upperExp: 10});
      console.log(answer)
      if(answer=="Infinity"){
        answer = i18n.t("infinity");
      }else if(decimal!='Default'){
        answer = round(answer,decimal).toFixed(decimal);
      }
      setDisplay(answer);
    }catch(err){
      fractionTxt = i18n.t("error");
      setDisplay(i18n.t("error"));
      return;
    }
    if(answer%1!=0){
      answer = String(answer);
      if(answer.split('.')[1] && answer.split('.')[1].length>=16){
        answer = answer.substring(0,(answer.split('.')[0].length + 16));
      }
      // fractionTxt = " = "+getFractionalExpression(answer,0.01);
      let fractionUp = 0;
      let fractionDown = 0;
      try{
        const fractionResult = evaluate('fraction('+formula+')');
        fractionUp = fractionResult.n;
        fractionDown = fractionResult.d;
      }catch(err){
        fractionUp = false;
        fractionDown = false;
      }
      if(fractionUp){
        let number = Math.floor(fractionUp/fractionDown);
        if(number <= 0){
          number = false;
        }else{
          fractionUp = fractionUp % fractionDown;
        }
        if(parseFloat(answer)<0){
          if(number){
            fractionTxt = " = -"+number+"&"+fractionUp+"/"+fractionDown;
          }else{
            fractionTxt = " = -"+fractionUp+"/"+fractionDown;
          }
        }else{
          if(number){
            fractionTxt = " = "+number+"&"+fractionUp+"/"+fractionDown;
          }else{
            fractionTxt = " = "+fractionUp+"/"+fractionDown;
          }
        }
      }
    }
    if(fractionTxt.indexOf(indivisibleText)>0||fractionTxt.indexOf(errorText)>0){
      fractionTxt = "";
    }
    var time = new Date();
    let date = time.getDate(); //Current Date
    let month = time.getMonth() + 1; //Current Month
    let year = time.getFullYear(); //Current Year
    let hours = time.getHours(); //Current Hours
    let min = time.getMinutes(); //Current Minutes
    let sec = time.getSeconds();
    let obj = {
      "formula":formula_str,
      "answer":answer,
      "fraction":fractionTxt,
      "date": year+"-"+leftPad(month,2)+"-"+leftPad(date,2)+" "+leftPad(hours,2)+":"+leftPad(min,2)+":"+leftPad(sec,2)
    };
    setHistory([...history,obj]);
    setLongHistory([...longHistory,obj]);
    Clipboard.setString(formula_str+" = "+answer);
    setSqrtOn(false);
    setPowOn(false);
    updateScrollView(smallScrollView,"start");
    updateScrollView(textboxScrollView,"start");
    resetAllOperator();
  }

  function renderLabelText() {
    let tmp_pi = "p";
    let tmp_sqrt = "s";
    let displayStr = String(display);
    let scaleDownBigFont = {};
    let scaleDownSmallFont = {};
    let scaleDownLabelTopLine = {};
    if(displayStr.length>9){
      scaleDownBigFont = (isIOS)?{fontSize:bigFont-20}:{fontSize:bigFont-10};
      scaleDownSmallFont = (isIOS)?{fontSize:bigFont-15-40}:{fontSize:bigFont-5-40};
      scaleDownLabelTopLine = (isIOS)?{height:3,top:1,left:-7,right:0}:{height:4,top:3,left:-7,right:0};
    }
    displayStr = displayStr.split(pi).join(tmp_pi);
    displayStr = displayStr.split(sqrt).join(tmp_sqrt);
    const displayArr = displayStr.split("");
    let groupTxt = [];
    let isPow = false;
    let isSqrt = false;
    let tempTxt = '';
    let count = 0;
    for (txt of displayArr) {
      txt = (txt==tmp_pi)?pi:txt;
      txt = (txt==tmp_sqrt)?sqrt:txt;
      txt = (txt==sin)?"sin(":txt;
      txt = (txt==cos)?"cos(":txt;
      txt = (txt==tan)?"tan(":txt;
      txt = (txt==end_sin)?")":txt;
      txt = (txt==end_cos)?")":txt;
      txt = (txt==end_tan)?")":txt;
      txt = (txt==sin1)?"sin-1(":txt;
      txt = (txt==cos1)?"cos-1(":txt;
      txt = (txt==tan1)?"tan-1(":txt;
      txt = (txt==end_sin1)?")":txt;
      txt = (txt==end_cos1)?")":txt;
      txt = (txt==end_tan1)?")":txt;
      txt = (txt==end_log)?")":txt;
      count++;
      if(![end_pow,end_sqrt,pow,sqrt,log].includes(txt)){
        tempTxt += txt;
      }
      if(txt==pow){
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        tempTxt = '';
        isPow = true;
      }else if(txt==end_pow){
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        tempTxt = '';
        isPow = false;
      }else if(txt==end_sqrt){
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        tempTxt = '';
        isSqrt = false;
      }else if(txt==sqrt){
        if(tempTxt!=''){
          groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        }
        isSqrt = true;
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":txt});
        tempTxt = '';
      }else if (txt==log){
        if(tempTxt!=''){
          groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        }
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":txt});
        tempTxt = '';
      }else if(!["7","8","9","4","5","6","1","2","3",".","0",pi,"e",")"].includes(txt)&&isPow){
        isPow = false;
      }
      if(tempTxt!=''&&displayArr.length==count){
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
      }
    }
    return groupTxt.map((obj,index)=>{
      let key = index;
      let val = obj.val;
      let marginTop = {};
      let borderTop = {};
      let left = {};
      if(val.indexOf(pi)>=0||[pi].includes(val)){
        marginTop = (isIOS)?{marginTop:-9}:{marginTop:-3};
      }else if(val.indexOf(sqrt)>=0||[sqrt].includes(val)){
        marginTop = (isIOS)?{marginTop:-0}:{marginTop:-11};
      }
      left = (isIOS)?{}:{left:-2};
      if(val==sqrt){
        return <View style={styles.label_view}><Text style={[styles.label,marginTop,borderTop,scaleDownBigFont]} key={key}>{val}</Text></View>;
      }else if(val==log){
        marginTop = (isIOS)?{position:"absolute",top:32,right:20}:{position:"absolute",bottom:10,right:20};
        if(obj.sqrt){
          return <View style={styles.label_view}>
          <View style={[styles.label_top_line,scaleDownLabelTopLine]}></View>
          <Text style={[styles.label,scaleDownBigFont]} key={key+"str"}>log  (</Text>
          <Text style={[styles.label,styles.label_small,marginTop,scaleDownSmallFont]} key={key}>10</Text>
        </View>;
        }else{
          return <View style={styles.label_view}>
          <Text style={[styles.label,scaleDownBigFont]} key={key+"str"}>log  (</Text>
          <Text style={[styles.label,styles.label_small,marginTop,scaleDownSmallFont]} key={key}>10</Text>
        </View>;
        }
      }else if(obj.pow){
        if(obj.sqrt){
          return <View style={styles.label_view}>
          <View style={[styles.label_top_line,scaleDownLabelTopLine]}></View>
          <Text style={[styles.label,styles.label_small,marginTop,borderTop,scaleDownSmallFont]} key={key}>{val}</Text>
        </View>;
        }else{
          return <View style={styles.label_view}>
          <Text style={[styles.label,styles.label_small,marginTop,borderTop,scaleDownSmallFont]} key={key}>{val}</Text>
        </View>;
        }
      }else{
        if(obj.sqrt){
          return <View style={styles.label_view}>
          <View style={[styles.label_top_line,scaleDownLabelTopLine]}></View>
          <Text style={[styles.label,marginTop,borderTop,scaleDownBigFont]} key={key}>{val}</Text>
        </View>;
        }else{
          return <View style={styles.label_view}>
          <Text style={[styles.label,marginTop,borderTop,scaleDownBigFont]} key={key}>{val}</Text>
        </View>;
        }
      }
    });
  }

  const renderSmallText = useCallback((str=false)=>{
    let tmp_pi = "p";
    let tmp_sqrt = "s";
    let displayStr = (str)?String(str):String(formula);
    displayStr = displayStr.split(pi).join(tmp_pi);
    displayStr = displayStr.split(sqrt).join(tmp_sqrt);
    const displayArr = displayStr.split("");
    let groupTxt = [];
    let isPow = false;
    let isSqrt = false;
    let tempTxt = '';
    let count = 0;
    for (txt of displayArr) {
      txt = (txt==tmp_pi)?pi:txt;
      txt = (txt==tmp_sqrt)?sqrt:txt;
      txt = (txt==sin)?"sin(":txt;
      txt = (txt==cos)?"cos(":txt;
      txt = (txt==tan)?"tan(":txt;
      txt = (txt==end_sin)?")":txt;
      txt = (txt==end_cos)?")":txt;
      txt = (txt==end_tan)?")":txt;
      txt = (txt==sin1)?"sin-1(":txt;
      txt = (txt==cos1)?"cos-1(":txt;
      txt = (txt==tan1)?"tan-1(":txt;
      txt = (txt==end_sin1)?")":txt;
      txt = (txt==end_cos1)?")":txt;
      txt = (txt==end_tan1)?")":txt;
      txt = (txt==end_log)?")":txt;
      count++;
      if(![end_pow,end_sqrt,pow,sqrt,log].includes(txt)){
        tempTxt += txt;
      }
      if(txt==pow){
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        tempTxt = '';
        isPow = true;
      }else if(txt==end_pow){
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        tempTxt = '';
        isPow = false;
      }else if(txt==end_sqrt){
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        tempTxt = '';
        isSqrt = false;
      }else if(txt==sqrt){
        if(tempTxt!=''){
          groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        }
        isSqrt = true;
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":txt});
        tempTxt = '';
      }else if (txt==log){
        if(tempTxt!=''){
          groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        }
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":txt});
        tempTxt = '';
      }else if(!["7","8","9","4","5","6","1","2","3",".","0",pi,"e",")"].includes(txt)&&isPow){
        isPow = false;
      }
      if(tempTxt!=''&&displayArr.length==count || tempTxt.length>4){
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        tempTxt = '';
      }
    }
    return groupTxt.map((obj,index)=>{
      let key = index;
      let val = obj.val;
      let marginTop = {};
      let borderTop = {};
      let left = {};
      if(val.indexOf(pi)>=0||[pi].includes(val)){
        marginTop = (isIOS)?{marginTop:-2}:{marginTop:-2};
      }else if(val.indexOf(sqrt)>=0||[sqrt].includes(val)){
        marginTop = (isIOS)?{marginTop:-0}:{marginTop:-2};
      }
      left = (isIOS)?{left:0}:{left:-2};
      if(val==sqrt){
        return <View style={styles.small_view}><Text style={[styles.small,marginTop,borderTop]} key={key}>{val}</Text></View>;
      }else if(val==log){
        marginTop = (isIOS)?{position:"absolute",top:8,right:6}:{position:"absolute",bottom:10,right:20};
        if(obj.sqrt){
          return <View style={styles.small_view}>
          <View style={styles.small_top_line}></View>
          <Text style={[styles.small]} key={key}>log  (</Text>
          <Text style={[styles.small,styles.small_small,marginTop]} key={key}>10</Text>
        </View>;
        }else{
          return <View style={styles.small_view}>
          <Text style={[styles.small]} key={key}>log  (</Text>
          <Text style={[styles.small,styles.small_small,marginTop]} key={key}>10</Text>
        </View>;
        }
      }else if(obj.pow){
        if(obj.sqrt){
          return <View style={styles.small_view}>
          <View style={[styles.small_top_line,left]}></View>
          <Text style={[styles.small,styles.small_small,marginTop,borderTop]} key={key}>{val}</Text>
        </View>;
        }else{
          return <View style={styles.small_view}>
          <Text style={[styles.small,styles.small_small,marginTop,borderTop]} key={key}>{val}</Text>
        </View>;
        }
      }else{
        if(obj.sqrt){
          return <View style={styles.small_view}>
          <View style={[styles.small_top_line,left]}></View>
          <Text style={[styles.small,marginTop,borderTop]} key={key}>{val}</Text>
        </View>;
        }else{
          return <View style={styles.small_view}>
          <Text style={[styles.small,marginTop,borderTop]} key={key}>{val}</Text>
        </View>;
        }
      }
    });
  },[formula])

  function renderLongHistoryText(str=false) {
    let tmp_pi = "p";
    let tmp_sqrt = "s";
    let displayStr = (str)?String(str):String(formula);
    displayStr = displayStr.split(pi).join(tmp_pi);
    displayStr = displayStr.split(sqrt).join(tmp_sqrt);
    const displayArr = displayStr.split("");
    let groupTxt = [];
    let isPow = false;
    let isSqrt = false;
    let tempTxt = '';
    let count = 0;
    for (txt of displayArr) {
      txt = (txt==tmp_pi)?pi:txt;
      txt = (txt==tmp_sqrt)?sqrt:txt;
      txt = (txt==sin)?"sin(":txt;
      txt = (txt==cos)?"cos(":txt;
      txt = (txt==tan)?"tan(":txt;
      txt = (txt==end_sin)?")":txt;
      txt = (txt==end_cos)?")":txt;
      txt = (txt==end_tan)?")":txt;
      txt = (txt==sin1)?"sin-1(":txt;
      txt = (txt==cos1)?"cos-1(":txt;
      txt = (txt==tan1)?"tan-1(":txt;
      txt = (txt==end_sin1)?")":txt;
      txt = (txt==end_cos1)?")":txt;
      txt = (txt==end_tan1)?")":txt;
      txt = (txt==end_log)?")":txt;
      count++;
      if(![end_pow,end_sqrt,pow,sqrt,log].includes(txt)){
        tempTxt += txt;
      }
      if(txt==pow){
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        tempTxt = '';
        isPow = true;
      }else if(txt==end_pow){
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        tempTxt = '';
        isPow = false;
      }else if(txt==end_sqrt){
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        tempTxt = '';
        isSqrt = false;
      }else if(txt==sqrt){
        if(tempTxt!=''){
          groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        }
        isSqrt = true;
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":txt});
        tempTxt = '';
      }else if (txt==log){
        if(tempTxt!=''){
          groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        }
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":txt});
        tempTxt = '';
      }else if(!["7","8","9","4","5","6","1","2","3",".","0",pi,"e",")"].includes(txt)&&isPow){
        isPow = false;
      }
      if(tempTxt!=''&&displayArr.length==count || tempTxt.length>4){
        groupTxt.push({"pow":isPow,"sqrt":isSqrt,"val":tempTxt});
        tempTxt = '';
      }
    }
    return groupTxt.map((obj,index)=>{
      let key = index;
      let val = obj.val;
      let marginTop = {};
      let borderTop = {};
      let left = {};
      if(val.indexOf(pi)>=0||[pi].includes(val)){
        marginTop = (isIOS)?{marginTop:-2}:{marginTop:-2};
      }else if(val.indexOf(sqrt)>=0||[sqrt].includes(val)){
        marginTop = (isIOS)?{marginTop:-0}:{marginTop:-2};
      }
      left = (isIOS)?{left:0}:{left:-2};
      if(val==sqrt){
        return <View style={styles.longHistoryText_view}><Text style={[styles.longHistoryText,marginTop,borderTop]} key={key}>{val}</Text></View>;
      }else if(val==log){
        marginTop = (isIOS)?{position:"absolute",top:8,right:6}:{position:"absolute",bottom:10,right:20};
        if(obj.sqrt){
          return <View style={styles.longHistoryText_view}>
          <View style={styles.longHistoryText_top_line}></View>
          <Text style={[styles.longHistoryText]} key={key}>log  (</Text>
          <Text style={[styles.longHistoryText,styles.longHistoryText_small,marginTop]} key={key}>10</Text>
        </View>;
        }else{
          return <View style={styles.longHistoryText_view}>
          <Text style={[styles.longHistoryText]} key={key}>log  (</Text>
          <Text style={[styles.longHistoryText,styles.longHistoryText_small,marginTop]} key={key}>10</Text>
        </View>;
        }
      }else if(obj.pow){
        if(obj.sqrt){
          return <View style={styles.longHistoryText_view}>
          <View style={[styles.longHistoryText_top_line,left]}></View>
          <Text style={[styles.longHistoryText,styles.longHistoryText_small,marginTop,borderTop]} key={key}>{val}</Text>
        </View>;
        }else{
          return <View style={styles.longHistoryText_view}>
          <Text style={[styles.longHistoryText,styles.longHistoryText_small,marginTop,borderTop]} key={key}>{val}</Text>
        </View>;
        }
      }else{
        if(obj.sqrt){
          return <View style={styles.longHistoryText_view}>
          <View style={[styles.longHistoryText_top_line,left]}></View>
          <Text style={[styles.longHistoryText,marginTop,borderTop]} key={key}>{val}</Text>
        </View>;
        }else{
          return <View style={styles.longHistoryText_view}>
          <Text style={[styles.longHistoryText,marginTop,borderTop]} key={key}>{val}</Text>
        </View>;
        }
      }
    });
  }

  const updateScrollView = (ele,action)=>{
    if(action=="start"){
      setTimeout(() => {
        ele.current.scrollTo({x:0,animated: true});
      }, 333)
    }else{
      ele.current.scrollToEnd({animated: true});
    }
  }

  const deleteDisplay = ()=>{
    var flashDisplayStr = "";
    if(display==errorText){
      return false;
      setDisplay("0");
    }else if(getLastChar(display,2)==pi){
      var str = getRangeChar(display,0,2);
      if(str==""){
        str = "0";
      }
      flashDisplayStr = str;
      setDisplay(flashDisplayStr);
    }else if(getLastChar(display,1)==" "){
      var str = getRangeChar(display,0,3);
      str = ifDeleteClosePowFormula(str);
      if(str==""){
        str = "0";
      }
      flashDisplayStr=str;
      setDisplay(flashDisplayStr);
    }else if(getLastChar(display,1)==sqrt){
      setSqrtOn(false);
      var str = getRangeChar(display,0,1);
      str = ifDeleteClosePowFormula(str);
      if(str==""){
        str = "0";
      }
      flashDisplayStr=str;
      setDisplay(flashDisplayStr);
    }else if(getLastChar(display,4,1)==pow&&
      getLastChar(display,2,1)==end_pow&&
      getLastChar(display,1)==end_sqrt){
      var str = getRangeChar(display,0,4);
      if(str==""){
        str = "0";
      }
      flashDisplayStr=str;
      setDisplay(flashDisplayStr);
      setSqrtOn(true);
    }else if(getLastChar(display,1)==end_sqrt){
      var str = getRangeChar(display,0,2);
      str = ifDeleteClosePowFormula(str);
      if(str==""){
        str = "0";
      }
      flashDisplayStr=str;
      setDisplay(flashDisplayStr);
      setSqrtOn(true);
    }else if(getLastChar(display,1)==end_pow){
      var str = getRangeChar(display,0,2);
      if(str==""){
        str = "0";
      }
      flashDisplayStr=str;
      setDisplay(flashDisplayStr);
      setPowOn(true);
    }else if([pow].includes(getLastChar(display,2,1))){
      var str = getRangeChar(display,0,2);
      if(str==""){
        str = "0";
      }
      setPowOn(false);
      flashDisplayStr=str;
      setDisplay(flashDisplayStr);
    }else{
      var str = getRangeChar(display,0,1);
      if(str==""){
        str = "0";
      }
      flashDisplayStr=str;
      setDisplay(flashDisplayStr);
    }
    onFlashCalculate(flashDisplayStr);
  }

  const updateDisplay = useCallback((str,reuse=false)=>{
    if(reuse){
      if(checkCanAddCloseWithStr(str,pow,end_pow)){
        setPowOn(true);
      }
      if(checkCanAddCloseWithStr(str,sqrt,end_sqrt)){
        setSqrtOn(true);
      }
      if(checkCanAddCloseWithStr(str,log,end_log)){
        setLogOn(true);
      }
      if(checkCanAddCloseWithStr(str,sin,end_sin)){
        setSin0On(true);
      }
      if(checkCanAddCloseWithStr(str,cos,end_cos)){
        setCos0On(true);
      }
      if(checkCanAddCloseWithStr(str,tan,end_tan)){
        setTan0On(true);
      }
      if(checkCanAddCloseWithStr(str,sin1,end_sin1)){
        setSin1On(true);
      }
      if(checkCanAddCloseWithStr(str,cos1,end_cos1)){
        setCos1On(true);
      }
      if(checkCanAddCloseWithStr(str,tan1,end_tan1)){
        setTan1On(true);
      }
      if(lastBtn=="="||lastBtn=="AC"||lastBtn=="0"){
        setDisplay(str);
        setLastBtn("");
      }else{
        setDisplay(display+str);
      }
    }
  },[display])

  const deleteHistory = ()=>{
    setHistory([]);
  }

  const goToTips = ()=>{
    navigation.push("Listing");
  }
  function handleSqrt(str){
    let reg = /√([^#√]+)#/gm;
    let reg2 = /√([^#√]+)/gm;
    let subst = 'sqrt($1)';
    str = str.replace(reg,subst);
    return str = str.replace(reg2,subst);
    // let reg = /√([a-zA-Z0-9\+\-\*\/\.\,\(\)\Æ\Á\À\Å\Ã\Ä\Ç\Ð\É\Ê\È\Ë\Í\@\^]+)#/gm;
    // let reg2 = /√([a-zA-Z0-9\+\-\*\/\.\,\(\Æ\Á\À\Å\Ã\Ä\Ç\Ð\É\Ê\È\Ë\Í\@\^)]+)/gm;
    // let subst = 'sqrt($1)';
    // str = str.replace(reg,subst);
    // return str.replace(reg2,subst);
  }
  function handleLog(str){
    let reg = /Ë([a-zA-Z0-9\+\-\*\/\.\,\(\)\√\@\^\#\Æ\Á\À\Å\Ã\Ä\Ç\Ð\É\Ê\È]+)Í/gm;
    let subst = 'log($1,10)';
    return str.replace(reg,subst);
  }
  function handleSin0(str){
    let reg = /Æ([a-zA-Z0-9\+\-\*\/\.\,\(\)\√\@\^\#]+)Á/gm;
    let subst = 'sin(pi*$1/180)';
    return str.replace(reg,subst);
  }
  function handleCos0(str){
    let reg = /Â([a-zA-Z0-9\+\-\*\/\.\,\(\)\√\@\^\#]+)À/gm;
    let subst = 'cos(pi*$1/180)';
    return str.replace(reg,subst);
  }
  function handleTan0(str){
    let reg = /Å([a-zA-Z0-9\+\-\*\/\.\,\(\)\√\@\^\#]+)Ã/gm;
    let subst = 'tan(pi*$1/180)';
    return str.replace(reg,subst);
  }
  function handleSin1(str){
    let reg = /Ä([a-zA-Z0-9\+\-\*\/\.\,\(\)\√\@\^\#]+)Ç/gm;
    let subst = '(asin($1)*180/pi)';
    return str.replace(reg,subst);
  }
  function handleCos1(str){
    let reg = /Ð([a-zA-Z0-9\+\-\*\/\.\,\(\)\√\@\^\#]+)É/gm;
    let subst = '(acos($1)*180/pi)';
    return str.replace(reg,subst);
  }
  function handleTan1(str){
    let reg = /Ê([a-zA-Z0-9\+\-\*\/\.\,\(\)\√\@\^\#]+)È/gm;
    let subst = '(atan($1)*180/pi)';
    return str.replace(reg,subst);
  }
  function handleNumberWithOperator(formula){
    var addMultiStr=['0','1','2','3','4','5','6','7','8','9'];
    for(var i=0; i<=addMultiStr.length; i++){
      var str = addMultiStr[i];
      formula = formula.split(str+"(").join(str+"x(");
      formula = formula.split(")"+str).join(")x"+str);
      formula = formula.split(str+sqrt).join(str+"x"+sqrt);
      formula = formula.split(str+"s").join(str+"xs");
      formula = formula.split(str+"c").join(str+"xc");
      formula = formula.split(str+"t").join(str+"xt");
      formula = formula.split(str+"l").join(str+"xl");
      formula = formula.split(str+pi).join(str+"x"+pi);
      formula = formula.split(str+"e").join(str+"xe");
      formula = formula.split(pi+str).join(pi+"x"+str);
      formula = formula.split("e"+str).join("ex"+str);
      formula = formula.split("%"+str).join("%x"+str);
      formula = formula.split(end_pow+str).join("x"+str);
      formula = formula.split(end_sqrt+str).join(end_sqrt+"x"+str);
      formula = formula.split(end_log+str).join(end_log+"x"+str);
      formula = formula.split(end_sin+str).join(end_sin+"x"+str);
      formula = formula.split(end_sin1+str).join(end_sin1+"x"+str);
      formula = formula.split(end_cos+str).join(end_cos+"x"+str);
      formula = formula.split(end_cos1+str).join(end_cos1+"x"+str);
      formula = formula.split(end_tan+str).join(end_tan+"x"+str);
      formula = formula.split(end_tan1+str).join(end_tan1+"x"+str);
    }
    return formula;
  }
  function handleSpecialOperatorWithOperator(formula){
    var addMultiStr=[sin,sin1,cos,cos1,tan,tan1,"("];
    for(var i=0; i<=addMultiStr.length; i++){
      var str = addMultiStr[i];
      formula = formula.split(end_sin+str).join(end_sin+"x"+str);
      formula = formula.split(end_sin1+str).join(end_sin1+"x"+str);
      formula = formula.split(end_cos+str).join(end_cos+"x"+str);
      formula = formula.split(end_cos1+str).join(end_cos1+"x"+str);
      formula = formula.split(end_tan+str).join(end_tan+"x"+str);
      formula = formula.split(end_tan1+str).join(end_tan1+"x"+str);
      formula = formula.split(end_log+str).join(end_log+"x"+str);
      formula = formula.split(")"+str).join(")"+"x"+str);
    }
    return formula;
  }
  function ifClosePowFormula(str){
    if(Boolean(powOn)){
      setPowOn(false);
      str = str + end_pow;
    }
    return str;
  }
  function ifDeleteClosePowFormula(str){
    if(getLastChar(str,1)==end_pow){
      str = removeLastChat(str,1);
      setPowOn(true);
    }
    return str;
  }
  function removeLastChat(displayStr="",num=1){
    return String(displayStr).substr(0,displayStr.length-num);
  }
  function getLastChar(displayStr="",pos=1,num=999){
    return String(displayStr).substr(-(pos),num);
  }
  function getRangeChar(displayStr="",start=0,end=0){
    return String(displayStr).substring(start, String(display).length - end);
  }
  function closeTheIncludeChar(displayStr,open,close){
    if(checkCharWithStrNoIncludeIssue(displayStr,open,close)){
      displayStr = ifClosePowFormula(displayStr);
      if(getLastChar(displayStr,1)==open){
        if([sqrt].includes(open)){

        }else{
          if(displayStr.length==1){
            setDisplay(0);
          }else{
            setDisplay(removeLastChat(displayStr,1));
          }
        }
      }else{
        if([sqrt].includes(open)){
          setDisplay(displayStr + close + ")");
        }else{
          setDisplay(displayStr + close);
        }
      }
      return true;
    }
    return false;
  }
  function checkCanAddCloseWithStr(str,open,close){
    let opened = 0;
    for(var i = str.length-1;i>=0;i--){
      if(str[i]==close){
        opened--;
      }else if(str[i]==open){
        opened++;
      }
    }
    if(opened>0){
      return true;
    }
    return false;
  }
  function checkCharWithStrNoIncludeIssue(str,char,addChar){
    let opened = 0;
    for(var i = str.length-1;i>=0;i--){
      if(str[i]==addChar){
        return false;
      }
      if(str[i]==")"){
        opened--;
      }else if(str[i]=="("){
        opened++;
      }
      if(str[i]==char && opened == 0){
        return true;
      }
    }
    return false;
  }
  function updateDisplayStrByOperator(displayStr,isOn=true){
    if(powOn==true){
      if(getLastChar(displayStr,1)==pow){
        displayStr = removeLastChat(displayStr,1);
      }else{
        displayStr = displayStr + end_pow;
      }
      setPowOn(false);
    }
    if(displayStr == "0"){
      displayStr = "";
    }else if(getLastChar(displayStr,1)=="."){
      displayStr = displayStr + "0(";
    }
    if(!isOn && ["0","1","2","3","4","5","6","7","8","9"].includes(getLastChar(displayStr,1))){
      displayStr = displayStr + "(";
    }
    return displayStr;
  }
  function resetAllOperator(){
    setSqrtOn(false);
    setPowOn(false);
    setSin0On(false);
    setCos0On(false);
    setTan0On(false);
    setSin1On(false);
    setCos1On(false);
    setTan1On(false);
    setLogOn(false);
  }
  function changeTab(num){
    setTabCurrent(num);
  }
  function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
  }
  function removeBookmark(page){
    try {
      setBookmarkList(bookmarkList.filter((v)=>(v!==page)));
      AsyncStorage.setItem(
        'bookmark',JSON.stringify(bookmarkList.filter((v)=>(v.toString()!==page.toString())))
      );
    }catch(exception) {

    }
  }
  function cleanItemCache(key){
    try {
      AsyncStorage.removeItem(key);
      if(key=="longHistory"){
        AsyncStorage.removeItem('longHistoryLastPos');
        setLongHistory([]);
      }
    }
    catch(exception) {

    }
  }
  const showTutorial = useCallback((bool) =>{
    if(bool){
      setTutorialPage(0);
    }else{
      setTutorialPage(-1);
    }
  },[tutorialPage]);
  const getFractionalExpression = (value, threshold)=>{
    var i=1, j=1; 
    var round = 0;
    var max_round = 1000;
    while(Math.abs(i/j - value) > threshold && round<max_round) {
      if (i/j > value) {
          j++;
      } else if(i/j < value) {
          i++;
      }
      round++;
    }
    if(round>=max_round){
      return indivisibleText;
    }
    return i + '/' + j;
  }
  const RenderTabContentView = (Props)=>{
    if(tabCurrent==0){
      return (
        <View style={styles.btn_group} onLayout={(event)=>{setTabViewHeight(event.nativeEvent.layout.height)}}>
          <RenderButton/>
        </View>
      )
    }else if(tabCurrent==1){
      return (
        <View style={styles.bookmarkView}>
          <ImageBackground source={require("../assets/blackboard.png")} style={styles.bookmark_bg_img}>
            <ScrollView style={styles.bookmarkScrollView}
              onScrollEndDrag={event => { 
                try {
                  AsyncStorage.setItem('bookmarkLastPos',String(event.nativeEvent.contentOffset.y));
                } catch (error) {
                  // Error saving data
                }
              }}
              scrollEventThrottle={160}
              ref={bookmarkScrollView}
              >
              {
                bookmarkList.map((v,i)=>(
                  <RederBookmarkItem
                    page = {v}
                  />
                )).reverse()
              }
            </ScrollView>
          </ImageBackground>
        </View>
      )
    }else if(tabCurrent==2){
      const tmpLongHistory = longHistory;
      return (
        <View style={styles.longHistoryView}>
          <ScrollView style={styles.longHistoryScrollView}
              onScrollEndDrag={event => { 
                try {
                  AsyncStorage.setItem('longHistoryLastPos',String(event.nativeEvent.contentOffset.y));
                } catch (error) {
                  // Error saving data
                }
              }}
              scrollEventThrottle={160}
              ref={longHistoryScrollView}
              >
            {
              tmpLongHistory.map((v,i)=>(
                <RenderLongHistoryItem 
                  formula = {v.formula}
                  answer = {v.answer}
                  fraction = {v.fraction}
                  date = {v.date}
                />
              )).reverse()
            }
          </ScrollView>
          <TouchableOpacity onPress={()=>{cleanItemCache("longHistory")}}>
            <View style={styles.longHistoryRemoveView}>
              <Icon name='delete' color="#DFF8EB"/>
            </View>
          </TouchableOpacity>
        </View>
      )
    }else{
      return (
        <RenderSettingGroup
          lang = {lang}
          decimal = {decimal}
          setLang = {setLang}
          setDecimal = {setDecimal}
          setTutorialPage = {setTutorialPage}
        />
      )
    }
  }
  const RederBookmarkItem = (Props)=>{
    return (
      <View style={{marginTop:-40}}>
        <RederBookmarkItemView page={Props.page}/>
        <View style={{position:"absolute",right:0, top:42}}>
          {(isIOS)?
          <Icon name='remove' type='font-awesome' color="#FFF" size="34" onPress={() => removeBookmark(Props.page)} />
          :
          <Icon name='remove' type='font-awesome' color="#FFF" onPress={() => removeBookmark(Props.page)} />
          }
        </View>
      </View>
    )
  }
  const RederBookmarkItemView = (Props)=>{
    return (
      formula_lesson_content[Props.page]
    )
  }
  const RenderLongHistoryItem = (Props)=>{
    return (
      <View>
        <RenderLongHistoryView 
          view={styles.history}
          viewDataView={styles.longHistoryDataView}
          viewDataBtn={styles.longHistoryDataBtn}
          small = {styles.longHistoryText}
          updateDisplay = {updateDisplay}
          renderText = {renderLongHistoryText}
          formula = {Props.formula}
          answer = {Props.answer}
          fraction = {Props.fraction}
          date = {Props.date}
          dateText = {styles.longHistoryDate}
          dateView = {styles.longHistoryDateView}
        />
      </View>
    )
  }
  const RenderLongHistoryView = (Props)=>{
    return (
      <View style={Props.view}>
        <View style={Props.dateView}>
          <Text style={Props.dateText}>{Props.date}</Text>
        </View>
        <View style={Props.viewDataView}>
          <TouchableOpacity style={Props.viewDataBtn} onPress={()=>{Props.updateDisplay(Props.formula,true)}}>
            {Props.renderText(Props.formula)}
          </TouchableOpacity>
          <TouchableOpacity style={Props.viewDataBtn} onPress={()=>{Props.updateDisplay(Props.answer,true)}}>
            <Text style={Props.small}>= {Props.answer}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  const RenderButton = ()=>{
    let btnStr = [
      "AC","(",")","/",sqrt,
      "7","8","9","x",pow,
      "4","5","6","-",tanText,
      "1","2","3","+",cosText,
      "0",".",pi,"=",sinText,];
    if(changeToolPage==1){
      btnStr = [
        "AC","(",")","/",sqrt,
        "7","8","9","x",pow,
        "4","5","6","-",tan1Text,
        "1","2","3","+",cos1Text,
        "0",".",pi,"=",sin1Text,];
    }else if(changeToolPage==2){
      btnStr = [
        "AC","(",")","/",sqrt,
        "7","8","9","x",pow,
        "4","5","6","-","%",
        "1","2","3","+","e",
        "0",".",pi,"=",logText,];
    }
    return (
      buttonList.map((index)=>{
        if(["AC"].includes(btnStr[index])){
          return(<TouchableOpacity
            key = {index}
            pressDuration="0.0"
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => onPress(btnStr[index])}>
            <View style={[styles.btn_1,styles.btn_operator_2,{marginTop:0}]}>
              <Text style={styles.btn_operator_text}>{btnStr[index]}</Text>
            </View>
          </TouchableOpacity>);
        }else if(["(",")"].includes(btnStr[index])){
          return(<TouchableOpacity
            key = {index}
            pressDuration="0.0"
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => onPress(btnStr[index])}>
            <View style={[styles.btn_1,styles.btn_operator_2,{marginTop:0}]}>
              <Text style={styles.btn_range_text}>{btnStr[index]}</Text>
            </View>
          </TouchableOpacity>);
        }else if(["7","8","9","4","5","6","1","2","3",".","0",pi].includes(btnStr[index])){
          let fadeAnim = animate_0;
          if(btnStr[index]=="1"){
            fadeAnim = animate_1;
          }else if(btnStr[index]=="2"){
            fadeAnim = animate_2;
          }else if(btnStr[index]=="3"){
            fadeAnim = animate_3;
          }else if(btnStr[index]=="4"){
            fadeAnim = animate_4;
          }else if(btnStr[index]=="5"){
            fadeAnim = animate_5;
          }else if(btnStr[index]=="6"){
            fadeAnim = animate_6;
          }else if(btnStr[index]=="7"){
            fadeAnim = animate_7;
          }else if(btnStr[index]=="8"){
            fadeAnim = animate_8;
          }else if(btnStr[index]=="9"){
            fadeAnim = animate_9;
          }else if(btnStr[index]=="."){
            fadeAnim = animate_dot;
          }else if(btnStr[index]==pi){
            fadeAnim = animate_pi;
          }
          return(
          <View onTouchStart={()=>{
            key = {index}
            onPress(btnStr[index]);
            Animated.timing(fadeAnim, {
              toValue: 0.4,
              duration: 111
            }).start(()=>{
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 111
              }).start();
            });
            }}>
            <Animated.View style={[{opacity:fadeAnim}]}>
              <TouchableOpacity
              pressDuration="0.0"
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              // onPress={() => onPress(btnStr[index])}
              >
              <View style={styles.btn_1}>
                <Text style={styles.btn_number_text}>{btnStr[index]}</Text>
              </View>
            </TouchableOpacity>
            </Animated.View>
          </View>
          );
        }else if(["/"].includes(btnStr[index])){
          return(<TouchableOpacity
            key = {index}
            pressDuration="0.0"
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => onPress(btnStr[index])}>
            <View style={[styles.btn_1,styles.btn_operator,{marginTop:0}]}>
              <Text style={styles.btn_operator_text}>{btnStr[index]}</Text>
            </View>
          </TouchableOpacity>);
        }else if([sqrt].includes(btnStr[index])){
          let onoffBackground = (sqrtOn)?styles.btnOn:{};
          let onoffText = (sqrtOn)?styles.btnOnText:{};
          return(<TouchableOpacity
            key = {index}
            pressDuration="0.0"
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => onPress(btnStr[index])}>
            <View style={[styles.btn_1,styles.btn_operator,{marginTop:0,},onoffBackground]}>
              <Text style={[styles.btn_operator_text,onoffText]}>{btnStr[index]}</Text>
            </View>
          </TouchableOpacity>);
        }else if(["x","-","+","%"].includes(btnStr[index])){
          return(<TouchableOpacity
            key = {index}
            pressDuration="0.0"
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => onPress(btnStr[index])}>
            <View style={[styles.btn_1,styles.btn_operator]}>
              <Text style={[styles.btn_operator_text,((btnStr[index]=="%")?{marginTop:0}:{})]}>{btnStr[index]}</Text>
            </View>
          </TouchableOpacity>);
        }else if([logText].includes(btnStr[index])){
          let onoffBackground = (logOn)?styles.btnOn:{};
          let onoffText = (logOn)?styles.btnOnText:{};
          return(<TouchableOpacity
            key = {index}
            pressDuration="0.0"
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => onPress(log)}>
            <View style={[styles.btn_1,styles.btn_operator,onoffBackground]}>
              <Text style={[styles.btn_operator_text,styles.btn_operator_log_text,onoffText]}>{logText}</Text>
            </View>
              <TouchableOpacity
                pressDuration="0.0"
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => onPress(func3)} style={{position:"absolute",bottom:funcBtnBottom,height:10,left:0,right:0}}>
              <View style={[styles.btnChangeTool]}>
                <Text style={[styles.btnChangeToolText]}>{i18n.t('function',{page:"1"})}</Text>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>);
        }else if([tipText,"e"].includes(btnStr[index])){
          return(<TouchableOpacity
            key = {index}
            pressDuration="0.0"
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => onPress(btnStr[index])}>
            <View style={[styles.btn_1,styles.btn_operator]}>
              <Text style={[styles.btn_operator_text]}>{btnStr[index]}</Text>
            </View>
          </TouchableOpacity>);
        }else if([sinText,cosText,tanText].includes(btnStr[index])){
          if(btnStr[index]==sinText){
            let onoffBackground = (sin0On)?styles.btnOn:{};
            let onoffText = (sin0On)?styles.btnOnText:{};
            return(<TouchableOpacity
              key = {index}
              pressDuration="0.0"
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => onPress(sin)}>
              <View style={[styles.btn_1,styles.btn_operator_4,onoffBackground]}>
                <Text style={[styles.btn_operator_text,styles.btn_operator_sin_cos_tan_text,onoffText]}>{btnStr[index].substring(0,3)}</Text>
              </View>
              <TouchableOpacity
                key = {index+"btn"}
                pressDuration="0.0"
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => onPress(func1)} style={{position:"absolute",bottom:funcBtnBottom,height:10,left:0,right:0}}>
              <View style={[styles.btnChangeTool]}>
                <Text style={[styles.btnChangeToolText]}>{i18n.t('function',{page:"2"})}</Text>
              </View>
            </TouchableOpacity>
            </TouchableOpacity>
            );
          }else if(btnStr[index]==cosText){
            let onoffBackground = (cos0On)?styles.btnOn:{};
            let onoffText = (cos0On)?styles.btnOnText:{};
            return(<TouchableOpacity
              key = {index}
              pressDuration="0.0"
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => onPress(cos)}>
              <View style={[styles.btn_1,styles.btn_operator_4,onoffBackground]}>
                <Text style={[styles.btn_operator_text,styles.btn_operator_sin_cos_tan_text,onoffText]}>{btnStr[index].substring(0,3)}</Text>
              </View>
            </TouchableOpacity>);
          }else{
            let onoffBackground = (tan0On)?styles.btnOn:{};
            let onoffText = (tan0On)?styles.btnOnText:{};
            return(<TouchableOpacity
              key = {index}
              pressDuration="0.0"
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => onPress(tan)}>
              <View style={[styles.btn_1,styles.btn_operator_4,onoffBackground]}>
                <Text style={[styles.btn_operator_text,styles.btn_operator_sin_cos_tan_text,onoffText]}>{btnStr[index].substring(0,3)}</Text>
              </View>
            </TouchableOpacity>);
          }
        }else if([sin1Text,cos1Text,tan1Text].includes(btnStr[index])){
          if(btnStr[index]==sin1Text){
            let onoffBackground = (sin1On)?styles.btnOn:{};
            let onoffText = (sin1On)?styles.btnOnText:{};
            return(<TouchableOpacity
              key = {index}
              pressDuration="0.0"
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => onPress(sin1)}>
              <View style={[styles.btn_1,styles.btn_operator_3,onoffBackground]}>
                <Text style={[styles.btn_operator_small_text,styles.opacity,styles.btn_operator_small_text_near]}>-1</Text>
                <Text style={[styles.btn_operator_text,styles.btn_operator_sin_cos_tan_text,onoffText]}>{btnStr[index].substring(0,3)}</Text>
                <Text style={[styles.btn_operator_small_text,styles.btn_operator_small_text_near,onoffText]}>-1</Text>
              </View>
              <TouchableOpacity
                key = {index+"btn"}
                pressDuration="0.0"
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => onPress(func2)} style={{position:"absolute",bottom:funcBtnBottom,height:10,left:0,right:0}}>
              <View style={[styles.btnChangeTool]}>
            <Text style={[styles.btnChangeToolText]}>{i18n.t('function',{page:"3"})}</Text>
              </View>
            </TouchableOpacity>
            </TouchableOpacity>
            );
          }else if(btnStr[index]==cos1Text){
            let onoffBackground = (cos1On)?styles.btnOn:{};
            let onoffText = (cos1On)?styles.btnOnText:{};
            return(<TouchableOpacity
              key = {index}
              pressDuration="0.0"
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => onPress(cos1)}>
              <View style={[styles.btn_1,styles.btn_operator_3,onoffBackground]}>
                <Text style={[styles.btn_operator_small_text,styles.opacity,styles.btn_operator_small_text_near]}>-1</Text>
                <Text style={[styles.btn_operator_text,styles.btn_operator_sin_cos_tan_text,onoffText]}>{btnStr[index].substring(0,3)}</Text>
                <Text style={[styles.btn_operator_small_text,styles.btn_operator_small_text_near,onoffText]}>-1</Text>
              </View>
            </TouchableOpacity>);
          }else{
            let onoffBackground = (tan1On)?styles.btnOn:{};
            let onoffText = (tan1On)?styles.btnOnText:{};
            return(<TouchableOpacity
              key = {index}
              pressDuration="0.0"
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => onPress(tan1)}>
              <View style={[styles.btn_1,styles.btn_operator_3,onoffBackground]}>
                <Text style={[styles.btn_operator_small_text,styles.opacity,styles.btn_operator_small_text_near]}>-1</Text>
                <Text style={[styles.btn_operator_text,styles.btn_operator_sin_cos_tan_text,onoffText]}>{btnStr[index].substring(0,3)}</Text>
                <Text style={[styles.btn_operator_small_text,styles.btn_operator_small_text_near,onoffText]}>-1</Text>
              </View>
            </TouchableOpacity>);
          }
        }else if([pow].includes(btnStr[index])){
          let onoffBackground = (powOn)?styles.btnOn:{};
          let onoffText = (powOn)?styles.btnOnText:{};
          return(<TouchableOpacity
            key = {index}
            pressDuration="0.0"
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => onPress(btnStr[index])}>
            <View style={[styles.btn_1,styles.btn_operator,onoffBackground]}>
              <Text style={[styles.btn_operator_small_text,styles.opacity]}>n</Text>
              <Text style={[styles.btn_operator_text,onoffText]}>y</Text>
              <Text style={[styles.btn_operator_small_text,onoffText]}>n</Text>
            </View>
          </TouchableOpacity>);
        }else if(["="].includes(btnStr[index])){
          return(<TouchableOpacity
            key = {index}
            pressDuration="0.0"
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => onPress(btnStr[index])}>
            <View style={[styles.btn_1,styles.btn_operator]}>
              <Text style={styles.btn_operator_text}>{btnStr[index]}</Text>
            </View>
          </TouchableOpacity>);
        }
      })
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain"></Image> */}
      <View style={styles.space}></View>
      <View style={styles.textbox}>
        <View style={styles.tipsView}>
          <TouchableOpacity onPress={()=>{goToTips()}}>
            <Text style={styles.tipsText}>{i18n.t('tips')}</Text>    
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.small_scrollview} bounces={true} contentContainerStyle={{flexGrow: 1, justifyContent : 'flex-end'}} persistentScrollbar={true} horizontal={true} ref={smallScrollView} onContentSizeChange={(w,h)=>updateScrollView(smallScrollView)}>
          {renderSmallText()}
        </ScrollView>
        <ScrollView style={styles.label_scrollview} contentContainerStyle={{flexGrow: 1, justifyContent : 'flex-end'}} persistentScrollbar={true} horizontal={true} ref={textboxScrollView} onContentSizeChange={(w,h)=>updateScrollView(textboxScrollView)}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{deleteDisplay()}}>
            {renderLabelText()}
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.space}></View>
      <View style={styles.historyHead}>
  <Text style={styles.historyTitle}>{i18n.t('history')}</Text>
        <TouchableOpacity style={styles.historyClean} onPress={()=>{deleteHistory()}}>
          <Text style={styles.clearHistory}>{i18n.t('clear')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.space}></View>
      <View style={styles.historyView}>
        <ScrollView style={styles.historyScroll} persistentScrollbar={true} ref={historyScrollView} onContentSizeChange={(w,h)=>updateScrollView(historyScrollView)}>
          <RenderHistoryGroup 
            history = {history}
            updateDisplayFunc = {updateDisplay}
            renderSmallTextFunc = {renderSmallText}
          />
        </ScrollView>
      </View>
      <View style={styles.space}></View>
      <View style={styles.tabListView}>
        <TouchableOpacity onPress={()=>{changeTab(0)}} pressDuration="0.1">
          <View style={[styles.tabListItem,(tabCurrent==0)?styles.tabListItemActive:{}]}>
            <Icon name='calculator' type='font-awesome' color={(tabCurrent==0)?"#011638":"#DFF8EB"} />
            <View style={[styles.tabListTriangle,(tabCurrent==0)?styles.tabListTriangleActive:{}]}></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{changeTab(1)}} pressDuration="0.1">
          <View style={[styles.tabListItem,(tabCurrent==1)?styles.tabListItemActive:{}]}>
            <Icon name='grade' color={(tabCurrent==1)?"#011638":"#DFF8EB"} />
            <View style={[styles.tabListTriangle,(tabCurrent==1)?styles.tabListTriangleActive:{}]}></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{changeTab(2)}} pressDuration="0.1">
          <View style={[styles.tabListItem,(tabCurrent==2)?styles.tabListItemActive:{}]}>
            <Icon name='history' color={(tabCurrent==2)?"#011638":"#DFF8EB"} />
            <View style={[styles.tabListTriangle,(tabCurrent==2)?styles.tabListTriangleActive:{}]}></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{changeTab(3)}} pressDuration="0.1">
          <View style={[styles.tabListItem,(tabCurrent==3)?styles.tabListItemActive:{}]}>
            <Icon name='cog' type='font-awesome' color={(tabCurrent==3)?"#011638":"#DFF8EB"} />
            <View style={[styles.tabListTriangle,(tabCurrent==3)?styles.tabListTriangleActive:{}]}></View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.space}></View>
      <View style={(tabViewHeight>0)?{height:tabViewHeight}:{}}>
        <RenderTabContentView/>
      </View>
      <View style={styles.space}></View>
      <View>
        {/* <Text style={styles.copyright}>Powered By LetgoalTech</Text> */}
        <View style={styles.space}></View>
        <View style={styles.space}></View>
      </View>
      <View style={styles.space}></View>
      <RenderTutorialGroup
        tutorialScrollView = {tutorialScrollView}
        tutorialPage = {tutorialPage}
        setTutorialPage = {setTutorialPage}
        skipTxt = {i18n.t('skip')}
        prevTxt = {i18n.t('prev')}
        nextTxt = {i18n.t('next')}
        dismissTxt = {i18n.t('dismiss')}
        i18nLang = {i18nLang}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#364156',
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: "space-between"
  },
  space:{
    padding:spacePadding,
  },
  small_scrollview:{
    height:24,
    marginLeft:90,
    overflow:"hidden"
  },
  small:{
    textAlign: "right",
    fontSize:smallFont,
    height: 24,
    color:labelTextColor,
    paddingRight:2,
    paddingLeft:0,
    paddingRight:0
  },
  small_small:{
    marginTop:2,
    fontSize:smallFont-9,
  },
  small_top_line:{
    position:"absolute",
    backgroundColor:labelTextColor,
    height:2,
    top:2,
    left:-5,
    right:0
  },
  small_view:{
    height: 24,
  },
  label_scrollview:{
    maxHeight:100,
  },
  label:{
    fontSize:bigFont,
    color:labelTextColor,
  },
  label_small:{
    marginTop:6,
    fontSize:bigFont-40,
  },
  label_top_line:{
    position:"absolute",
    backgroundColor:labelTextColor,
    height:5,
    top:5.5,
    left:-7,
    right:0
  },
  label_view:{
    height:85
  },
  textbox:{
    width: groupFixWidth,
    paddingLeft:10,
    paddingRight:10,
  },
  logo:{
    width: screen.width,
    maxHeight: 100,
  },
  historyHead:{
    width: groupFixWidth-groupFixWidth/6/4,
    flexDirection: "row",
  },
  history:{
    width: groupFixWidth-groupFixWidth/6/4,
    flexDirection: "column",
  },
  historyTitle:{
    color:"#DFF8EB",
    fontSize:smallFont,
  },
  historyClean:{
    color:"#DFF8EB",
    flex:1,
  },
  historyData:{
    color:"#DFF8EB",
    fontSize:18,
    letterSpacing:1.5,
    textAlign:"right",
  },
  btn_group:{
    width: groupFixWidth,
    flexDirection:"row",
    flexWrap: 'wrap', 
    justifyContent: 'center',
  },
  btn_1:{
    height:(isTablet)?groupFixWidth/numOfRow/1.5:groupFixWidth/numOfRow, 
    backgroundColor:"#DFF8EB",
    justifyContent:"center",
    alignItems:"center",
    width: groupFixWidth/numOfRow,
    borderWidth:2,
    borderColor:"#364156",
    overflow:"hidden",
    borderRadius:groupFixWidth/6/2,
    marginLeft:btnMarginLeftRight,
    marginRight:btnMarginLeftRight,
    marginTop:btnMarginTop,
    // marginBottom:groupFixWidth/5/4/2,
  },
  btn_2:{
    height:(isTablet)?groupFixWidth/numOfRow/1.5:groupFixWidth/numOfRow, 
    backgroundColor:"#808080",
    justifyContent:"center",
    alignItems:"center",
    width: groupFixWidth/numOfRow/2,
    borderWidth:2,
    borderColor:"#364156",
    overflow:"hidden",
    borderRadius:groupFixWidth/6/2,
    marginLeft:btnMarginLeftRight,
    marginRight:btnMarginLeftRight,
    marginTop:btnMarginTop,
    // marginBottom:groupFixWidth/5/4/2,
  },
  btn_number_text:{
    fontSize:keyFont,
    color: "#214E34",
  },
  btn_range_text:{
    fontSize:keyFont,
    color: "#DFF8EB",
  },
  btn_operator_text:{
    fontSize:keyFont,
    color: "#FFFFFF",
    marginTop:-5,
  },
  btn_operator_sin_cos_tan_text:{
    fontSize:(isTablet)?keyFont:keyFont-14,
  },
  btn_operator_log_text:{
    fontSize:(isTablet)?keyFont:keyFont-14,
    marginTop:-3,
  },
  btn_operator_small_text:{
    fontSize:18,
    marginTop:(isTablet)?(groupFixWidth/numOfRow/1.5/2)-33:5,
    color: "#FFFFFF",
    alignSelf:"flex-start",
  },
  btn_operator_small_text_near:{
    marginLeft:-13,
    marginRight:-12,
  },
  opacity:{
    opacity: 0,
  },
  btn_operator:{
    backgroundColor:"#fdae1b",
    color: "#DFF8EB",
    flexDirection:"row",
    // alignItems:"",
    // justifyContent:"flex-start"
  },
  btn_operator_2:{
    backgroundColor:"#00b976",
  },
  btn_operator_3:{
    flexDirection:"row",
    backgroundColor:"#8D95AD",
  },
  btn_operator_4:{
    flexDirection:"row",
    backgroundColor:"#EC9469",
  },
  clearHistory:{
    color:"#DFF8EB",
    backgroundColor:"#dd4b39",
    flex:1,
    fontSize:15,
    paddingLeft:15,
    paddingRight:15,
    alignSelf: 'flex-end',
    borderRadius: 10,
    lineHeight:22,
    overflow:"hidden",
  },
  historyDataView:{
    flexDirection:"row",
    justifyContent:"flex-end",
    borderBottomWidth:1,
    borderBottomColor:"#fff",
  },
  historyDataBtn:{
    alignItems:"flex-end",
    paddingTop:2,
    flexDirection:"row",
    flexWrap:'wrap',
    // height:24,
  },
  historyScroll:{
    marginTop:5,
    marginBottom:5,
    minHeight:50,
  },
  historyView:{
    flex:1,
  },
  copyright:{
    color:"gray",
    color:"#DFF8EB"
  },
  tipsView:{
    width:66,
    height:20,
    left:11,
    top:0,
    backgroundColor:"#ffc107",
    backgroundColor:"#DFF8EB",
    borderRadius:10,
    zIndex:1,
    position:"absolute"
  },
  tipsText:{
    color:"#FFF",
    color:"#214E34",
    lineHeight:18,
    textAlign:"center"
  },
  btnOn:{
    backgroundColor:"#011638",
  },
  btnOnText:{
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 1,
  },
  btnChangeTool:{
    backgroundColor:"#011638",
    flexDirection:"row",
    height:20,
    borderRadius:20,
    marginLeft:btnMarginLeftRight,
    marginRight:btnMarginLeftRight,
    justifyContent:"center",
    alignItems:"center",
    marginTop: 3,
  },
  btnChangeToolText:{
    color: "#FFFFFF",
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 1,
  },
  tabListView:{
    width:screen.width,
    flexDirection:"row",
    borderBottomColor:"#DFF8EB",
    backgroundColor:"#364156",
    borderBottomWidth:1
  },
  tabListItem:{
    width:screen.width/4-20,
    height:30,
    backgroundColor:"#011638",
    marginRight:20,
    justifyContent:"center",
    alignItems:"center"
  },
  tabListItemActive:{
    backgroundColor:"#DFF8EB",
  },
  tabListTriangle:{
    position:"absolute",
    right:-20,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 20,
    borderBottomWidth: 30,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: "#011638",
    borderLeftColor: 'transparent',
  },
  tabListTriangleActive:{
    borderBottomColor: "#DFF8EB",
  },
  longHistoryDateView:{
    // justifyContent:"flex-end",
    flexWrap:"wrap",
    flexDirection:"row",
    marginTop:5,
    padding:5,
  },
  longHistoryDate:{
    fontSize:16,
    color:longHistoryColor,
  },
  longHistoryRemoveView:{
    backgroundColor:"#dd4b39",
    borderRadius:20,
    padding:8,
    margin:8,
    marginBottom:10
  },
  longHistoryView:{
    backgroundColor:longHistoryBackground,
    marginTop:-10
  },
  longHistoryScrollView:{
    width: groupFixWidth,
    padding:8
  },
  longHistoryText:{
    textAlign: "right",
    fontSize:smallFont,
    height: 24,
    color: longHistoryColor,
    paddingRight:2,
    paddingLeft:0,
    paddingRight:0
  },
  longHistoryText_small:{
    marginTop:2,
    fontSize:smallFont-9,
  },
  longHistoryText_top_line:{
    position:"absolute",
    backgroundColor:longHistoryColor,
    height:2,
    top:2,
    left:-5,
    right:0
  },
  longHistoryText_view:{
    height: 24,
  },
  longHistoryDataBtn:{
    alignItems:"flex-end",
    paddingTop:2,
    flexDirection:"row",
    justifyContent:"flex-start",
    flexWrap:"wrap"
    // height:24,
  },
  longHistoryDataView:{
    flexDirection:"column",
    justifyContent:"flex-start",
    borderBottomWidth:1,
    borderBottomColor:longHistoryColor,
    paddingBottom:10,
    paddingLeft:5,
    paddingRight:5,
  },
  bookmarkScrollView:{
    width: groupFixWidth,
    padding:8
  },
  bookmark_bg_img: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "#000"
  },
  bookmarkView:{
    backgroundColor:longHistoryBackground,
    marginTop:-10
  },
});
