import {ActivityIndicator, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import {VStack, Box ,HStack, Text} from 'native-base';
import {View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

var url = "http://localhost:5000/teams/";

export function TeamSelection(props) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {   
        axios.get(url + props.route.params.category + '/' + props.route.params.match_id)
             .then(res => {
                const data = [];
                for(let i = 0; i<res.data.cacheRes.length; i++) {
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
                } ,2000);
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
                        <HStack alignItems = "space-between">
                            <Text style = {styles.team1}
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
