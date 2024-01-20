import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import CosmicArranger from '../../../../../assets/svg/badges/cosmic-arranger.svg';
import { GamesContext } from '../../../../services/games/games.context';
import { XPProgressAnimation } from '../../../../components/animations/xp-progress.animation';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const InterstellarAssemblyGameWonScreen = ({ navigation }) => {
  const [showXP, setShowXP] = useState(false);
  const [initialXP, setInitialXP] = useState(0);

  const { navigate } = navigation;

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.xp) {
      setInitialXP(user.xp);
    }
  }, []);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowXP(true);
    }, 4000);

    return () => clearTimeout(delayTimeout);
  }, []);

  const { setVisible } = useContext(GamesContext);

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedCosmicArranger')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedCosmicArranger: res.data.achievedCosmicArranger,
          },
        });
        setVisible(true);
      })
      .catch((err) => console.error(err));
    navigate('InterstellarAssemblyGame');
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<CosmicArranger width={380} height={380} />}
        title='Cosmic Arranger'
        body={`Congratulations, ${user.rank} ${user.name}! The 'Cosmic Arranger' badge is now adorning your collection. Your precision and cosmic intuition shine as you expertly arranged the planets in their celestial dance, mastering the art of Interstellar Assembly. Your order in the solar system is now a testament to your astronomical prowess!`}
        handleSubmit={handleSubmit}
      />
      {showXP && (
        <XPProgressAnimation
          earnedXP={100}
          showXP={showXP}
          initialXP={initialXP}
        />
      )}
    </BadgeContainer>
  );
};
