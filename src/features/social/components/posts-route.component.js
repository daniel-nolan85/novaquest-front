import { Text } from '../../../components/typography/text.component';
import {
  PostsRouteWrapper,
  PostsList,
  PostWrapper,
  PostImage,
} from '../styles/posts-route.styles';

export const PostsRoute = ({ posts, navigate }) => {
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
              {item.images.length ? (
                <PostImage source={{ uri: item.images[0].url }} />
              ) : (
                <Text variant='title'>{item.text}</Text>
              )}
            </PostWrapper>
          );
        }}
      />
    </PostsRouteWrapper>
  );
};
