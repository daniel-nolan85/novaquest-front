import { useState } from 'react';
import {
  ProfileButtonsWrapper,
  Option,
  GradientBackground,
  ButtonText,
} from '../styles/profile-buttons.styles';
import Allies from '../../../../assets/svg/allies.svg';
import Explorers from '../../../../assets/svg/explorers.svg';
import { AlliesModal } from './allies-modal.component';
import { ExplorersModal } from './explorers-modal.component';

export const ProfileButtons = ({ userId, name, rank, navigate }) => {
  const [showAllies, setShowAllies] = useState(false);
  const [showExplorers, setShowExplorers] = useState(false);
  return (
    <ProfileButtonsWrapper>
      <Option onPress={() => setShowAllies(true)}>
        <GradientBackground>
          <Allies width={32} height={32} />
          <ButtonText variant='body'>Allies</ButtonText>
        </GradientBackground>
      </Option>
      <Option onPress={() => setShowExplorers(true)}>
        <GradientBackground>
          <Explorers width={32} height={32} />
          <ButtonText variant='body'>Explorers</ButtonText>
        </GradientBackground>
      </Option>
      <AlliesModal
        showAllies={showAllies}
        setShowAllies={setShowAllies}
        userId={userId}
        name={name}
        rank={rank}
        navigate={navigate}
      />
      <ExplorersModal
        showExplorers={showExplorers}
        setShowExplorers={setShowExplorers}
        userId={userId}
        name={name}
        rank={rank}
        navigate={navigate}
      />
    </ProfileButtonsWrapper>
  );
};
