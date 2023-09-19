import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Platform, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;
const FRONTDROP_HEIGHT = height - BACKDROP_HEIGHT;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

export default function HomeScreen() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://10.0.2.2:5000/get_data')
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          console.log('No data found in response');
        }
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);

  const renderEventCards = () => {
    return events.map(event => (
      <View key={event.id} style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 16, margin: 16 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Event Name: {event.event_name}</Text>
        <Text style={{ marginTop: 8 }}>Club Name: {event.club_name}</Text>
        <Text style={{ marginTop: 8 }}>Event Date: {event.event_date}</Text>
        <Text style={{ marginTop: 8 }}>Event Description: {event.event_description}</Text>
        <Text style={{ marginTop: 8 }}>Club Post: {event.club_post}</Text>

        <Text style={{ marginTop: 8 }}>Cover Image:</Text>
      <Image
        style={{ width: 200, height: 200, marginTop: 8, borderRadius: 10 }}
        source={{ uri: event.cover_image }} 
        resizeMode="cover"
      />

      <Text style={{ marginTop: 16 }}>Poster Image:</Text>
      <Image
        style={{ width: 200, height: 200, marginTop: 8, borderRadius: 10 }}
        source={{ uri: event.poster_image }}
        resizeMode="cover" 
      />

      </View>
    ));
  };

  
  

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
      <StatusBar />
      <ScrollView>
        {events.length > 0 ? renderEventCards() : <Text>No events found.</Text>}
      </ScrollView>
    </View>
  );
}
