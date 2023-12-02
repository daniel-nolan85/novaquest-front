import { Modal, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  AchievementsModalView,
  AchievementsSection,
  AchievementsItem,
} from '../styles/settings.styles';
import { SafeArea } from '../../../components/utils/safe-area.component';
import Close from '../../../../assets/svg/close.svg';
import { Text } from '../../../components/typography/text.component';
import RocketLaunch from '../../../../assets/svg/badges/rocket-launch.svg';
import OneRover from '../../../../assets/svg/badges/one-rover.svg';
import OneRoverGrey from '../../../../assets/svg/badges/one-rover-grey.svg';
import AllRovers from '../../../../assets/svg/badges/all-rovers.svg';
import AllRoversGrey from '../../../../assets/svg/badges/all-rovers-grey.svg';
import Camera from '../../../../assets/svg/badges/rover-camera.svg';
import CameraGrey from '../../../../assets/svg/badges/rover-camera-grey.svg';
import Calendar from '../../../../assets/svg/badges/rover-calendar.svg';
import CalendarGrey from '../../../../assets/svg/badges/rover-calendar-grey.svg';

export const AchievementsModal = ({
  showAchievements,
  closeAchievementsModal,
}) => {
  const {
    achievedRedPlanetVoyager,
    achievedMarsRoverMaestro,
    achievedMartianLensMaster,
    achievedCosmicChronologist,
  } = useSelector((state) => state.user);

  const { Section } = List;

  return (
    <SafeArea>
      <Modal
        visible={showAchievements}
        transparent={true}
        animationType='slide'
      >
        <ModalWrapper>
          <AchievementsModalView>
            <CloseIcon onPress={closeAchievementsModal}>
              <Close />
            </CloseIcon>
            <ScrollView>
              <AchievementsSection>
                <AchievementsItem
                  title={<Text variant='title'>Cosmic Pioneer</Text>}
                  description='Complete the app introduction and launch your cosmic adventure!'
                  left={() => <RocketLaunch width={100} height={100} />}
                />
                <AchievementsItem
                  title={<Text variant='title'>Red Planet Voyager</Text>}
                  description='Explore Mars with your first rover image view.'
                  left={() =>
                    achievedRedPlanetVoyager ? (
                      <OneRover width={100} height={100} />
                    ) : (
                      <OneRoverGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Mars Rover Maestro</Text>}
                  description='Master Martian landscapes by viewing images from all rovers.'
                  left={() =>
                    achievedMarsRoverMaestro ? (
                      <AllRovers width={100} height={100} />
                    ) : (
                      <AllRoversGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Martian Lens Master</Text>}
                  description='Explore all available cameras on each Martian rover.'
                  left={() =>
                    achievedMartianLensMaster ? (
                      <Camera width={100} height={100} />
                    ) : (
                      <CameraGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Cosmic Chronologist</Text>}
                  description='Navigate both Earth dates and Martian sols in Mars rover camera searches.'
                  left={() =>
                    achievedCosmicChronologist ? (
                      <Calendar width={100} height={100} />
                    ) : (
                      <CalendarGrey width={100} height={100} />
                    )
                  }
                />
              </AchievementsSection>
            </ScrollView>
          </AchievementsModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
