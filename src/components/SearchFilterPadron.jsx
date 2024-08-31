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
import CheckBox from 'react-native-check-box'

//const API_ENDPOINT = `https://api-control-padron.onrender.com/ejemplo`

const API_ENDPOINT = `https://api-control-padron.onrender.com/padron`

const SearchFilterPadron = () => {    

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("") ;
    const [isChecked, setIsChecked] = useState(false);
    let checkBox = [];

    useEffect(()=>{
        setIsLoading(true);
        fetchData(API_ENDPOINT);        
    }, []);

    const fetchData = async(url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();            

            for (let i = 0; i < json.length; i++) {
                checkBox.push({id:i});
            }
            
            setData(json);
            //console.log(json);
            setFullData(json)
            setIsLoading(false);
        }catch(error){
            setError(error)
            console.log(error)
        }
    }

    const handleSearch = (query) => {
        setSearchQuery(query);        
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullData, (user) =>{
                return contains(user, formattedQuery)
        });
        setData(filteredData)
    };

    const contains = ({nroDocumento, apellidos, nombres,perfil, nombreEquipo}, query) =>{
        
        if(nroDocumento.includes(query) 
            || apellidos.toLowerCase().includes(query) 
            || nombres.toLowerCase().includes(query)
            || nombreEquipo.toLowerCase().includes(query)
            || perfil.toLowerCase().includes(query)
            ){
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
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <View style={styles.itemContainer}>                    
                    <View>
                        <View style={{ flexDirection: 'row', paddingBottom: 2 }}>
                            <Text style={styles.texName} >{item.nroDocumento} - {item.apellidos} {item.nombres} / {item.categoria} </Text>
                            <CheckBox isChecked={isChecked} onClick={()=>setIsChecked(!isChecked)}  />
                        </View>
                        <Text style={styles.texEmail} >{item.perfil} / {item.nombreEquipo}  / {item.fechaNacimiento}</Text>
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
