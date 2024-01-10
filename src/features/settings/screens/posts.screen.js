import { useState, useContext } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { filterAllPostsByQuery } from '../../../requests/admin';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { SearchContainer } from '../styles/settings.styles';
import { SettingsContext } from '../../../services/settings/settings.context';
import { PostsList } from '../components/posts-list.component';

export const PostsScreen = ({ route }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { posts, setPosts } = useContext(SettingsContext);

  const { token, _id } = useSelector((state) => state.user);

  const { params } = route;
  const { navigate } = params;

  const handleSearch = async (query) => {
    await filterAllPostsByQuery(token, _id, query)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeArea style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        <SearchContainer>
          <Searchbar
            placeholder='Search posts...'
            onChangeText={(query) => {
              setSearchQuery(query);
              handleSearch(query);
            }}
            value={searchQuery}
          />
        </SearchContainer>
        <PostsList navigate={navigate} posts={posts} setPosts={setPosts} />
      </View>
    </SafeArea>
  );
};
