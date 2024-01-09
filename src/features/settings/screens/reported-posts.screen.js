import { useState, useContext } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { filterReportedPostsByQuery } from '../../../requests/admin';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { SearchContainer } from '../styles/settings.styles';
import { SettingsContext } from '../../../services/settings/settings.context';
import { ReportedPostsList } from '../components/reported-posts-list.component';

export const ReportedPostsScreen = ({ route }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { reportedPosts, setReportedPosts } = useContext(SettingsContext);

  const { token, _id } = useSelector((state) => state.user);

  const { params } = route;
  const { navigate } = params;

  const handleSearch = async (query) => {
    await filterReportedPostsByQuery(token, _id, query)
      .then((res) => {
        console.log(res.data);
        setReportedPosts(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeArea style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        <SearchContainer>
          <Searchbar
            placeholder='Search reported posts...'
            onChangeText={(query) => {
              setSearchQuery(query);
              handleSearch(query);
            }}
            value={searchQuery}
          />
        </SearchContainer>
        <ReportedPostsList
          navigate={navigate}
          posts={reportedPosts}
          setReportedPosts={setReportedPosts}
        />
      </View>
    </SafeArea>
  );
};
