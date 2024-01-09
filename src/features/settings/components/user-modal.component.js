import { useState } from 'react';
import { Modal } from 'react-native';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import {
  ModalWrapper,
  ModalView,
  TrashIcon,
  CloseIcon,
  ProfileCardWrapper,
  ProfileImageWrapper,
  ProfileImage,
  ProfileInfoWrapper,
  Name,
  BioWrapper,
} from '../styles/user-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import Trash from '../../../../assets/svg/trash.svg';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import { DeleteUserModal } from './delete-user-modal.component';

export const UserModal = ({
  user,
  setUsers,
  visible,
  setVisible,
  navigate,
}) => {
  const [deleteable, setDeleteable] = useState(false);

  console.log({ user });

  const closeModal = () => {
    setVisible(false);
  };

  const deleteUser = () => {
    setDeleteable(true);
  };

  const { _id, profileImage, name, rank, daysInSpace, bio } = user;

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeModal}>
              <Close />
            </CloseIcon>
            <TrashIcon onPress={deleteUser}>
              <Trash />
            </TrashIcon>
            {Object.keys(user).length > 0 && (
              <ProfileCardWrapper
                onPress={() => {
                  navigate('UserProfile', { userId: _id });

                  closeModal();
                }}
              >
                <ProfileImageWrapper>
                  <ProfileImage
                    source={profileImage ? profileImage : defaultProfile}
                    resizeMode='contain'
                  />
                </ProfileImageWrapper>

                <ProfileInfoWrapper>
                  <Name variant='title'>
                    {rank} {name}
                  </Name>
                  <Name variant='title'>
                    {daysInSpace === 1
                      ? `${daysInSpace} day`
                      : `${daysInSpace} days`}{' '}
                    in space
                  </Name>
                  <BioWrapper>
                    <Text variant='body'>{bio}</Text>
                  </BioWrapper>
                </ProfileInfoWrapper>
                <DeleteUserModal
                  visible={deleteable}
                  setVisible={setDeleteable}
                  userId={_id}
                  setUsers={setUsers}
                  hideUserModal={closeModal}
                />
              </ProfileCardWrapper>
            )}
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
