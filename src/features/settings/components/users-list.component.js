import { useState, useContext } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import {
  UserWrapper,
  UserHeader,
  User,
  UserImage,
  UserInfo,
  Title,
  Timestamp,
} from '../styles/users-list.styles';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import { UserModal } from './user-modal.component';
import { ToastContext } from '../../../services/toast/toast.context';
import { ToastNotification } from '../../../components/animations/toast-notification.animation';

export const UsersList = ({ navigate, users, setUsers }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [visible, setVisible] = useState(false);

  const { showDeleteUserToast, deleteUserTitle, deleteUserBody } =
    useContext(ToastContext);

  const deleteUserToastContent = {
    type: 'success',
    title: deleteUserTitle,
    body: deleteUserBody,
  };

  const renderItem = ({ item }) => (
    <UserWrapper key={item._id}>
      <UserHeader>
        <User onPress={() => showUser(item)}>
          <TouchableOpacity
            onPress={() => navigate('UserProfile', { userId: item._id })}
          >
            <UserImage
              source={item.profileImage ? item.profileImage : defaultProfile}
            />
          </TouchableOpacity>
          <UserInfo onPress={() => showUser(item)}>
            <Title variant='title'>{item.name}</Title>
          </UserInfo>
        </User>
      </UserHeader>
      <Timestamp variant='body'>
        {moment(item.createdAt).format('MMMM Do YYYY')}
      </Timestamp>
      <UserModal
        user={currentUser}
        setUsers={setUsers}
        visible={visible}
        setVisible={setVisible}
        navigate={navigate}
      />
    </UserWrapper>
  );

  const showUser = (item) => {
    setCurrentUser(item);
    setVisible(true);
  };

  return (
    <>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
      {showDeleteUserToast && <ToastNotification {...deleteUserToastContent} />}
    </>
  );
};
