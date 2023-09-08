import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { StatusBar } from 'expo-status-bar';
import { categories, clubItems } from '../constants';
import Carousel from 'react-native-snap-carousel';
import { MapPinIcon } from 'react-native-heroicons/solid';
import ChapterCard from '../components/chapterCard';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [filteredClubItems, setFilteredClubItems] = useState([]);
  const navigation = useNavigation();
  
  // Updating club names when category is changing
  
  useEffect(() => {
    const filteredItems = clubItems.filter(item => {
      return (
        item.tag1 === categories[activeCategory - 1].title.toLowerCase() ||
        item.tag2 === categories[activeCategory - 1].title.toLowerCase() ||
        item.tag3 === categories[activeCategory - 1].title.toLowerCase() ||
        item.tag4 === categories[activeCategory - 1].title.toLowerCase()
      );
    });
    setFilteredClubItems(filteredItems);
  }, [activeCategory]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar />
      <SafeAreaView style={ios ? { marginBottom: -8 } : {}}>

        {/* University Logo and Name */}

        <View className="mx-4 flex-row  items-center space-x-20">
          <Image source={require('../assets/images/uni_logo.png')} 
            className="h-11 w-9 top-2" />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
            <MapPinIcon size={27} color={themeColors.bgred} />
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Bennett University</Text>
          </View>
        </View>

        <View style={{ marginHorizontal: 16, shadowColor: 'rgba(0, 0, 0, 0.2)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 2, marginTop: 16 }}>
          <Text style={{ fontSize: 40, fontWeight: 'bold', color: themeColors.textNeutral }}>Let's Discover</Text>
        </View>

        {/* Adding Categories */}
          
        <View style={{ paddingHorizontal: 16, marginTop: 24, marginBottom: 50 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {categories.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setActiveCategory(item.id)}
                style={{
                  backgroundColor: item.id === activeCategory ? themeColors.bgblue : 'rgba(0,0,0,0.07)',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 24,
                  
                  marginRight: 8,
                  
                }}
              >
                <Text style={{ fontWeight: 'bold', color: item.id === activeCategory ? 'white' : 'gray' }}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </SafeAreaView>

      {/* Adding Chapters/Clubs cards */}
      
      <View style={{ flex: 1, justifyContent: 'center', marginTop: ios ? 2 : 0 }}>
        <Carousel
          data={filteredClubItems}
          renderItem={({ item }) => <ChapterCard item={item} />}
          firstItem={1}
          loop={true}
          inactiveSlideScale={0.75}
          inactiveSlideOpacity={0.75}
          sliderWidth={width}
          itemWidth={width * 0.63}
          slideStyle={{ alignItems: 'center' }}
        />
      </View>
    </View>
  );
}