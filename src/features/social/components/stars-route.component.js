import { Text } from '../../../components/typography/text.component';
import {
  StarsRouteWrapper,
  StarsList,
  StarWrapper,
  StarImage,
} from '../styles/stars-route.styles';

export const StarsRoute = ({ stars, navigate }) => {
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
              {item.images.length ? (
                <StarImage source={{ uri: item.images[0].url }} />
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
