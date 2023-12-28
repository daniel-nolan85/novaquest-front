import { Text } from '../../../components/typography/text.component';
import {
  PostsRouteWrapper,
  PostsList,
  PostWrapper,
  PostImage,
} from '../styles/posts-route.styles';

export const PostsRoute = ({ posts }) => (
  <PostsRouteWrapper>
    <PostsList
      data={posts}
      numColumns={3}
      renderItem={({ item, index }) => {
        return (
          <PostWrapper>
            {item.images.length ? (
              <PostImage key={index} source={{ uri: item.images[0].url }} />
            ) : (
              <Text variant='title'>Post</Text>
            )}
          </PostWrapper>
        );
      }}
    />
  </PostsRouteWrapper>
);
