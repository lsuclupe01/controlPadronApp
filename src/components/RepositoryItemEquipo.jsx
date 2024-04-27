import React from 'react'
import { Image, View, StyleSheet,Text } from 'react-native'
import StyledText from './StyledText.jsx'
import theme from '../theme.js'

const RepositoryItemHeader = ({ id, nombre, urlLogo}) => (
  <View style={{ flexDirection: 'row', paddingBottom: 2 }}>
    <View style={{ paddingRight: 10 }}>
      <Image style={styles.image} source={{ uri: urlLogo }} />
    </View>
    <View style={{ flex: 1 }}>
      <StyledText fontWeight='bold'>{nombre}</StyledText>      
      <View style={{ flexDirection: 'row', paddingBottom: 2 }}>
        <StyledText style={styles.language}>{id}</StyledText>        
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
    padding: 4,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    marginVertical: 4,
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
    width: 48,
    height: 48,
    borderRadius: 4
  }
})

export default RepositoryItemEquipo
