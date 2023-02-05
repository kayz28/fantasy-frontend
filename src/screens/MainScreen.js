import * as React from 'react';
import { View,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContestScreen } from '../screens/ContestScreen';
import { HomeTabScreen } from '../screens/HomeTabScreen';
import { TeamScreen } from '../screens/TeamScreen';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
    container: {
      height: windowHeight,
      width: windowWidth,
      flex: 1,
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

export function MainScreen() {
  return (
    <View style = {styles.container}>
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{ headerShown: false }} initialRouteName="HomeTabScreen">
        <Stack.Screen name = "HomeTabScreen" component={HomeTabScreen} options={{ headerShown: false, animationTypeForReplace: 'pop', }} />
        <Stack.Screen name = "ContestScreen" component={ContestScreen} options={{ headerShown: false, animationTypeForReplace: 'pop' }} />
        <Stack.Screen name = "TeamScreen" component={TeamScreen} options = {{ headerShown: false, animationTypeForReplace: 'pop' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}

