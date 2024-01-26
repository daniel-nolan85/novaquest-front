import { useState, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { filterAllUsersByQuery } from '../../../requests/admin';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { SearchContainer } from '../styles/settings.styles';
import { SettingsContext } from '../../../services/settings/settings.context';
import { UsersList } from '../components/users-list.component';

export const UsersScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { users, setUsers } = useContext(SettingsContext);

  const { token, _id, role } = useSelector((state) => state.user);

  const { navigate } = navigation;

  const handleSearch = async (query) => {
    await filterAllUsersByQuery(token, _id, role, query)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeArea style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        <SearchContainer>
          <Searchbar
            placeholder='Search users...'
            onChangeText={(query) => {
              setSearchQuery(query);
              handleSearch(query);
            }}
            value={searchQuery}
          />
        </SearchContainer>
        <UsersList navigate={navigate} users={users} setUsers={setUsers} />
      </View>
    </SafeArea>
  );
};
