import React, { useEffect, useState } from 'react'
import { FlatList, Text, ActivityIndicator,View } from 'react-native'
//import repositoriesEquipos from '../data/repositoriesEquipos.js'
import RepositoryItemEquipo from './RepositoryItemEquipo.jsx'

//const API_ENDPOINT = `http://localhost:3000/equipos`
const API_ENDPOINT = `https://api-control-padron.onrender.com/equipos`

const RepositoryListEquipo = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{  
    setIsLoading(true);
    fetchData(API_ENDPOINT);
  }, []);
  
  const fetchData = async(url) => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setIsLoading(false);
        //console.log(json);
        //console.log(json.results);      
    }catch(error){
        setError(error)
        console.log(error)
    }
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
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <Text> </Text>}
      renderItem={({ item: repo }) => (
        <RepositoryItemEquipo {...repo} />
      )}
    />
  )
}

export default RepositoryListEquipo
