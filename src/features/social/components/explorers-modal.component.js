import { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  ExplorersList,
  ExplorersWrapper,
  ExplorerImage,
  Name,
  NoExplorers,
  ExplorersInfo,
} from '../styles/explorers-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import { getExplorers } from '../../../requests/user';

export const ExplorersModal = ({
  showExplorers,
  setShowExplorers,
  userId,
  name,
  rank,
  navigate,
}) => {
  const [explorers, setExplorers] = useState([]);

  useEffect(() => {
    if (showExplorers) {
      fetchExplorers();
    }
  }, [showExplorers, token, userId]);

  const { token, _id, role } = useSelector((state) => state.user);

  const fetchExplorers = async () => {
    getExplorers(token, role, userId)
      .then((res) => {
        setExplorers(res.data.explorers);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const closeModal = () => {
    setShowExplorers(false);
  };

  const renderItem = ({ item }) => (
    <ExplorersWrapper
      onPress={() => {
        navigate('UserProfile', { userId: item._id });
        setShowExplorers(false);
      }}
    >
      <ExplorerImage
        source={item.profileImage ? item.profileImage : defaultProfile}
        resizeMode='contain'
      />
      <Name variant='title'>
        {item.rank} {item.name}
      </Name>
    </ExplorersWrapper>
  );

  return (
    <SafeArea>
      <Modal visible={showExplorers} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeModal}>
              <Close />
            </CloseIcon>
            {explorers.length ? (
              <ExplorersList
                data={explorers}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
              />
            ) : userId === _id ? (
              <>
                <NoExplorers variant='title'>
                  You have not made any explorers yet
                </NoExplorers>
                <ExplorersInfo variant='body'>
                  Explorers are intrepid travelers who have chosen to follow
                  your cosmic adventures. As you share your celestial
                  discoveries, they will receive signals for every new post you
                  create. Foster a community of cosmic enthusiasts and let your
                  explorations inspire others in the vast universe we traverse
                  together.
                </ExplorersInfo>
                <ExplorersInfo variant='body'>
                  As you share more of your cosmic adventures, you're likely to
                  attract more Explorers. Your journey through the cosmos has
                  the power to inspire and connect with fellow celestial
                  enthusiasts. Create, share, and let your cosmic voice resonate
                  across the vast expanse of our cosmic community!
                </ExplorersInfo>
              </>
            ) : (
              <NoExplorers variant='title'>
                {rank} {name} has not made any explorers yet
              </NoExplorers>
            )}
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
