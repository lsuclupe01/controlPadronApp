import React from "react";
import { Text,View} from 'react-native';
import RepositoryList from "./RepositoryList";
import SearchFilter from "./SearchFilter";
import AppBar from "./AppBar";
import { Route, Routes, BrowserRouter,Navigate } from "react-router-native";
import RepositoryListEquipo from "./RepositoryListEquipo";

const Main = () =>{
    return(
        <View style={{flex:1}}>            
            <AppBar/>           
            <Routes>
                <Route path="/" element={<RepositoryListEquipo/>} />                                    
                <Route path="/signin" element={<SearchFilter/>}/>      
            </Routes>
           
        </View>
    )
}

export default Main