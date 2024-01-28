import { useState, useEffect } from 'react';
import { Modal, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Audio } from 'expo-av';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { SafeArea } from '../../components/utils/safe-area.component';
import { Text } from '../../components/typography/text.component';
import Close from '../../../assets/svg/close.svg';
import { promoteUser } from '../../requests/user';
import ranks from '../../services/ranks/ranks.json';

export const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 16px;
`;

export const ModalView = styled.ScrollView`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  width: 100%;
  padding: 35px;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 2px;
  }
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

export const CloseIcon = styled.TouchableOpacity`
  width: 55px;
  height: 55px;
  position: absolute;
  z-index: 999;
  top: 8px;
  right: 8px;
  padding: 8px;
`;

export const AnimationWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;

export const Animation = styled(LottieView)`
  width: 250px;
  height: 250px;
  align-self: center;
`;

export const PromotionText = styled(Text)`
  margin-bottom: 16px;
  line-height: 20px;
`;

export const RankUpModal = ({ rankUp, setRankUp }) => {
  const [promotedRank, setPromotedRank] = useState('');

  useEffect(() => {
    if (user && user.rank) {
      const currentRankIndex = ranks.findIndex((r) => r.name === user.rank);
      setPromotedRank(ranks[currentRankIndex + 1].name);
    }
  }, []);

  useEffect(() => {
    if (rankUp) {
      rankUpUser();
      playSoundEffect();
    }
  }, [rankUp]);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const rankUpUser = async () => {
    await promoteUser(user.token, user._id, user.role, promotedRank)
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            rank: res.data.rank,
          },
        });
      })
      .catch((err) => console.error(err));
  };

  const playSoundEffect = async () => {
    try {
      if (user.soundEffects) {
        const { sound } = await Audio.Sound.createAsync(
          require('../../../assets/sounds/rank-up.wav')
        );
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  return (
    <SafeArea>
      <Modal visible={rankUp} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView contentContainerStyle={{ alignItems: 'center' }}>
            <CloseIcon onPress={() => setRankUp(false)}>
              <Close />
            </CloseIcon>
            <AnimationWrapper>
              <Animation
                key='animation'
                autoPlay
                loop
                resizeMode='cover'
                source={require('../../../assets/animation/rank-up.json')}
              />
            </AnimationWrapper>
            <ScrollView>
              <PromotionText variant='title'>
                {promotedRank} {user.name}
              </PromotionText>
              <PromotionText variant='body'>
                Congratulations! Your dedication, skill, and stellar performance
                have propelled you to the esteemed rank of {promotedRank}. As
                you ascend to new cosmic heights, your leadership and expertise
                shine brighter than ever.
              </PromotionText>
              {promotedRank === 'Space Cadet' && (
                <PromotionText variant='body'>
                  Your promotion to {promotedRank} marks not just a title but
                  the beginning of your cosmic journey, reflecting your
                  resilience and eagerness to explore the unknown. This
                  promotion is a commendation of your commitment to stellar
                  excellence.
                </PromotionText>
              )}
              {promotedRank === 'Star Recruit' && (
                <PromotionText variant='body'>
                  Your ascension to {promotedRank} symbolizes your growing
                  cosmic expertise and dedication. This promotion celebrates
                  your commitment to navigating the celestial realms with
                  increasing proficiency.
                </PromotionText>
              )}
              {promotedRank === 'Galactic Ensign' && (
                <PromotionText variant='body'>
                  Your promotion to {promotedRank} is a testament to your
                  evolving strategic brilliance and commitment to mastering the
                  cosmic frontier. Embrace this promotion as a milestone in your
                  cosmic odyssey.
                </PromotionText>
              )}
              {promotedRank === 'Stellar Sergeant' && (
                <PromotionText variant='body'>
                  Your ascension to {promotedRank} signifies your leadership and
                  stellar performance. This is a well-deserved acknowledgment of
                  your cosmic prowess and continued excellence in space
                  exploration.
                </PromotionText>
              )}
              {promotedRank === 'Astronomy Lieutenant' && (
                <PromotionText variant='body'>
                  Your promotion to {promotedRank} reflects your dedication to
                  cosmic knowledge and leadership. This promotion is a testament
                  to your unwavering commitment to celestial excellence.
                </PromotionText>
              )}
              {promotedRank === 'Cosmic Captain' && (
                <PromotionText variant='body'>
                  With your promotion to {promotedRank}, your mastery of space
                  navigation and command is recognized. This promotion
                  celebrates your cosmic achievements and leadership in the
                  vastness of the universe.
                </PromotionText>
              )}
              {promotedRank === 'Celestial Major' && (
                <PromotionText variant='body'>
                  Your ascension to {promotedRank} is a recognition of your
                  significant contributions to the cosmic frontier. This
                  milestone underscores your leadership and expertise in
                  celestial endeavors.
                </PromotionText>
              )}
              {promotedRank === 'Interstellar Colonel' && (
                <PromotionText variant='body'>
                  With your promotion to {promotedRank}, your command over
                  interstellar missions is celebrated. This promotion reflects
                  your strategic brilliance and outstanding service in the
                  vastness of space.
                </PromotionText>
              )}
              {promotedRank === 'Galactic Commander' && (
                <PromotionText variant='body'>
                  Your ascension to {promotedRank} is a crowning achievement in
                  your cosmic journey. This promotion signifies your exceptional
                  leadership, guiding the cosmic fleet with distinction.
                </PromotionText>
              )}
              {promotedRank === 'Cosmic Brigadier' && (
                <PromotionText variant='body'>
                  Your promotion to {promotedRank} marks a higher echelon of
                  cosmic leadership. This milestone acknowledges your strategic
                  vision and unwavering commitment to the cosmic cause.
                </PromotionText>
              )}
              {promotedRank === 'Stellar General' && (
                <PromotionText variant='body'>
                  With your ascension to {promotedRank}, your cosmic expertise
                  and command reach new heights. This promotion recognizes your
                  exceptional contributions, leading the cosmic forces with
                  unparalleled skill.
                </PromotionText>
              )}
              {promotedRank === 'Astro Admiral' && (
                <PromotionText variant='body'>
                  As {promotedRank}, your mastery of cosmic navigation and
                  command is unparalleled. This promotion signifies your
                  distinguished service and leadership in the vast expanse of
                  space.
                </PromotionText>
              )}
              {promotedRank === 'Cosmic Marshal' && (
                <PromotionText variant='body'>
                  Your promotion to {promotedRank} is a testament to your cosmic
                  authority and strategic brilliance. This milestone reflects
                  your outstanding contributions to maintaining cosmic order.
                </PromotionText>
              )}
              {promotedRank === 'Celestial Strategist' && (
                <PromotionText variant='body'>
                  With your ascension to {promotedRank}, your cosmic strategies
                  shape the course of celestial conquests. This promotion
                  recognizes your strategic vision and leadership in the cosmic
                  realms.
                </PromotionText>
              )}
              {promotedRank === 'Interstellar Commodore' && (
                <PromotionText variant='body'>
                  As {promotedRank}, your command over interstellar missions is
                  celebrated. This promotion reflects your strategic brilliance
                  and outstanding service in the vastness of space.
                </PromotionText>
              )}
              {promotedRank === 'Galactic Chancellor' && (
                <PromotionText variant='body'>
                  As {promotedRank}, your cosmic diplomacy and leadership are
                  unparalleled. This promotion signifies your outstanding
                  contributions to cosmic governance and alliance-building.
                </PromotionText>
              )}
              {promotedRank === 'Cosmic Governor' && (
                <PromotionText variant='body'>
                  Your promotion to {promotedRank} reflects your governance over
                  cosmic territories. This milestone underscores your leadership
                  and commitment to maintaining cosmic harmony.
                </PromotionText>
              )}
              {promotedRank === 'Stellar Diplomat' && (
                <PromotionText variant='body'>
                  With your ascension to {promotedRank}, your cosmic diplomacy
                  fosters cooperation among celestial entities. This promotion
                  acknowledges your role as a bridge between cosmic alliances.
                </PromotionText>
              )}
              {promotedRank === 'Astronomy Ambassador' && (
                <PromotionText variant='body'>
                  As {promotedRank}, your role in representing cosmic interests
                  is paramount. This promotion celebrates your contributions to
                  fostering cosmic harmony and understanding.
                </PromotionText>
              )}
              {promotedRank === 'Cosmic Sovereign' && (
                <PromotionText variant='body'>
                  Your ascension to {promotedRank} signifies your reign over
                  cosmic realms. This promotion reflects your supreme mastery
                  and leadership in the cosmic expanse.
                </PromotionText>
              )}
              <PromotionText variant='body'>
                May your cosmic adventures continue to unfold, and may the
                cosmos witness the brilliance of your leadership in the vast
                reaches of space.
              </PromotionText>
              <PromotionText variant='body'>
                Keep exploring, {promotedRank} {user.name}!
              </PromotionText>
            </ScrollView>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
