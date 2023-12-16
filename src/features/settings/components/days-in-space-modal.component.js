import { Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  AnimationWrapper,
  Animation,
  DaysDescription,
} from '../styles/settings.styles';
import Close from '../../../../assets/svg/close.svg';

export const DaysInSpaceModal = ({ showDays, closeDaysInSpaceModal }) => {
  const { daysInSpace } = useSelector((state) => state.user);

  return (
    <SafeArea>
      <Modal visible={showDays} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeDaysInSpaceModal}>
              <Close />
            </CloseIcon>
            <AnimationWrapper>
              <Animation
                key='animation'
                autoPlay
                loop
                resizeMode='cover'
                source={require('../../../../assets/animation/days-in-space.json')}
              />
            </AnimationWrapper>
            <Text variant='title' style={{ textAlign: 'center' }}>
              {daysInSpace === 1 ? `${daysInSpace} Day` : `${daysInSpace} Days`}{' '}
              Spent in Cosmic Exploration
            </Text>
            {daysInSpace < 4 ? (
              <DaysDescription variant='body'>
                Greetings, Explorer! In just your first few days in space,
                you've already embarked on an exciting cosmic journey. Your
                curiosity knows no bounds, and the wonders of the universe await
                your continued exploration
              </DaysDescription>
            ) : daysInSpace >= 4 && daysInSpace < 8 ? (
              <DaysDescription variant='body'>
                Adventurous Explorer, you've spent several days navigating the
                celestial realms. Your cosmic odyssey is gaining momentum, and
                each passing day brings new revelations. Continue your journey,
                and let the mysteries of the cosmos unfold before you.
              </DaysDescription>
            ) : daysInSpace >= 8 && daysInSpace < 14 ? (
              <DaysDescription variant='body'>
                Stellar Voyager, you've been charting the cosmos for over a week
                now! Your cosmic expertise is growing, and the universe reveals
                its secrets to those who venture boldly. Keep exploring, and let
                the cosmic wonders captivate your spirit.
              </DaysDescription>
            ) : daysInSpace >= 14 && daysInSpace < 30 ? (
              <DaysDescription variant='body'>
                Astro Pioneer, congratulations on your cosmic endeavors spanning
                two weeks and beyond! Your knowledge of the universe is
                expanding, and you're becoming a seasoned explorer. Continue
                your odyssey, and let the cosmic tapestry weave its tales for
                you.
              </DaysDescription>
            ) : daysInSpace >= 30 && daysInSpace < 60 ? (
              <DaysDescription variant='body'>
                Cosmic Trailblazer, you've spent a month among the stars! Your
                commitment to cosmic exploration is commendable, and the
                mysteries of the universe unfold at your fingertips. May your
                journey through the cosmos be filled with awe and discovery.
              </DaysDescription>
            ) : daysInSpace >= 60 && daysInSpace < 90 ? (
              <DaysDescription variant='body'>
                Celestial Nomad, two months in the cosmos! Your dedication to
                uncovering the secrets of the universe is truly remarkable. The
                cosmos unfolds its wonders to those who persist—may your journey
                be filled with cosmic revelations.
              </DaysDescription>
            ) : daysInSpace >= 90 && daysInSpace < 180 ? (
              <DaysDescription variant='body'>
                Galactic Wayfarer, you've spent a quarter of a year exploring
                the vastness of space! Your cosmic wisdom is unmatched, and the
                universe continues to unveil its celestial marvels before you.
                Your journey as a cosmic nomad is both inspiring and
                extraordinary.
              </DaysDescription>
            ) : daysInSpace >= 180 && daysInSpace < 270 ? (
              <DaysDescription variant='body'>
                Interstellar Voyager, half a year among the stars! Your cosmic
                journey has reached new heights, and your understanding of the
                universe is profound. As you continue to explore, may the cosmos
                reveal even more of its cosmic wonders to you.
              </DaysDescription>
            ) : daysInSpace >= 270 && daysInSpace < 365 ? (
              <DaysDescription variant='body'>
                Stellar Centurion, you've soared through 270 days of cosmic
                exploration! Your unwavering dedication to unraveling the
                mysteries of the universe is unparalleled. The cosmos applauds
                your journey, and the tapestry of space continues to weave its
                tales for a seasoned explorer like you.
              </DaysDescription>
            ) : (
              daysInSpace >= 365 && (
                <DaysDescription variant='body'>
                  Cosmic Voyager Extraordinaire, an incredible journey beyond
                  365 days! Your commitment to cosmic exploration knows no
                  bounds. As you navigate the ever-expanding universe, your
                  legacy as a true cosmic pioneer is etched among the stars.
                  Congratulations on this extraordinary milestone, and may your
                  cosmic odyssey continue to unfold with each passing day.
                </DaysDescription>
              )
            )}
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
