import React, { useEffect, useState } from 'react'
import { FlatList, 
        Text, 
        SafeAreaView, 
        TextInput,
        StyleSheet, 
        ActivityIndicator,
        View,
        Image } from 'react-native'

import filter from "lodash.filter"

const API_ENDPOINT = `https://randomuser.me/api/?results=30`

const SearchFilterPadron = () => {    

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("") ;

    useEffect(()=>{
        setIsLoading(true);
        fetchData(API_ENDPOINT);
    }, []);

    const fetchData = async(url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json.results);

            console.log(json.results);
            setFullData(json.results)
            setIsLoading(false);
        }catch(error){
            setError(error)
            console.log(error)
        }
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        console.log("Filtrando = "+query);
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullData, (user) =>{
                return contains(user, formattedQuery)
        });
        setData(filteredData)
    };

    const contains = ({name, email}, query) =>{
        const {first, last} = name;    
        if(first.includes(query) 
            || last.includes(query) 
            || email.includes(query)){
            return true;
        }
        return false
    }
    if(isLoading){
        return (
            <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                <ActivityIndicator size={'large'} color='#5500dc' />
            </View>    
        )
    }
    if(error){
        return (
            <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                <Text>Error </Text>
            </View>    
        )
    }

  return (
    <SafeAreaView style= {{flex:1, marginHorizontal:20}}>
        <TextInput placeholder='Buscar' 
            clearButtonMode='always'            
            style={styles.searchBox}
            autocCapitalize="none"
            autoCorrect={false}
            value={searchQuery}
            onChangeText={(query) => handleSearch(query)}
        />
        <FlatList
            data={data}
            keyExtractor={(item) => item.login.username}
            renderItem={({item}) => (
                <View style={styles.itemContainer}>
                    <Image source={{uri: item.picture.thumbnail}} style={styles.image}/>
                    <View>
                        <Text style={styles.texName} >{item.name.first} {item.name.last}</Text>
                        <Text style={styles.texEmail} >{item.email}</Text>
                    </View>
                </View>
            )}
        />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    searchBox : {
        paddingHorizontal:20,
        paddingVertical:20,
        borderColor:'#ccc',
        borderWidth:1,
        borderRadius:8
    },
    itemContainer : {
        flexDirection:"row",
        alignItems: "center",
        marginLeft:10,
        marginTop: 10,
    },
    image: {
        width:50,
        height:50,
        borderRadius:25    
    },
    texName:{
        fontSize:17,
        marginLeft:10,
        fontWeight:"600"
    },
    texEmail:{
        fontSize:14,
        marginLeft:10,
        color:"grey"
    }

})


export default SearchFilterPadron
