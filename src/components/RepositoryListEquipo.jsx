import React from 'react'
import { FlatList, Text } from 'react-native'
import repositoriesEquipos from '../data/repositoriesEquipos.js'
import RepositoryItemEquipo from './RepositoryItemEquipo.jsx'

const RepositoryListEquipo = () => {
  return (
    <FlatList
      data={repositoriesEquipos}
      ItemSeparatorComponent={() => <Text> </Text>}
      renderItem={({ item: repo }) => (
        <RepositoryItemEquipo {...repo} />
      )}
    />
  )
}

export default RepositoryListEquipo
