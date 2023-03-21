import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Image, Text, View, ScrollView, TextInput, TouchableHighlight, TouchableOpacity, SafeAreaView } from 'react-native';
import { red } from 'ansi-colors';
import {Dimensions} from "react-native";

var screen = Dimensions.get("window");
var groupFixWidth = screen.width - 10;

export default function App() {
  
  const [display, setDisplay] = useState("0");
  const [formula, setFormula] = useState('');
  const [history, setHistory] = useState([]);
  const textboxScrollView = useRef(null);
  const historyScrollView = useRef(null);
  const historyDataGroup = useRef(null);
  const error = "ERROR";
  const [lastBtn, setLastBtn] = useState("");

  const onPress = (val) =>{
    var displayStr = String(display);
    if(displayStr==error){
      displayStr = "0";
    }
    if(["7","8","9","4","5","6","1","2","3",".","0","(",")"].includes(val)){
      if(val=="." && String(displayStr.split(/[x|+|-|\/|\(|\)]/).pop()).includes(".")){
         
      }else if(val=="0" && displayStr == "0"){

      }else{
        if(displayStr == "0" && val!="."){
          setDisplay(val);  
        }else{
          setDisplay(displayStr + val);
        }
      }
    }
    if(["/","x","-","+"].includes(val) && !["/","x","-","+"].includes(displayStr[displayStr.length-1])){
      if(displayStr == "0" && val == "-"){
        setDisplay(val);
      }else{
        setDisplay(displayStr + val);
      }
    }
    if(["="].includes(val) && lastBtn!="="){
      var formula = displayStr;
      var addMultiStr=['0','1','2','3','4','5','6','7','8','9',')'];
      var answer = error;
      var formula_str = "";
      for(var i=0; i<=addMultiStr.length; i++){
        var str = addMultiStr[i];
        formula = formula.split(str+"(").join(str+"x(");
        formula = formula.split(")"+str).join(")x"+str);
      }
      formula = formula.split(".(").join(".0x(");
      formula = formula.split(").").join(")x0.");
      formula_str = formula;
      setFormula(formula_str);
      formula = formula.split("x").join("*");
      try{
        answer = eval(formula);
        setDisplay(answer);
      }catch(err){
        setDisplay(error);
      }

      var time = new Date();
      time = time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
      history.push(
        <View style={styles.history}>
          <TouchableOpacity style={styles.historyDataBtn} onPress={()=>{updateDisplay(formula_str)}}>
            <Text style={styles.historyData}>
              {formula_str} = {answer}
            </Text>
          </TouchableOpacity>
        </View>
      );
      setHistory(history);
    }
    if(["AC"].includes(val)){
      setDisplay(0);
      setFormula("");
      setLastBtn("");
    }
    setLastBtn(val);
  }

  const genBtn = () =>{
    var btnList = [];
    const btnStr = [
      "AC","(",")","/",
      "7","8","9","x",
      "4","5","6","-",
      "1","2","3","+",
      ".","0","=",];
    btnStr.map(function (val, index) {
      if(["AC"].includes(val)){
        btnList.push(<TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => onPress(val)}>
          <View style={[styles.btn_1,styles.btn_operator_2]}>
            <Text style={styles.btn_number}>{val}</Text>
          </View>
        </TouchableHighlight>);
      }else if(["(",")"].includes(val)){
        btnList.push(<TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => onPress(val)}>
          <View style={[styles.btn_1,styles.btn_operator_2]}>
            <Text style={styles.btn_range}>{val}</Text>
          </View>
        </TouchableHighlight>);
      }else if(["7","8","9","4","5","6","1","2","3",".","0","(",")"].includes(val)){
        btnList.push(<TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => onPress(val)}>
          <View style={styles.btn_1}>
            <Text style={styles.btn_number}>{val}</Text>
          </View>
        </TouchableHighlight>);
      }else if(["/","x","-","+"].includes(val)){
        btnList.push(<TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => onPress(val)}>
          <View style={[styles.btn_1,styles.btn_operator]}>
            <Text style={styles.btn_number}>{val}</Text>
          </View>
        </TouchableHighlight>);
      }else if(["="].includes(val)){
        btnList.push(<TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => onPress(val)}>
          <View style={[styles.btn_2,styles.btn_operator]}>
            <Text style={styles.btn_number}>{val}</Text>
          </View>
        </TouchableHighlight>);
      }
    })
    return btnList;
  }

  const updateScrollView = (ele)=>{
    ele.current.scrollToEnd({animated: true});
  }

  const deleteDisplay = ()=>{
    var str = String(display).substring(0, String(display).length - 1);
    if(str==""){
      str = "0";
    }
    setDisplay(str);
  }

  const updateDisplay = (str)=>{
    setDisplay(str);
    setLastBtn("");
  }

  const deleteHistory = ()=>{
    setHistory([]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain"></Image>
      <View style={styles.space}></View>
      <View style={styles.textbox}>
        <Text style={styles.small}>{formula}</Text>
        <ScrollView style={{maxHeight:80}} contentContainerStyle={{flexGrow: 1, justifyContent : 'flex-end'}} persistentScrollbar={true} horizontal={true} ref={textboxScrollView} onContentSizeChange={(w,h)=>updateScrollView(textboxScrollView)}>
          <TouchableOpacity onPress={()=>{deleteDisplay()}}>
            <Text style={[styles.label]}>{display}</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.space}></View>
      <View style={styles.historyHead}>
        <Text style={styles.historyTitle}>History (Click to clone formula)</Text>
        <TouchableOpacity style={styles.historyClean} onPress={()=>{deleteHistory()}}>
          <Text style={styles.clearHistory}>Clear</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.historyScroll} persistentScrollbar={true} ref={historyScrollView} onContentSizeChange={(w,h)=>updateScrollView(historyScrollView)}>
        <View ref={historyDataGroup}>
          {history}
        </View>
      </ScrollView>
      <View style={styles.btn_group}>
        {genBtn()}
      </View>
      <Text>By LetgoalTect</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  space:{
    padding:5,
  },
  small:{
    textAlign: "right",
    fontSize:20,
    height: 20,
  },
  label:{
    fontSize:60,
  },
  textbox:{
    backgroundColor:'#e2e2e2',
    borderColor: '#bfbfbf',
    borderWidth:4,
    width: screen.width,
    paddingLeft:5,
    paddingRight:5,
  },
  logo:{
    width: screen.width,
    maxHeight: 100,
  },
  historyHead:{
    width: groupFixWidth,
    flexDirection: "row",
  },
  history:{
    width: groupFixWidth,
    flexDirection: "column",
  },
  historyTitle:{
    color:"gray",
    fontSize:18,
  },
  historyClean:{
    color:"gray",
    fontSize:18,
    flex:1,
  },
  historyData:{
    color:"gray",
    fontSize:18,
  },
  btn_group:{
    width: groupFixWidth,
    flexDirection:"row",
    backgroundColor:"red",
    flexWrap: 'wrap', 
  },
  btn_1:{
    height:80, 
    backgroundColor:"#808080",
    width:80,
    justifyContent:"center",
    alignItems:"center",
    width: groupFixWidth/4,
    borderWidth:2,
    borderColor:"#000",
  },
  btn_2:{
    height:80, 
    backgroundColor:"#808080",
    width:80,
    justifyContent:"center",
    alignItems:"center",
    width: groupFixWidth/2,
    borderWidth:2,
    borderColor:"#000",
  },
  btn_number:{
    fontSize:48,
    color: "#FFF",
  },
  btn_range:{
    fontSize:48,
    color: "#FFF",
  },
  btn_operator:{
    backgroundColor:"#ffa600",
  },
  btn_operator_2:{
    backgroundColor:"#4a4949",
  },
  clearHistory:{
    color:"#FFF",
    backgroundColor:"#dd4b39",
    flex:1,
    fontSize:15,
    paddingLeft:15,
    paddingRight:15,
    alignSelf: 'flex-end',
    borderRadius: 10,
    lineHeight:20,
    overflow:"hidden",
  },
  historyDataBtn:{
    alignItems:"flex-end",
    paddingTop:2,
  },
  historyScroll:{
    marginTop:5,
    marginBottom:5,
    maxHeight:80,
    minHeight:0,
  }
});
