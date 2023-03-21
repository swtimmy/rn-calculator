import * as React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Calculator from './component/Calculator'
import Listing from './component/Listing'
import Setting from './component/Setting'
import Content from './component/Content'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content"/>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={Calculator} options={{headerShown: false}}/>
        <Stack.Screen name="Listing" component={Listing} options={{}}/>
        <Stack.Screen name="Setting" component={Setting} options={{}}/>
        <Stack.Screen name="Content" component={Content} options={{}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;