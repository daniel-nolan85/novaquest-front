import { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  AlliesList,
  AlliesWrapper,
  AllyImage,
  NoAllies,
} from '../styles/allies-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import { getAllies } from '../../../requests/user';

export const AlliesModal = ({
  showAllies,
  setShowAllies,
  userId,
  name,
  rank,
  navigate,
}) => {
  const [allies, setAllies] = useState([]);

  useEffect(() => {
    if (showAllies) {
      fetchAllies();
    }
  }, [showAllies, token, userId]);

  const { token, _id } = useSelector((state) => state.user);

  const fetchAllies = async () => {
    getAllies(token, userId)
      .then((res) => {
        setAllies(res.data.allies);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const closeModal = () => {
    setShowAllies(false);
  };

  const renderItem = ({ item }) => (
    <AlliesWrapper
      onPress={() => {
        navigate('UserProfile', { userId: item._id });
        setShowAllies(false);
      }}
    >
      <AllyImage
        source={item.profileImage ? item.profileImage : defaultProfile}
        resizeMode='contain'
      />
      <Text variant='title'>
        {item.rank} {item.name}
      </Text>
    </AlliesWrapper>
  );

  return (
    <SafeArea>
      <Modal visible={showAllies} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeModal}>
              <Close />
            </CloseIcon>
            {allies.length ? (
              <AlliesList
                data={allies}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
              />
            ) : userId === _id ? (
              <NoAllies variant='title'>
                You have not made any allies yet
              </NoAllies>
            ) : (
              <NoAllies variant='title'>
                {rank} {name} has not made any allies yet
              </NoAllies>
            )}
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
