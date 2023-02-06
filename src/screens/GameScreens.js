import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import {VStack, Box ,HStack, NativeBaseProvider, Text} from 'native-base';
import { View, TouchableOpacity} from 'react-native';
import {CountDown} from 'react-native-countdown-component';
import { Avatar, Divider } from 'react-native-elements';

const img = require('../assets/versusLogo.jpeg');

var url = "http://localhost:5000/matches/";

export function GameScreens(props) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {   
        axios.get(url + props.route.params.category)
             .then(res => {
                    for(let i = 0; i<res.data.data.length; i++) {
                        var delta = Date.parse(res.data.data[i].end_date) - new Date().getTime();
                        res.data.data[i].delta = delta;
                        res.data.data[i].category = props.route.params.category;
                    }
                    console.log(res);
                    setTimeout(() => {
                        setLoading(true);
                        setData(res.data.data);
                    }, 1000);
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    return (
        isLoading ?
        <View>
        <View style = {{height:10}}/>
            <Box>
            <FlatList 
                data={data} 
                ItemSeparatorComponent={() => <View style={{height: 10}} />} 
                showsVerticalScrollIndicator = {true}
                renderItem={({item}) => 
                <TouchableOpacity style = {styles.card}
                onPress = {() => {
                    console.log("Hiiiiiiiii");
                    props.navigation.navigate('ContestScreen', item);
                }}>
                <VStack>
                <Text style = {styles.name}
                                mt="2" 
                                fontWeight="small" 
                                textAlign={0}
                                fontSize="xm"
                                >
                        {item.name}
                </Text>
                <Divider style ={{borderBottomWidth: 1, borderBottomColor: 'gray'}}/>
                <HStack alignItems = "space-between">
                        <Text style = {styles.team1}
                                        mt="2" 
                                        fontWeight="medium" 
                                        fontSize="xm">
                                {item.team1}
                        </Text>
                        <VStack alignItems="center" style = {{flex: 0.33}}>
                            <CountDown
                                until={item.delta/1000000}
                                size={10}
                                digitStyle={{backgroundColor: '#FFF'}}
                                digitTxtStyle={{color: 'black'}}
                                timeToShow={['H', 'M', 'S']}
                                timeLabels={{h:'HH', m: 'MM', s: 'SS'}}
                                />
                            <Avatar rounded size={90} source={{ uri: img }}/>
                        </VStack>
                        <Text style = {styles.team2} __text={{ color: "black"}}  mt="2" fontWeight="medium" fontSize="xm">
                            {item.team2}
                        </Text>
                    </HStack>
                    </VStack>
                </TouchableOpacity>
        } 
        keyExtractor={item => item.id} />
        </Box>
        </View>
       :
            <Box style = {{flex:1, alignContent:'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="black"/>
            </Box>
        );
}

const styles = StyleSheet.create({
    card : {
        backgroundColor: "white",
        rounded: 10,
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

    name : {
        paddingBottom: 5,
        flex: 0.33,
        alignItems: 'left',
        textAlign: 'left',
        adjustsFontSizeToFit: true,
        numberOfLines: 1,
        marginLeft: 3
    },

    team1 : {
        alignSelf: 'flex-end', 
        paddingBottom: 10,
        flex: 0.33,
        alignItems: 'center',
        paddingLeft: 10,
        adjustsFontSizeToFit: true,
        numberOfLines: 1
    },

    team2 : {
        alignSelf: 'flex-end', 
        paddingBottom: 10, 
        textAlign: 'right', 
        flex: 0.33, 
        paddingRight: 10,
        adjustsFontSizeToFit: true,
        numberOfLines: 1}
});
