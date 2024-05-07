import React from 'react'
import { Image, View, StyleSheet,Text } from 'react-native'
import StyledText from './StyledText.jsx'
import theme from '../theme.js'

const RepositoryItemHeader = ({ id, nombre, urlLogo, delegado, subdelegado,	entrenador}) => (
  <View style={{ flexDirection: 'row', paddingBottom: 2 }}>
    <View style={{ paddingRight: 10, justifyContent:'center'}}>
      <Image style={styles.image} source={{ uri: urlLogo, headers: { 'Accept': 'image/*'} }} />
    </View>
    <View style={{ flex: 1 }}>
      <StyledText fontWeight='bold'>{nombre}</StyledText>      
      <View style={{ flexDirection: 'column', paddingBottom: 2 }}>
        <StyledText style={styles.language}>Delegado: {delegado}</StyledText>        
        <StyledText style={styles.language}>SubDelegado: {subdelegado}</StyledText>
        <StyledText style={styles.language}>Entrenador: {entrenador}</StyledText>
      </View>
    </View>
  </View>
)

const RepositoryItemEquipo = (props) => (
  <View key={props.id} style={styles.container}>
    <RepositoryItemHeader {...props} />   
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 5
  },
  language: {
    padding: 2,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    marginVertical: 2,
    borderRadius: 4,
    overflow: 'hidden'
  },
  equipo: {
    padding: 4,
    color: theme.colors.white,
    backgroundColor: theme.colors.azulMarino,
    alignSelf: 'flex-start',
    marginVertical: 4,
    borderRadius: 4,
    overflow: 'hidden'
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 4
  }
})

export default RepositoryItemEquipo
