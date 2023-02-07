import * as React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import { TeamAppBar } from '../components/AppBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TeamSelection } from '../components/TeamSelection';

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  container: {
    flexGrow:1,
    flexDirection: 'column',
    backgroundColor: '#dddd',
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  }
});


export function TeamScreen(props) {
    return (
        <View style = {styles.container}>
        <TeamAppBar props = {props}/>
        <Tab.Navigator>
            <Tab.Screen  name = "WK" component= {TeamSelection} options = {{title: "WK", headerShown:true}} 
            initialParams = {props.route.params}/>
            <Tab.Screen  name="Batsman" component= {TeamSelection} options = {{title: "Batsman", headerShown:true}} 
            initialParams = {props.route.params}/>
            <Tab.Screen  name="Allrounder" component= {TeamSelection} options = {{title: "Allrounder", headerShown:true}} 
            initialParams = {props.route.params}/>
            <Tab.Screen  name = "Bowler" component= {TeamSelection} options = {{title: "Bowler", headerShown:true}} 
            initialParams = {props.route.params}/>
      </Tab.Navigator>
        </View>
    );
  }