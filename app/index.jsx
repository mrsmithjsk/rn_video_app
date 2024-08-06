import React from 'react';
import { Text, View, ScrollView, Image } from "react-native";
import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images }  from '../constants'
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const {isLoading, isLogged} = useGlobalContext();
  if (!isLoading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">

          {/* <Image
          source={images.logo}
          className="w-[130px] h-[84px]"
          resizeMode="contain"
          /> */}

          <Image 
          source={images.cards}
          className="max-w-[380px] w-full h-[250px]"
          resizeMode='contain'
          />

          <View relative mt-5>

            <Text className="text-3xl text-white font-bold text-center">
              This is an {"\n"} inspirational quote{"\n"} for some app... {"\n"} 
              <Text className="text-secondary-200">
                App
              </Text>
            </Text>

            <Image 
            source={images.path}
            className="w-[136px h-[15px] -bottom-1 left-7"
            resizeMode='contain'
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            An inspirational quote {"["}NOT generated by ChatGPT{"]"} here with an exclamation mark to convey enthusiasm!
          </Text>

          <CustomButton
          title="Continue with Email"
          handlePress={()=>{ router.push('/sign-in')}}
          containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  );
}


