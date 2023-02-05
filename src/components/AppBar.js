import React from "react";
import { VStack, HStack, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box, StatusBar} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import {Dimensions, View} from 'react-native';
import { StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
    margin: 0,
    flex:1
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

function HomeScreenAppBar() {
  return (
      <View>
      <Box bg="muted.900" style = {styles.container}/>
      <HStack bg="muted.900" px="1" py="3" justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
              <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
              <Text color="error.600" fontSize="20" fontWeight="bold">
                  Khelo11
              </Text>
      </HStack>
      <HStack>
            <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
            <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
      </HStack>
      </HStack>
      </View>
    );
}

function ContestScreenAppBar(props) {
  return (
      <View>
      <Box bg="muted.900" style = {styles.container}/>
      <HStack bg="muted.900" px="1" py="3" justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
              <IconButton icon={<Icon size="sm" as={MaterialIcons} name="arrow-back" color="white" />} 
                  onPress = {() => {
                    props.props.props.navigation.navigate('HomeTabScreen');
                  
                  }
                }/>
              <Text color="white" fontSize="20" fontWeight="bold">
                  Contests
              </Text>
      </HStack>
      <HStack>
            <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
            <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
      </HStack>
      </HStack>
      </View>
    );
}

function TeamScreenAppBar(props) {
  return (
      <View>
      <Box bg="muted.900" style = {styles.container}/>
      <HStack bg="muted.900" px="1" py="3" justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
              <IconButton icon={<Icon size="sm" as={MaterialIcons} name="arrow-back" color="white" />} 
                  onPress = {() => {
                    props.props.props.navigation.navigate('ContestScreen');
                  
                  }
                }/>
              <Text color="white" fontSize = "20" fontWeight = "bold">
                  Create Team
              </Text>
      </HStack>
      <HStack>
            <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
            <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
      </HStack>
      </HStack>
      </View>
    );
}


export function HomeAppBar() {
        return (
            <HomeScreenAppBar/>
        );
};


export function ContestsAppBar(props) {
  return (
      <ContestScreenAppBar props = {props}/>
  );
};

export function TeamAppBar(props) {
  console.log("in app bar");
  console.log(props);
  return (
      <TeamScreenAppBar props = {props}/>
  );
}

    