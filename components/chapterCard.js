import { View, Text, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React, {memo} from 'react'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

import { ArrowRightIcon } from 'react-native-heroicons/outline';
const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
function ChapterCard({item}) {
  const navigation = useNavigation();
  return (

      <View 
        style={{
          borderRadius: 40, 
          backgroundColor: themeColors.bggray, 
          height: ios? height*0.5 : height*0.50, 
          width: width*0.65,
        }} 
        >
        <View 
        style={{
          marginTop: ios? -(height*0.08): 15,
        }}
        className="flex-row justify-center">
          <Image 
            source={item.image} 
            className={ios ? "h-40 w-40 top-20 " : "h-40 w-40"}
          />
        </View>
          <View className={`px-5 flex-1 justify-between ${ios? 'mt-20': ''}`}>
            <View className="space-y-3 mt-3">
              <Text className="text-3xl text-black font-semibold z-10">
                {item.name}
              </Text>
            </View>
            <View style={{
              backgroundColor: ios? 'transparent': 'transparent',
              
            }} className="flex-row  items-center space-x-10 mb-5">
              <Text className="px-4 text-black font-bold text-lg" >Learn More</Text>
              <TouchableOpacity 
              onPress={()=> navigation.navigate('Details', {...item})}
              style={{
                
              }} className="p-4 bg-white rounded-full">
                <ArrowRightIcon size="35" strokeWidth={2} color={themeColors.bgblack} />
              </TouchableOpacity>
            </View>
          </View>
      </View>
    
  )
}
export default memo(ChapterCard);