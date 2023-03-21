import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Image, ImageBackground, Text, View, ScrollView, TextInput, TouchableHighlight, TouchableOpacity, SafeAreaView } from 'react-native';
import {Dimensions} from "react-native";
var screen = Dimensions.get("window");
var groupFixWidth = screen.width - 10;
var viewStyle = {};
var textStyle_en = {fontSize:32,color:"#fff",textAlign:"center",paddingTop:40,paddingLeft:5,paddingRight:5};
var textStyle_zh = {fontSize:32,color:"#fff",textAlign:"center",paddingTop:10};
var linStyle = {borderBottomWidth: 1,borderBottomColor: "#fff", marginTop:20, marginBottom:20,marginLeft:10,marginRight:10};
var imgStyle = {width:groupFixWidth,marginTop:5,marginBottom:5};
export const formula_lesson_content = {
  "0":<View style={viewStyle}>
        <Text style={textStyle_en}>Addition</Text>
        <Text style={textStyle_zh}>加法</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p0_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.7}]}/>
        <Image source={require("../assets/page/p0_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.6}]}/>
      </View>,
  "1":<View style={viewStyle}>
        <Text style={textStyle_en}>Subtraction</Text>
        <Text style={textStyle_zh}>減法</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p1_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle]}/>
        <Image source={require("../assets/page/p1_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.7}]}/>
        <Image source={require("../assets/page/p1_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.04}]}/>
      </View>,
  "2":<View style={viewStyle}>
        <Text style={textStyle_en}>Multiplication</Text>
        <Text style={textStyle_zh}>乘法</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p2_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{marginBottom:0,marginTop:15}]}/>
        <Image source={require("../assets/page/p2_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{marginBottom:0,marginTop:0}]}/>
        <Image source={require("../assets/page/p2_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{marginBottom:0,marginTop:0}]}/>
        <Image source={require("../assets/page/p2_3.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{marginBottom:0,marginTop:0}]}/>
        <Image source={require("../assets/page/p2_4.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{marginBottom:0,marginTop:0}]}/>
        <Image source={require("../assets/page/p2_5.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{marginBottom:0,marginTop:0}]}/>
        <Image source={require("../assets/page/p2_6.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{marginBottom:0,marginTop:0}]}/>
        <Image source={require("../assets/page/p2_7.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{marginBottom:0,marginTop:0}]}/>
        <Image source={require("../assets/page/p2_8.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{marginBottom:0,marginTop:0}]}/>
        <Image source={require("../assets/page/p2_9.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{marginBottom:0,marginTop:0}]}/>
        <Image source={require("../assets/page/p2_10.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle]}/>
      </View>,
  "3":<View style={viewStyle}>
        <Text style={textStyle_en}>Division</Text>
        <Text style={textStyle_zh}>除法</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p3_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.3}]}/>
        <Image source={require("../assets/page/p3_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.3}]}/>
      </View>,
  "4":<View style={viewStyle}>
        <Text style={textStyle_en}>HCF</Text>
        <Text style={textStyle_zh}>最大公因數</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p4_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{marginTop:20}]}/>
      </View>,
  "5":<View style={viewStyle}>
        <Text style={textStyle_en}>LCM</Text>
        <Text style={textStyle_zh}>最小公倍數</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p5_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{marginTop:0}]}/>
      </View>,
  "6":<View style={viewStyle}>
        <Text style={textStyle_en}>Formulas and Identities</Text>
        <Text style={textStyle_zh}>公式與恆等式</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p6_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle]}/>
        
      </View>,
  "7":<View style={viewStyle}>
        <Text style={textStyle_en}>Laws of Indices</Text>
        <Text style={textStyle_zh}>指數的特性</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p7_4.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.9}]}/>
        <Text style={textStyle_en}></Text>
        <Text style={textStyle_en}>Laws of Logarithms</Text>
        <Text style={textStyle_zh}>對數的特性</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p7_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.3}]}/>
        <Image source={require("../assets/page/p7_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.2}]}/>
        <Image source={require("../assets/page/p7_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.1}]}/>
        <Image source={require("../assets/page/p7_3.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.5}]}/>
      </View>,
  "8":<View style={viewStyle}>
        <Text style={textStyle_en}>Maximum Absolute Error</Text>
        <Text style={textStyle_zh}>最大絕對誤差</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p8_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.4}]}/>
        <Image source={require("../assets/page/p8_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.4}]}/>
        <Text style={textStyle_en}>Upper Limit and Lower Limit</Text>
        <Text style={textStyle_zh}>真確值的上限和下限</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p8_3.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.5}]}/>
        <Image source={require("../assets/page/p8_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.4}]}/>
        <Text style={textStyle_en}>Absolute Error</Text>
        <Text style={textStyle_zh}>絕對誤差</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p8_5.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.2,marginTop:30}]}/>
        <Image source={require("../assets/page/p8_4.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.2}]}/>
        <Text style={textStyle_en}>Relative Error</Text>
        <Text style={textStyle_zh}>相對誤差</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p8_7.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.5,marginTop:30}]}/>
        <Image source={require("../assets/page/p8_6.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.5}]}/>
        <Text style={textStyle_en}>Percentage Error</Text>
        <Text style={textStyle_zh}>百分誤差</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p8_9.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.2,marginTop:30}]}/>
        <Image source={require("../assets/page/p8_8.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.2}]}/>
      </View>,
  "9":<View style={viewStyle}>
        <Text style={textStyle_en}>Percentages and Percentages Change</Text>
        <Text style={textStyle_zh}>百分數與百分變化</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p9_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.5,marginTop:30}]}/>
        <Image source={require("../assets/page/p9_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.5}]}/>
        <Text style={textStyle_en}>Discount</Text>
        <Text style={textStyle_zh}>折扣</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p9_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.6,marginTop:30}]}/>
        <Image source={require("../assets/page/p9_3.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.6}]}/>
        <Text style={textStyle_en}>Profit and Loss</Text>
        <Text style={textStyle_zh}>盈利和虧蝕</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p9_4.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.9,marginTop:30}]}/>
        <Image source={require("../assets/page/p9_5.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.9}]}/>
        <Text style={textStyle_en}>Simple and Compound Interest</Text>
        <Text style={textStyle_zh}>單利息與複利息</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p9_6.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.1,marginTop:30}]}/>
        <Image source={require("../assets/page/p9_7.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.1}]}/>
      </View>,
  "10":<View style={viewStyle}>
        <Text style={textStyle_en}>Division Algorithm</Text>
        <Text style={textStyle_zh}>除法算式</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p10_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.2,marginTop:30}]}/>
        <Image source={require("../assets/page/p10_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.2}]}/>
        <Text style={textStyle_en}>Remainder Theorem</Text>
        <Text style={textStyle_zh}>餘式定理</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p10_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.4,marginTop:30}]}/>
        <Image source={require("../assets/page/p10_3.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.4}]}/>
        <Text style={textStyle_en}>Factor Theorem</Text>
        <Text style={textStyle_zh}>因式定理</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p10_4.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.7,marginTop:30}]}/>
        <Image source={require("../assets/page/p10_5.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.7}]}/>
      </View>,
  "11":<View style={viewStyle}>
        <Text style={textStyle_en}>Solve Quadratic Equation</Text>
        <Text style={textStyle_zh}>解二次方程</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p11_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.1,marginTop:30}]}/>
        <Image source={require("../assets/page/p11_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.6}]}/>
        <Image source={require("../assets/page/p11_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.1,marginTop:30}]}/>
        <Image source={require("../assets/page/p11_3.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.6}]}/>
        <Text style={textStyle_en}>Nature of Roots</Text>
        <Text style={textStyle_zh}>根的性質</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p11_4.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.6}]}/>
        <Image source={require("../assets/page/p11_5.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.6}]}/>
        <Text style={textStyle_en}>Form Quadratic Equation</Text>
        <Text style={textStyle_zh}>建立二次方程</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p11_6.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.9,marginTop:30}]}/>
        <Image source={require("../assets/page/p11_7.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.9,marginTop:30}]}/>
        <Text style={textStyle_en}>Complex Numbers</Text>
        <Text style={textStyle_zh}>複數</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p11_8.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.3,marginTop:60}]}/>
        <Image source={require("../assets/page/p11_9.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.3,marginTop:30}]}/>
      </View>,
  "12":<View style={viewStyle}>
        <Text style={textStyle_en}>Transformations of Functions</Text>
        <Text style={textStyle_zh}>函數變換</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p12_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.49,marginTop:30,marginBottom:0}]}/>
        <Image source={require("../assets/page/p12_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.33,marginTop:0,marginBottom:0}]}/>
        <Image source={require("../assets/page/p12_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.34,marginTop:0,marginBottom:0}]}/>
        <Image source={require("../assets/page/p12_3.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.5,marginTop:0,marginBottom:0}]}/>
        <Image source={require("../assets/page/p12_4.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.52,marginTop:0,marginBottom:0}]}/>
        <Image source={require("../assets/page/p12_5.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.57,marginTop:30,marginBottom:0}]}/>
        <Image source={require("../assets/page/p12_6.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.48,marginTop:0,marginBottom:0}]}/>
        <Image source={require("../assets/page/p12_7.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.46,marginTop:0,marginBottom:0}]}/>
        <Image source={require("../assets/page/p12_8.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.55,marginTop:0,marginBottom:0}]}/>
        <Image source={require("../assets/page/p12_9.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.57,marginTop:0,marginBottom:0}]}/>
      </View>,
  "13":<View style={viewStyle}>
        <Text style={textStyle_en}>Direct Variation</Text>
        <Text style={textStyle_zh}>正變</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p13_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.2,marginTop:30}]}/>
        <Image source={require("../assets/page/p13_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.2}]}/>
        <Text style={textStyle_en}>Inverse Variation</Text>
        <Text style={textStyle_zh}>反變</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p13_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.4,marginTop:30}]}/>
        <Image source={require("../assets/page/p13_3.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.4}]}/>
        <Text style={textStyle_en}>Joint Variation</Text>
        <Text style={textStyle_zh}>聯變</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p13_4.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.75,marginTop:30}]}/>
        <Image source={require("../assets/page/p13_5.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.75}]}/>
        <Text style={textStyle_en}>Partial Variation</Text>
        <Text style={textStyle_zh}>部分變</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p13_6.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.1,marginTop:10}]}/>
        <Image source={require("../assets/page/p13_7.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.1}]}/>
      </View>,
  "14":<View style={viewStyle}>
        <Text style={textStyle_en}>Arithmetic Sequence</Text>
        <Text style={textStyle_zh}>等差數列</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p14_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.2,marginTop:10}]}/>
        <Image source={require("../assets/page/p14_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.2}]}/>
        <Text style={textStyle_en}>Geometric Sequence</Text>
        <Text style={textStyle_zh}>幾何數列</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p14_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.5,marginTop:10}]}/>
        <Image source={require("../assets/page/p14_3.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.5}]}/>
      </View>,
  "15":<View style={viewStyle}>
        <Text style={textStyle_en}>Acute Angle</Text>
        <Text style={textStyle_zh}>銳角</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p15_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.7,marginTop:30}]}/>
        <Image source={require("../assets/page/p15_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.6}]}/>
        <Image source={require("../assets/page/p15_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.7}]}/>
        <Image source={require("../assets/page/p15_3.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.5}]}/>
        <Text style={textStyle_en}>Trigonometric Identities</Text>
        <Text style={textStyle_zh}>三角恆等式</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p15_4.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.4,marginTop:30}]}/>
        <Image source={require("../assets/page/p15_6.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.6}]}/>
        <Image source={require("../assets/page/p15_5.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.9}]}/>
        <Image source={require("../assets/page/p15_7.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.3}]}/>
        <Text style={textStyle_en}>Sine Formula</Text>
        <Text style={textStyle_zh}>正弦公式</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p15_8.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1,marginTop:30}]}/>
        <Text style={textStyle_en}>Cosine Formula</Text>
        <Text style={textStyle_zh}>餘弦公式</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p15_9.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1,marginTop:30}]}/>
        <Text style={textStyle_en}>Area of A Triangle</Text>
        <Text style={textStyle_zh}>三角形面積</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p15_10.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1,marginTop:30}]}/>
        <Image source={require("../assets/page/p15_11.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1}]}/>
        <Text style={textStyle_en}>Herons Formula</Text>
        <Text style={textStyle_zh}>希羅公式</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p15_12_v2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.3,marginTop:50,marginBottom:0}]}/>
        <Image source={require("../assets/page/p15_13.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.1}]}/>
      </View>,
  "16":<View style={viewStyle}>
        <Text style={textStyle_en}>Planes</Text>
        <Text style={textStyle_zh}>平面圖形</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p16_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.36}]}/>
        <Image source={require("../assets/page/p16_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.25,marginTop:-10}]}/>
        <Image source={require("../assets/page/p16_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.33,marginTop:-10}]}/>
        <Image source={require("../assets/page/p16_3.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.35,marginTop:-10}]}/>
        <Image source={require("../assets/page/p16_4.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.35,marginTop:30}]}/>
        <Image source={require("../assets/page/p16_5.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.25,marginTop:-10}]}/>
        <Image source={require("../assets/page/p16_6.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.33,marginTop:-10}]}/>
        <Image source={require("../assets/page/p16_7.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.35,marginTop:-10}]}/>
        <Text style={textStyle_en}>Solids</Text>
        <Text style={textStyle_zh}>立體圖形</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p16_8.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.37}]}/>
        <Image source={require("../assets/page/p16_9.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.22,marginTop:-10}]}/>
        <Image source={require("../assets/page/p16_10.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.22,marginTop:-10}]}/>
        <Image source={require("../assets/page/p16_11.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.65,marginTop:-10}]}/>
        <Image source={require("../assets/page/p16_12.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.37}]}/>
        <Image source={require("../assets/page/p16_13.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.24,marginTop:-20}]}/>
        <Image source={require("../assets/page/p16_14.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.24,marginTop:-20}]}/>
        <Image source={require("../assets/page/p16_15.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.65,marginTop:-20}]}/>
        <Text style={textStyle_en}>Eulaers Formula</Text>
        <Text style={textStyle_zh}>歐拉公式</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p16_16.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.2}]}/>
        <Image source={require("../assets/page/p16_17.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.3}]}/>
        <Text style={textStyle_en}>Similar Planes and Solids</Text>
        <Text style={textStyle_zh}>相似平面圖形和立體圖形</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p16_18.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.7}]}/>
        <Image source={require("../assets/page/p16_19.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.3}]}/>
        <Image source={require("../assets/page/p16_20.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.7,marginTop:30}]}/>
        <Image source={require("../assets/page/p16_21.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.3}]}/>
      </View>,
  "17":<View style={viewStyle}>
        <Text style={textStyle_en}>Distance Formula</Text>
        <Text style={textStyle_zh}>距離公式</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p17_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.1}]}/>
        <Text style={textStyle_en}>Slope</Text>
        <Text style={textStyle_zh}>斜率</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p17_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1}]}/>
        <Image source={require("../assets/page/p17_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1}]}/>
        <Text style={textStyle_en}>Midpoint Formula</Text>
        <Text style={textStyle_zh}>中點公式</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p17_3.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.1}]}/>
        <Text style={textStyle_en}>Internal Point of Division</Text>
        <Text style={textStyle_zh}>內分點的截點公式</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p17_4.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.1}]}/>
        <Image source={require("../assets/page/p17_5.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1}]}/>
      </View>,
  "18":<View style={viewStyle}>
        <Text style={textStyle_en}>Dquations of Straight Line</Text>
        <Text style={textStyle_zh}>直線方程</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p18_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.7,marginTop:30}]}/>
        <Image source={require("../assets/page/p18_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1}]}/>
        <Image source={require("../assets/page/p18_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1.7}]}/>
        <Image source={require("../assets/page/p18_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1}]}/>
        <Text style={textStyle_en}>Equations of Circle</Text>
        <Text style={textStyle_zh}>圓形方程</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p18_3.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1}]}/>
        <Image source={require("../assets/page/p18_4.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.7}]}/>
        <Image source={require("../assets/page/p18_5.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*1,marginTop:50}]}/>
        <Image source={require("../assets/page/p18_4.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.7}]}/>
      </View>,
  "19":<View style={viewStyle}>
        <Text style={textStyle_en}>Permutation</Text>
        <Text style={textStyle_zh}>排列</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p19_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.5}]}/>
        <Image source={require("../assets/page/p19_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.5}]}/>
        <Text style={textStyle_en}>Combination</Text>
        <Text style={textStyle_zh}>組合</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p19_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.5}]}/>
        <Image source={require("../assets/page/p19_3.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.5}]}/>
      </View>,
  "20":<View style={viewStyle}>
        <Text style={textStyle_en}>Non Grouped Data</Text>
        <Text style={textStyle_zh}>不分組數據</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p20_0.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.3}]}/>
        <Text style={textStyle_en}>Grouped Data</Text>
        <Text style={textStyle_zh}>分組數據</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p20_1.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.3}]}/>
        <Text style={textStyle_en}>Standard Score</Text>
        <Text style={textStyle_zh}>標準分</Text>
        <View style={linStyle}></View>
        <Image source={require("../assets/page/p20_2.png")} resizeMode="contain" resizeMethod="scale" style={[imgStyle,{height:groupFixWidth*0.3}]}/>
      </View>,
}
