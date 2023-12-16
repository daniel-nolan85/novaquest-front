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
import AdventurousExplorer from '../../../../assets/svg/badges/adventurous-explorer.svg';
import AdventurousExplorerGrey from '../../../../assets/svg/badges/adventurous-explorer-grey.svg';
import StellarVoyager from '../../../../assets/svg/badges/stellar-voyager.svg';
import StellarVoyagerGrey from '../../../../assets/svg/badges/stellar-voyager-grey.svg';
import AstroPioneer from '../../../../assets/svg/badges/astro-pioneer.svg';
import AstroPioneerGrey from '../../../../assets/svg/badges/astro-pioneer-grey.svg';
import CosmicTrailblazer from '../../../../assets/svg/badges/cosmic-trailblazer.svg';
import CosmicTrailblazerGrey from '../../../../assets/svg/badges/cosmic-trailblazer-grey.svg';
import CelestialNomad from '../../../../assets/svg/badges/celestial-nomad.svg';
import CelestialNomadGrey from '../../../../assets/svg/badges/celestial-nomad-grey.svg';
import GalacticWayfarer from '../../../../assets/svg/badges/galactic-wayfarer.svg';
import GalacticWayfarerGrey from '../../../../assets/svg/badges/galactic-wayfarer-grey.svg';
import InterstellarVoyager from '../../../../assets/svg/badges/interstellar-voyager.svg';
import InterstellarVoyagerGrey from '../../../../assets/svg/badges/interstellar-voyager-grey.svg';
import StellarCenturion from '../../../../assets/svg/badges/stellar-centurion.svg';
import StellarCenturionGrey from '../../../../assets/svg/badges/stellar-centurion-grey.svg';
import VoyagerExtraordinaire from '../../../../assets/svg/badges/voyager-extraordinaire.svg';
import VoyagerExtraordinaireGrey from '../../../../assets/svg/badges/voyager-extraordinaire-grey.svg';
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
    achievedAdventurousExplorer,
    achievedStellarVoyager,
    achievedAstroPioneer,
    achievedCosmicTrailblazer,
    achievedCelestialNomad,
    achievedGalacticWayfarer,
    achievedInterstellarVoyager,
    achievedStellarCenturion,
    achievedVoyagerExtraordinaire,
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
                  title={<Text variant='title'>Adventurous Explorer</Text>}
                  description='Explore the cosmos for 4 days.'
                  left={() =>
                    achievedAdventurousExplorer ? (
                      <AdventurousExplorer width={100} height={100} />
                    ) : (
                      <AdventurousExplorerGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Stellar Voyager</Text>}
                  description='Explore the cosmos for 7 days.'
                  left={() =>
                    achievedStellarVoyager ? (
                      <StellarVoyager width={100} height={100} />
                    ) : (
                      <StellarVoyagerGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Astro Pioneer</Text>}
                  description='Explore the cosmos for 14 days.'
                  left={() =>
                    achievedAstroPioneer ? (
                      <AstroPioneer width={100} height={100} />
                    ) : (
                      <AstroPioneerGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Cosmic Trailblazer</Text>}
                  description='Explore the cosmos for 30 days.'
                  left={() =>
                    achievedCosmicTrailblazer ? (
                      <CosmicTrailblazer width={100} height={100} />
                    ) : (
                      <CosmicTrailblazerGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Celestial Nomad</Text>}
                  description='Explore the cosmos for 60 days.'
                  left={() =>
                    achievedCelestialNomad ? (
                      <CelestialNomad width={100} height={100} />
                    ) : (
                      <CelestialNomadGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Galactic Wayfarer</Text>}
                  description='Explore the cosmos for 90 days.'
                  left={() =>
                    achievedGalacticWayfarer ? (
                      <GalacticWayfarer width={100} height={100} />
                    ) : (
                      <GalacticWayfarerGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Interstellar Voyager</Text>}
                  description='Explore the cosmos for 180 days.'
                  left={() =>
                    achievedInterstellarVoyager ? (
                      <InterstellarVoyager width={100} height={100} />
                    ) : (
                      <InterstellarVoyagerGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<Text variant='title'>Stellar Centurion</Text>}
                  description='Explore the cosmos for 270 days.'
                  left={() =>
                    achievedStellarCenturion ? (
                      <StellarCenturion width={100} height={100} />
                    ) : (
                      <StellarCenturionGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={
                    <Text variant='title'>Cosmic Voyager Extraordinaire</Text>
                  }
                  description='Explore the cosmos for 365 days.'
                  left={() =>
                    achievedVoyagerExtraordinaire ? (
                      <VoyagerExtraordinaire width={100} height={100} />
                    ) : (
                      <VoyagerExtraordinaireGrey width={100} height={100} />
                    )
                  }
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
