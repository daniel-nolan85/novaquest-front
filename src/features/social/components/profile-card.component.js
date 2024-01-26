import { useState, useEffect, useContext } from 'react';
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
  ProfileImageContainer,
  Banner,
  BannerText,
} from '../styles/profile-card.styles';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import Alliance from '../../../../assets/svg/alliance.svg';
import Revoke from '../../../../assets/svg/revoke.svg';
import Repair from '../../../../assets/svg/repair.svg';
import { AllianceModal } from './alliance-modal.component';
import { RevokeModal } from './revoke-modal.component';
import { RepairModal } from './repair-modal.component';
import { awardAchievement } from '../../../requests/user';
import { ToastContext } from '../../../services/toast/toast.context';
import { ToastNotification } from '../../../components/animations/toast-notification.animation';

export const ProfileCard = ({
  userId,
  profileImage,
  name,
  rank,
  userRole,
  bio,
  daysInSpace,
  navigate,
}) => {
  const [visible, setVisible] = useState(false);
  const [firstProfileImage, setFirstProfileImage] = useState(false);

  const { showAllianceToast, allianceTitle, showRevokeToast, revokeTitle } =
    useContext(ToastContext);

  useEffect(() => {
    if (!visible && firstProfileImage) {
      awardAchievement(token, _id, role, 'achievedCosmicPersona')
        .then((res) => {
          setFirstProfileImage(false);
          navigate('FirstProfileImage');
        })
        .catch((err) => console.error(err));
      setFirstProfileImage(false);
    }
  }, [visible, firstProfileImage]);

  const { token, _id, role, allies, xp } = useSelector((state) => state.user);

  const allianceToastContent = {
    type: 'success',
    title: allianceTitle,
    body: 'Prepare to explore the cosmos together!',
  };

  const revokeToastContent = {
    type: 'warning',
    title: revokeTitle,
    body: 'You will no longer receive signals about their posts.',
  };

  return (
    <>
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
          <ProfileImageContainer>
            <ProfileImage
              source={profileImage ? profileImage : defaultProfile}
              resizeMode='contain'
            />
            {userRole === 'guest' && (
              <Banner>
                <BannerText variant='title'>Guest Explorer</BannerText>
              </Banner>
            )}
          </ProfileImageContainer>
        </ProfileImageWrapper>

        <ProfileInfoWrapper>
          <Name variant='title'>
            {rank} {name}
          </Name>
          <Name variant='title'>{xp} XP</Name>
          <Name variant='title'>
            {daysInSpace === 1 ? `${daysInSpace} day` : `${daysInSpace} days`}{' '}
            in space
          </Name>
          <BioWrapper>
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
          <RepairModal
            visible={visible}
            setVisible={setVisible}
            setFirstProfileImage={setFirstProfileImage}
          />
        )}
      </ProfileCardWrapper>
      {showAllianceToast && <ToastNotification {...allianceToastContent} />}
      {showRevokeToast && <ToastNotification {...revokeToastContent} />}
    </>
  );
};
