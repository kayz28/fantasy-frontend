import {ActivityIndicator, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import {VStack, Box ,HStack, NativeBaseProvider, Text, Spacer} from 'native-base';
import {View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';

var url = "http://localhost:5000/contest/";

export function ContestCards(props) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {   
        axios.get(url + props.data.id)
             .then(res => {
                    for(let i = 0; i<res.data.data.length; i++) {
                        res.data.data[i].category = props.data.category;
                    }
                    setTimeout(() => {
                        setLoading(true);
                        setData(res.data.data);}, 1000);
        }).catch(err => {
            console.error(err);
        });
    }, []);

    return (
        isLoading ?
        <SafeAreaView style = {{flex:1}}>
        <View style = {{height:10}}/>
            <Box>
            <FlatList 
                data={data} 
                ItemSeparatorComponent={() => <View style={{height: 10}} />} 
                renderItem={({item}) => 
                <TouchableOpacity style = {styles.card} activeOpacity={1}>
                <VStack>
                <Text style = {styles.team1}
                        mt="2" 
                        fontWeight="medium" 
                        fontSize="xm">
                            Winning
                        </Text>
                        <HStack alignItems = "space-between">
                        <Box style = {{flex: 0.667}}>
                            <Text style = {styles.team1}
                                        mt="2" 
                                        fontWeight="medium" 
                                        fontSize="xm">
                                        {'\u20A8'} {item.contest_total_winnings}
                            </Text>
                        </Box>
                        <Text style = {styles.team2} __text = {{ color: "black"}}  mt = "2" fontWeight = "medium" fontSize = "xm">
                               
                        </Text>
                            <TouchableOpacity style = {styles.button} activeOpacity = {0.7} onPress = {() => {
                                props.navigation.navigate('TeamScreen', item);
              
                            }}>  
                              <Text style={styles.text}> {'\u20A8'} {item.entry_fee}  </Text>
                            </TouchableOpacity>
                        </HStack>
                        <Progress.Bar 
                            animated
                            progress={0.3} borderRadius={6} color='gray' width={null} height={2}/>
                        <Text></Text>
                        </VStack>
                </TouchableOpacity>
        } 
            keyExtractor={item => item.id} />
        </Box>
        </SafeAreaView>
       :
        <NativeBaseProvider>
        <Box style = {{flex:1, alignContent:'center', justifyContent: 'center'}}>
            <ActivityIndicator size = "large" color = "black"/>
        </Box>
        </NativeBaseProvider>
        );
}

const styles = StyleSheet.create({
    card : {
        backgroundColor: "white",
        rounded: 5,
        overflow: 10, 
        borderColor: "coolGray.300",
        shadow: 5,
        backgroundColor: "#ffff",
        marginLeft: 2,
        marginRight: 2,
        elevation: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 5,
       },
       borderRadius: 11,
    },

    team1 : {
        textAlign: 'left',
        padding: 10
    },

    team2 : {
        alignSelf: 'flex-end', 
        paddingBottom: 10, 
        textAlign: 'right', 
        flex: 0.33, 
        paddingRight: 10,
        adjustsFontSizeToFit: true,
        numberOfLines: 1},
    
    button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 2,
            paddingHorizontal: 7,
            borderRadius: 4,
            elevation: 2,
            backgroundColor: 'green',
            alignSelf: 'flex-end',
            backgroundColor: 'green'
        },
    
    text: {
            fontSize: 12,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
          },
});
