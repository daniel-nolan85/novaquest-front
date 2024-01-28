import {
  ProfileCardWrapper,
  ProfileImageWrapper,
  ProfileImage,
  ProfileInfoWrapper,
  Name,
  BioWrapper,
  Bio,
  ProfileImageContainer,
} from '../styles/admin-card.styles';
import defaultProfile from '../../../../assets/img/defaultProfile.png';

export const AdminCard = ({ profileImage, name, bio }) => {
  return (
    <ProfileCardWrapper>
      <ProfileImageWrapper>
        <ProfileImageContainer>
          <ProfileImage
            source={profileImage ? profileImage : defaultProfile}
            resizeMode='contain'
          />
        </ProfileImageContainer>
      </ProfileImageWrapper>

      <ProfileInfoWrapper>
        <Name variant='title'>{name}</Name>
        <BioWrapper>
          <Bio variant='body'>{bio}</Bio>
        </BioWrapper>
      </ProfileInfoWrapper>
    </ProfileCardWrapper>
  );
};
