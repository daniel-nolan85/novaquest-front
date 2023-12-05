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
import CosmicCadet from '../../../../assets/svg/badges/cosmic-cadet.svg';
import CosmicCadetGrey from '../../../../assets/svg/badges/cosmic-cadet-grey.svg';
import StarNavigator from '../../../../assets/svg/badges/star-navigator.svg';
import StarNavigatorGrey from '../../../../assets/svg/badges/star-navigator-grey.svg';
import GalacticSage from '../../../../assets/svg/badges/galactic-sage.svg';
import GalacticSageGrey from '../../../../assets/svg/badges/galactic-sage-grey.svg';
import Scholar from '../../../../assets/svg/badges/scholar.svg';
import ScholarGrey from '../../../../assets/svg/badges/scholar-grey.svg';
import Quasar from '../../../../assets/svg/badges/quasar.svg';
import QuasarGrey from '../../../../assets/svg/badges/quasar-grey.svg';
import Supernova from '../../../../assets/svg/badges/supernova.svg';
import SupernovaGrey from '../../../../assets/svg/badges/supernova-grey.svg';
import LightSpeed from '../../../../assets/svg/badges/light-speed.svg';
import LightSpeedGrey from '../../../../assets/svg/badges/light-speed-grey.svg';
import Trailblazer from '../../../../assets/svg/badges/trailblazer.svg';
import TrailblazerGrey from '../../../../assets/svg/badges/trailblazer-grey.svg';
import Infinity from '../../../../assets/svg/badges/infinity.svg';
import InfinityGrey from '../../../../assets/svg/badges/infinity-grey.svg';

export const AchievementsModal = ({
  showAchievements,
  closeAchievementsModal,
}) => {
  const {
    achievedRedPlanetVoyager,
    achievedMarsRoverMaestro,
    achievedMartianLensMaster,
    achievedCosmicChronologist,
    achievedCosmicCadet,
    achievedStarNavigator,
    achievedGalacticSage,
    achievedNovaScholar,
    achievedQuasarVirtuoso,
    achievedSupernovaSavant,
    achievedLightSpeedExplorer,
    achievedOdysseyTrailblazer,
    achievedInfinityVoyager,
  } = useSelector((state) => state.user);

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
                <AchievementsItem
                  title={<Text variant='title'>Cosmic Cadet</Text>}
                  description='Achieve more than 50% as a Lunar Learner.'
                  left={() =>
                    achievedCosmicCadet ? (
                      <CosmicCadet width={100} height={100} />
                    ) : (
                      <CosmicCadetGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Star Navigator</Text>}
                  description='Score more than 50% as a Solar Seeker.'
                  left={() =>
                    achievedStarNavigator ? (
                      <StarNavigator width={100} height={100} />
                    ) : (
                      <StarNavigatorGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Galactic Sage</Text>}
                  description='Exceed 50% as a Galactic Guardian.'
                  left={() =>
                    achievedGalacticSage ? (
                      <GalacticSage width={100} height={100} />
                    ) : (
                      <GalacticSageGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Nova Scholar</Text>}
                  description='Achieve 100% as a Lunar Learner.'
                  left={() =>
                    achievedNovaScholar ? (
                      <Scholar width={100} height={100} />
                    ) : (
                      <ScholarGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Quasar Virtuoso</Text>}
                  description='Attain 100% as a Solar Seeker.'
                  left={() =>
                    achievedQuasarVirtuoso ? (
                      <Quasar width={100} height={100} />
                    ) : (
                      <QuasarGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Supernova Savant</Text>}
                  description='Score 100% as a Galactic Guardian.'
                  left={() =>
                    achievedSupernovaSavant ? (
                      <Supernova width={100} height={100} />
                    ) : (
                      <SupernovaGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Light Speed Explorer</Text>}
                  description='Successfully complete a Cosmic Quickstep.'
                  left={() =>
                    achievedLightSpeedExplorer ? (
                      <LightSpeed width={100} height={100} />
                    ) : (
                      <LightSpeedGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Odyssey Trailblazer</Text>}
                  description='Successfully complete a Galaxy Quest.'
                  left={() =>
                    achievedOdysseyTrailblazer ? (
                      <Trailblazer width={100} height={100} />
                    ) : (
                      <TrailblazerGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Infinity Voyager</Text>}
                  description='Successfully complete an Infinity Expedition.'
                  left={() =>
                    achievedInfinityVoyager ? (
                      <Infinity width={100} height={100} />
                    ) : (
                      <InfinityGrey width={100} height={100} />
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
