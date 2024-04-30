import React, { useEffect, useState } from 'react'
import { FlatList, Text } from 'react-native'
//import repositoriesEquipos from '../data/repositoriesEquipos.js'
import RepositoryItemEquipo from './RepositoryItemEquipo.jsx'

//const API_ENDPOINT = `http://localhost:3000/equipos`
const API_ENDPOINT = `https://api-control-padron.onrender.com/equipos`

const RepositoryListEquipo = () => {

  const [data, setData] = useState([]);
  useEffect(()=>{  
    fetchData(API_ENDPOINT);
  }, []);
  
  const fetchData = async(url) => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        //console.log(json);
        //console.log(json.results);      
    }catch(error){
        setError(error)
        console.log(error)
    }
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
