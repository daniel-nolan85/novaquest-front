import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Searchbar, Badge } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import {
  Header,
  SearchContainer,
  SignalsIcon,
} from '../styles/feed-header.styles';
import Signals from '../../../../assets/svg/signals.svg';
import { resetNotifsCount } from '../../../requests/user';
import { filterPostsByQuery } from '../../../requests/post';

export const FeedHeader = ({ navigate, setPosts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const showNotifications = async () => {
    await resetNotifsCount(user.token, user._id)
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            newNotificationsCount: res.data.newNotificationsCount,
          },
        });
        navigate('Signals');
      })
      .catch((err) => console.error(err));
  };

  const handleSearch = async (query) => {
    await filterPostsByQuery(user.token, query)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Header>
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
      <TouchableOpacity onPress={showNotifications}>
        <SignalsIcon>
          <Signals width={32} height={32} />
        </SignalsIcon>
        <Badge
          visible={user.newNotificationsCount.length > 0}
          size={20}
          style={{ position: 'absolute', top: -5, right: -5 }}
        >
          {user.newNotificationsCount.length}
        </Badge>
      </TouchableOpacity>
    </Header>
  );
};
