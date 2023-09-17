import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Platform, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function ProjectScreen() {
  
  const navigation = useNavigation();
  

  return (
    
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar />
 
    </View>
  );
}