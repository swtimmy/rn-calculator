import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Text, SectionList, View } from 'react-native';
import {Dimensions} from "react-native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';

var screen = Dimensions.get("window");
var groupFixWidth = screen.width - 10;

export default function Listing({navigation}) {

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity activeOpacity={0.5}>
        <FontAwesome.Button name="cog" size={30} color="#fff" backgroundColor="#000" onPress={()=>{navigation.push("Setting")}}/>
      </TouchableOpacity>
    ),
    title: 'Listing', 
    headerStyle: {backgroundColor: '#000'},
    headerTintColor: "#fff",
  });

  function ItemView({ id, title, selected, onSelect }) {
    return (
      <TouchableOpacity
        onPress={() => onSelect(id)}
        style={[
          styles.item,
          { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  }

  const onSelect = () =>{
    alert(1)
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[
          {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
          },
          {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
          },
          {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
          },
        ]}
        renderItem={({ item }) => (
          <ItemView
            id={item.id}
            title={item.title}
            // selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        // extraData={selected}
      />
      <SectionList style={styles.sectionList}
        sections={[
          {
            title: 'Top Google Seaches in 2018',
            data: [
              'World Cup',
              'Avicii',
              'Mac Miller',
              'Stan Lee',
              'Black Panther',
            ],
          },
          {
            title: 'Top News Trends of 2018',
            data: [
              'World Cup',
              'Hurricane Florence',
              'Mega Millions Result',
              'Royal Wedding',
              'Election Results',
            ],
          },
          {
            title: 'Top Searched Movies of 2018',
            data: [
              'Black Panther',
              'Dead Pool 2',
              'Venom',
              'Avengers: Infinity War',
              'Bohemian Rhapsody',
            ],
          },
          {
            title: 'Top Searched Athletes of 2018',
            data: [
              'Tristan Thompson',
              'Alexis Sánchez',
              'Lindsey Vonn',
              'Shaun White',
              'Khabib Nurmagomedov',
            ],
          },
        ]}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({item}) => <View style={styles.item}><Text style={{color:"#FFF"}}>{item}</Text></View>}
        keyExtractor={(item, index) => index}
        stickySectionHeadersEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: "space-between"
  },
  space:{
    padding:5,
  },
  sectionList:{
    width: groupFixWidth
  },
  sectionHeader:{
    backgroundColor:"#FFF",
  },
  item: {
    padding: 20,
    marginBottom: 1,
  },
  title: {
    fontSize: 32,
  },
  
});
