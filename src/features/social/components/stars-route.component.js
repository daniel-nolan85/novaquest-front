import { useState, useEffect } from 'react';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Text } from '../../../components/typography/text.component';
import {
  StarsRouteWrapper,
  StarsList,
  StarWrapper,
  StarImage,
} from '../styles/stars-route.styles';

export const StarsRoute = ({ stars, navigate }) => {
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    const generateThumbnails = async () => {
      const thumbnailsArray = [];

      for (const star of stars) {
        if (star.media.length > 0 && star.media[0].type === 'video') {
          try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
              star.media[0].url
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
  }, [stars]);

  return (
    <StarsRouteWrapper>
      <StarsList
        data={stars}
        numColumns={3}
        renderItem={({ item, index }) => {
          return (
            <StarWrapper
              key={item._id}
              onPress={() =>
                navigate('UserStars', {
                  userId: item.postedBy._id,
                  initialIndex: index,
                })
              }
            >
              {item.media.length > 0 && item.media[0].type === 'video' ? (
                <StarImage source={{ uri: thumbnails[index] }} />
              ) : item.media.length > 0 && item.media[0].type === 'image' ? (
                <StarImage source={{ uri: item.media[0].url }} />
              ) : (
                <Text variant='title'>{item.text}</Text>
              )}
            </StarWrapper>
          );
        }}
      />
    </StarsRouteWrapper>
  );
};
