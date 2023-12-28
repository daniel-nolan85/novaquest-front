import { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from '../../../components/typography/text.component';
import {
  ProfileCardWrapper,
  ProfileImageWrapper,
  IconContainer,
  ProfileImage,
  ProfileInfoWrapper,
  Name,
  BioWrapper,
} from '../styles/profile-card.styles';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import Alliance from '../../../../assets/svg/alliance.svg';
import Revoke from '../../../../assets/svg/revoke.svg';
import Repair from '../../../../assets/svg/repair.svg';
import { AllianceModal } from './alliance-modal.component';
import { RevokeModal } from './revoke-modal.component';
import { RepairModal } from './repair-modal.component';

export const ProfileCard = ({ userId, profileImage, name, rank, bio }) => {
  const [visible, setVisible] = useState(false);
  const { _id, allies } = useSelector((state) => state.user);

  return (
    <ProfileCardWrapper>
      <ProfileImageWrapper>
        <IconContainer onPress={() => setVisible(true)}>
          {_id !== userId && !allies.includes(userId) ? (
            <Alliance width={48} height={48} />
          ) : _id !== userId && allies.includes(userId) ? (
            <Revoke width={48} height={48} />
          ) : (
            <Repair width={48} height={48} />
          )}
        </IconContainer>
        <ProfileImage
          source={profileImage ? profileImage : defaultProfile}
          resizeMode='contain'
        />
      </ProfileImageWrapper>

      <ProfileInfoWrapper>
        <Name variant='title'>
          {rank} {name}
        </Name>
        <BioWrapper style={{ flexDirection: 'row' }}>
          <Text variant='body'>{bio}</Text>
        </BioWrapper>
      </ProfileInfoWrapper>

      {_id !== userId && !allies.includes(userId) ? (
        <AllianceModal
          visible={visible}
          setVisible={setVisible}
          userId={userId}
          profileImage={profileImage}
          name={name}
          rank={rank}
        />
      ) : _id !== userId && allies.includes(userId) ? (
        <RevokeModal
          visible={visible}
          setVisible={setVisible}
          userId={userId}
          profileImage={profileImage}
          name={name}
          rank={rank}
        />
      ) : (
        <RepairModal visible={visible} setVisible={setVisible} />
      )}
    </ProfileCardWrapper>
  );
};
