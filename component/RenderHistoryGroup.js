import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import { StyleSheet, Image, Text, View, ScrollView, TextInput, TouchableHighlight, TouchableOpacity, SafeAreaView, Clipboard, ImageBackground} from 'react-native';
import {Dimensions, Platform, AsyncStorage} from "react-native";
import {isTablet} from 'react-native-device-detection';
import { SQRT1_2 } from 'mathjs';

var screen = Dimensions.get("window");
var groupFixWidth = screen.width;
const smallFont = (screen.height<690)?16:20;
const fractionFont = (screen.height<690)?10:10;
const bigFont = (screen.height<690)?60:70;
const btnMarginTop = (screen.height<690)?5:8;
const keyFont = (screen.height<690)?28:38;
const numOfRow = 6;
const btnMarginLeftRight = groupFixWidth/6/6/2;
const labelTextColor = "#DFF8EB";
const longHistoryColor = "#011638";
const longHistoryBackground = "#DFF8EB";
const isIOS = (Platform.OS=="ios")?true:false;

export const RenderHistoryGroup = memo(
    ({history,updateDisplayFunc,renderSmallTextFunc})=>{
      return (
        <View>
          {
            history.map((v,i)=>(
              <RenderHistoryView 
                view={styles.history}
                viewDataView={styles.historyDataView}
                viewDataBtn={styles.historyDataBtn}
                small = {styles.small}
                updateDisplay = {updateDisplayFunc}
                renderText = {renderSmallTextFunc}
                formula = {v.formula}
                answer = {v.answer}
                fraction = {v.fraction}
              />
            ))
          }
        </View>
      )
    }
  );

  const RenderFraction = (Props)=>{
    const isFraction = Props.fraction;
    if(isFraction){
        let digitalText,supText,subText;
        if(isFraction.indexOf("&")!=-1){
          digitalText = isFraction.split("&")[0].replace(" = ","");
          let otherText = isFraction.split("&")[1];
          supText = otherText.split("/")[0].replace(" = ","");
          subText = otherText.split("/")[1];
        }else{
          supText = isFraction.split("/")[0].replace(" = ","");
          subText = isFraction.split("/")[1];
        }
        let equal = "=";
        if(parseFloat(supText)<0){
          supText=Math.abs(supText);
          equal = "= -"
        }
        return (<View style={{flexDirection:"row"}}>
            <Text style={[Props.small,{paddingLeft:5},(equal=="=")?{paddingRight:5}:{paddingRight:2}]}>{equal}</Text>
            <Text style={[Props.small,{paddingRight:2},(!digitalText)?{display:"none"}:{}]}>{digitalText}</Text>
            <View style={Props.fractionView}>
                <View style={Props.sup}>
                    <Text style={Props.fractionText}>{supText}</Text>
                </View>
                <View style={Props.sul}></View>
                <View style={Props.sub}>
                    <Text style={Props.fractionText}>{subText}</Text>
                </View>
            </View>
        </View>)
    }
    return null;
  }
  
  const RenderHistoryView = (Props)=>{
    return (
      <View style={Props.view}>
        <View style={Props.viewDataView}>
          <TouchableOpacity style={Props.viewDataBtn} onPress={()=>{Props.updateDisplay(Props.formula,true)}}>
            {Props.renderText(Props.formula)}
            <TouchableOpacity style={{flexDirection:"row",justifyContent:"flex-end"}} onPress={()=>{Props.updateDisplay(Props.answer,true)}}>
              <Text style={Props.small}> = {Props.answer}</Text>
            </TouchableOpacity>
            <RenderFraction
                fraction = {Props.fraction}
                small = {Props.small}
                sup = {styles.sup}
                sub = {styles.sub}
                sul = {styles.sul}
                fractionView = {styles.fractionView}
                fractionText = {styles.fractionText}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  };


const styles = StyleSheet.create({
    small:{
      textAlign: "right",
      fontSize:smallFont,
      height: 24,
      color:labelTextColor,
      paddingRight:2,
      paddingLeft:0,
      paddingRight:0
    },
    history:{
      width: groupFixWidth-groupFixWidth/6/4,
      flexDirection: "column",
    },
    historyData:{
      color:"#DFF8EB",
      fontSize:18,
      letterSpacing:1.5,
      textAlign:"right",
    },
    historyDataView:{
      flexDirection:"row",
      justifyContent:"flex-end",
      borderBottomWidth:1,
      borderBottomColor:"#fff",
    },
    historyDataBtn:{
      justifyContent: "flex-end",
      paddingTop:2,
      flexDirection:"row",
      flexWrap:'wrap',
      // height:24,
    },
    historyView:{
      flex:1,
    },
    fractionView:{
        
    },
    sup:{
        justifyContent:"center"
    },
    sul:{
      height:1,
      width:"100%",
      backgroundColor:"#DFF8EB"
    },
    sub:{
        justifyContent:"center"
    },
    fractionText:{
        fontSize:fractionFont,
        color:"#DFF8EB",
        alignSelf:"center"
    }
  });
  