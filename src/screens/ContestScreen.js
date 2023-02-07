import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import { ContestsAppBar } from '../components/AppBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ContestCards } from './ContestCards';

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

export function ContestScreen(props) {
  return (
        <View style = {styles.container}>
          <ContestsAppBar props = {props}/>
          <ContestCards data = {props.route.params} navigation = {props.navigation}/>
        </View>
  );
}