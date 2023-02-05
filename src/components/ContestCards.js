import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import {Spacer, VStack, Box ,HStack, NativeBaseProvider, Text} from 'native-base';
import {View, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-elements';

var url = "http://localhost:5000/contest/";

export function ContestCard(props) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [selected, setSelected] = useState(false);

    useEffect(() => {   
        axios.get(url + props.route.params.category)
             .then(res => {
                    for(let i = 0; i<res.data.data.length; i++) {
                        console.log(res.data.data[i]);
                        var delta = Date.parse(res.data.data[i].end_date) - new Date().getTime();
                        res.data.data[i].delta = delta;
                    }
                    console.log(res.data.data);
                    setTimeout(() => {
                        setLoading(true);
                        setData(res.data.data);}, 1000);
        })
        .catch(err => {
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
                <TouchableOpacity style = {styles.card}>
                        <HStack alignItems = "space-between">
                            <Text style = {styles.team1}
                                        mt="2" 
                                        fontWeight="medium" 
                                        fontSize="xm">
                                {item.team1}
                            </Text>
                            <Spacer />
                            <VStack alignItems="center" style = {{flex: 0.33}}>

                                <Spacer />
                                <Avatar rounded size={90} source={{ uri: img }}/>
                            </VStack>
                            <Spacer />
                            <Text style = {styles.team2} __text={{ color: "black"}}  mt="2" fontWeight="medium" fontSize="xm">
                                {item.team2}
                            </Text>
                        </HStack>
                </TouchableOpacity>
        } 
            keyExtractor={item => item.id} />
        </Box>
        </SafeAreaView>
       :
        <NativeBaseProvider>
        <Box style = {{flex:1, alignContent:'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="black"/>
        </Box>
        </NativeBaseProvider>
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
