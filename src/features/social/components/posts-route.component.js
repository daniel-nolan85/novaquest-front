import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Text } from '../../../components/typography/text.component';
import {
  PostsRouteWrapper,
  PostsList,
  PostWrapper,
  PostImage,
} from '../styles/posts-route.styles';

export const PostsRoute = ({
  posts,
  navigate,
  loadMorePosts,
  loading,
  allPostsLoaded,
}) => {
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    const generateThumbnails = async () => {
      const thumbnailsArray = [];

      for (const post of posts) {
        if (post.media.length > 0 && post.media[0].type === 'video') {
          try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
              post.media[0].url
            );
            thumbnailsArray.push(uri);
          } catch (e) {
            console.warn(e);
            thumbnailsArray.push(null);
          }
        } else {
          thumbnailsArray.push(null);
        }
      }

      setThumbnails(thumbnailsArray);
    };

    generateThumbnails();
  }, [posts]);

  return (
    <PostsRouteWrapper>
      <PostsList
        data={posts}
        numColumns={3}
        renderItem={({ item, index }) => {
          return (
            <PostWrapper
              key={item._id}
              onPress={() =>
                navigate('UserPosts', {
                  userId: item.postedBy._id,
                  initialIndex: index,
                })
              }
            >
              {item.media.length > 0 && item.media[0].type === 'video' ? (
                <PostImage source={{ uri: thumbnails[index] }} />
              ) : item.media.length > 0 && item.media[0].type === 'image' ? (
                <PostImage source={{ uri: item.media[0].url }} />
              ) : (
                <Text variant='title'>{item.text}</Text>
              )}
            </PostWrapper>
          );
        }}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading &&
          !allPostsLoaded && <ActivityIndicator size='small' color='#009999' />
        }
      />
    </PostsRouteWrapper>
  );
};
