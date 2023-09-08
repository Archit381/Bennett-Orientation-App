import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Dimensions, StyleSheet, Image, ScrollView } from 'react-native';
import { clubItems } from '../constants';
import { themeColors } from '../theme';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const handleSearch = () => {
    const results = clubItems.filter(item => { 
      const itemName = item.name.toLowerCase();
      const itemTags = [item.tag1, item.tag2, item.tag3, item.tag4].join(' ').toLowerCase();
      const searchLower = searchQuery.toLowerCase();
  
      return itemName.includes(searchLower) || itemTags.includes(searchLower);
    });
  
    setSearchResults(results);
  };
  
  return (
    <View className="mx-5 " style={{marginTop: height*0.06 }}>
      <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
        <View style={styles.searchInputContainer}>
          <TextInput
            placeholder='Search for clubs and chapters...'
            style={styles.searchInput}
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
          />
          <TouchableOpacity
            className="rounded-full p-2"
            style={{backgroundColor: themeColors.bgred}}
            onPress={handleSearch}>
            <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', {...item})}>  
          <View style={styles.resultCard}>            
            <Image source={item.image} style={styles.clubLogo} />
            <Text style={styles.resultTitle}>{item.name}</Text> 
          </View>
        </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={styles.noResults}>
            {/*<Text style={styles.noResultsText}>No results found</Text>*/}
          </View>
        )}
        />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: '#ff6347',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 10,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  clubLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultDescription: {
    color: 'gray',
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
});
