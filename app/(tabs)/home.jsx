import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { React, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput  from "../../components/SearchInput"
import Trending  from "../../components/Trending"
import EmptyState from "../../components/EmptyState"
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from "../../lib/useAppWrite";
import VideoCard from '../../components/VideoCard'

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
      )}
      ListHeaderComponent={() => (
        <View className="flex my-6 px-4 space-y-6">
          <View className="flex justify-between items-start flex-row mb-6">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Welcome Back,
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                User!
              </Text>
            </View>
          </View>

          <SearchInput />

          <View className="w-full flex-1 pt-5 pb-8">
          <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
          </View>
        </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
          title="No videos found"
          subtitle="Upload something you fucking idiot"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  )
}

export default Home