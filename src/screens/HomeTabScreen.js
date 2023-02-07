import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import { HomeAppBar } from '../components/AppBar';
import { GameScreens } from './GameScreens';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  container: {
    flexGrow:1,
    flexDirection: 'column',
    backgroundColor: '#dddd',
    flexWrap: 'no-wrap'
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

export function HomeTabScreen() {
  return (
        <View style = {styles.container}>
        <HomeAppBar />
        <Tab.Navigator initialRouteName={'Cricket'} >
              <Tab.Screen  name="Baseball" component= {GameScreens} options = {{title: "Baseball", headerShown:true}} 
                  initialParams = {{'category': 'BASEBALL'}} />
              <Tab.Screen  name="Cricket" component= {GameScreens} options = {{title: "Cricket", headerShown:true}} 
                  initialParams = {{'category': 'CRICKET'}} />
              <Tab.Screen  name = "Football" component= {GameScreens} options = {{title: "Football", headerShown:true}} 
                  initialParams = {{'category': 'FOOTBALL'}} />
        </Tab.Navigator>
        </View>
  );
}