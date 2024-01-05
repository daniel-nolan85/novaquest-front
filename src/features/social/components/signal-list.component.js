import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import {
  SignalWrapper,
  SignalHeader,
  SignalUser,
  SignalUserImage,
  SignalInfo,
  Name,
  Timestamp,
} from '../styles/signal-list.styles';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import { SignalModal } from './signal-modal.component';

export const SignalList = ({ navigate, signals }) => {
  const [currentSignal, setCurrentSignal] = useState({});
  const [visible, setVisible] = useState(false);

  const renderItem = ({ item }) => (
    <SignalWrapper key={item._id}>
      <SignalHeader>
        <SignalUser onPress={() => showSignal(item)}>
          <TouchableOpacity
            onPress={() => navigate('UserProfile', { userId: item.user._id })}
          >
            <SignalUserImage
              source={
                item.user.profileImage
                  ? item.postedBy.profileImage
                  : defaultProfile
              }
            />
          </TouchableOpacity>
          <SignalInfo onPress={() => showSignal(item)}>
            <Name variant='title'>{item.message}</Name>
          </SignalInfo>
        </SignalUser>
      </SignalHeader>
      <Timestamp variant='body'>{moment(item.timestamp).fromNow()}</Timestamp>
      <SignalModal
        signal={currentSignal}
        visible={visible}
        setVisible={setVisible}
        navigate={navigate}
      />
    </SignalWrapper>
  );

  const showSignal = (item) => {
    setCurrentSignal(item);
    setVisible(true);
  };

  return (
    <FlatList
      data={signals}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
    />
  );
};
