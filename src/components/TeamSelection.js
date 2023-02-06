import {ActivityIndicator, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import {VStack, Box ,HStack, Text, Spacer, IconButton} from 'native-base';
import {View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Icon } from 'react-native-elements';
import {parseIconFromClassName} from 'react-native-fontawesome';
import { MaterialIcons } from "@expo/vector-icons";

const parsedIcon = parseIconFromClassName('fa-plus-circle');
var url = "http://localhost:5000/teams/";

export function TeamSelection(props) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {   
        axios.get(url + props.route.params.category + '/' + props.route.params.match_id)
             .then(res => {
                const data = [];
                for(let i = 0; i<res.data.cacheRes.length; i++) {
                    res.data.cacheRes[i].props = {};
                    res.data.cacheRes[i].props.button = "add-circle-outline";
                    res.data.cacheRes[i].props.buttonColor = "green";
                    if(res.data.cacheRes[i].role.startsWith(props.route.name))
                        data.push(res.data.cacheRes[i]);
                    if(props.route.name === 'Allrounder') {
                        if(res.data.cacheRes[i].role.endsWith(props.route.name)) {
                            data.push(res.data.cacheRes[i]);
                        }
                    }
                }
                setTimeout(() => {
                        setLoading(true);
                        setData(data);
                } , 2000);
        }).catch(err => {
            console.error(err);
        });
    }, []);

    const changeButtonState = (item, oldData) =>  {
        for(let i = 0; i<oldData.length; i++) {
            if(item.id === oldData[i].id) {
                if (oldData[i].props.button === "add-circle-outline") {
                    oldData[i].props.button = "remove-circle-outline";
                    oldData[i].props.buttonColor = "red";
                    setCount(count+1);
                } else if (oldData[i].props.button === "remove-circle-outline") {
                    oldData[i].props.button = "add-circle-outline";
                    oldData[i].props.buttonColor = "green";
                    setCount(count-1);
                }
            }
        }
        setData(oldData);
    }

    const selectButtonHandler = (item) => {
        let oldData = data;
        changeButtonState(item, oldData);
    };

    return (
        isLoading ? 
        <SafeAreaView style = {{flex:1}}>
        <View style = {{height:10}}/>
            <Box>
            <FlatList 
                data={data} 
                extraData = {count}
                ItemSeparatorComponent={() => <View style={{height: 10}} />} 
                renderItem={({item}) => 
                <TouchableOpacity style = {styles.card} activeOpacity={1}>
                        <HStack alignItems = "space-between">
                            <Text style = {styles.role}
                                        mt="2" 
                                        fontWeight="medium" 
                                        fontSize="xm">
                                        {item.role}
                            </Text>
                            <VStack alignItems="center" style = {{flex: 0.33}}>
                            </VStack>
                            <Text style = {styles.team2} __text={{ color: "black"}} mt="2" fontWeight="medium" fontSize="xm">
                               {item.name}
                            </Text>
                            <Spacer/>
                            <IconButton onPress = {() => selectButtonHandler(item)}
                             icon = {<Icon as={MaterialIcons} name={item.props.button} size="large" color={item.props.buttonColor}/>} />
                        </HStack>
                </TouchableOpacity>
        } 
            keyExtractor={item => item.id} />
        </Box>
        </SafeAreaView>
        :
        <Box style = {{flex:1, alignContent:'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="black"/>
        </Box>

    );
}

function checkCreditsOverflow(players) {
    let credits = 0;
    for(let i=0; i<players.length; i++) {
        credits += players[i].credits;
    }
    if(credits < 100) {
        return true;
    }
    
    return false;
}

function checkElevenRule(players) {
    //we have 22 players
    
}

const styles = StyleSheet.create({
    card : {
        backgroundColor: "white",
        rounded: 5,
        overflow: 5, 
        borderColor: "coolGray.300",
        shadow: 5,
        backgroundColor: "#ffff",
        marginLeft: 2,
        marginRight: 2,
        elevation: 2,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 2,
       },
       borderRadius: 1,
    },
    role : {
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
        numberOfLines: 1
    },
    button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 2,
            paddingHorizontal: 7,
            borderRadius: 4,
            elevation: 2,
            backgroundColor: 'green',
        },
    
    text: {
            fontSize: 12,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
          },
});
