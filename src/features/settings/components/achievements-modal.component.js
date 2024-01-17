import { Modal, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import {
  ModalWrapper,
  CloseIcon,
  AchievementsModalView,
  AchievementsSection,
  AchievementsItem,
  BadgeName,
} from '../styles/settings.styles';
import { SafeArea } from '../../../components/utils/safe-area.component';
import Close from '../../../../assets/svg/close.svg';
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
import CelestialCadet from '../../../../assets/svg/badges/celestial-cadet.svg';
import CelestialCadetGrey from '../../../../assets/svg/badges/celestial-cadet-grey.svg';
import AstroAce from '../../../../assets/svg/badges/astro-ace.svg';
import AstroAceGrey from '../../../../assets/svg/badges/astro-ace-grey.svg';
import GalacticAviator from '../../../../assets/svg/badges/galactic-aviator.svg';
import GalacticAviatorGrey from '../../../../assets/svg/badges/galactic-aviator-grey.svg';
import CosmicArranger from '../../../../assets/svg/badges/cosmic-arranger.svg';
import CosmicArrangerGrey from '../../../../assets/svg/badges/cosmic-arranger-grey.svg';
import CelestialContributor from '../../../../assets/svg/badges/celestial-contributor.svg';
import CelestialContributorGrey from '../../../../assets/svg/badges/celestial-contributor-grey.svg';
import ProlificExplorer from '../../../../assets/svg/badges/prolific-explorer.svg';
import ProlificExplorerGrey from '../../../../assets/svg/badges/prolific-explorer-grey.svg';
import GalaxyLuminary from '../../../../assets/svg/badges/galaxy-luminary.svg';
import GalaxyLuminaryGrey from '../../../../assets/svg/badges/galaxy-luminary-grey.svg';
import CosmicChronicler from '../../../../assets/svg/badges/cosmic-chronicler.svg';
import CosmicChroniclerGrey from '../../../../assets/svg/badges/cosmic-chronicler-grey.svg';
import StellarSupporter from '../../../../assets/svg/badges/stellar-supporter.svg';
import StellarSupporterGrey from '../../../../assets/svg/badges/stellar-supporter-grey.svg';
import CosmicConversationalist from '../../../../assets/svg/badges/cosmic-conversationalist.svg';
import CosmicConversationalistGrey from '../../../../assets/svg/badges/cosmic-conversationalist-grey.svg';
import GalacticPlanetologist from '../../../../assets/svg/badges/galactic-planetologist.svg';
import GalacticPlanetologistGrey from '../../../../assets/svg/badges/galactic-planetologist-grey.svg';
import CosmicObserver from '../../../../assets/svg/badges/cosmic-observer.svg';
import CosmicObserverGrey from '../../../../assets/svg/badges/cosmic-observer-grey.svg';
import NebulaGazer from '../../../../assets/svg/badges/nebula-gazer.svg';
import NebulaGazerGrey from '../../../../assets/svg/badges/nebula-gazer-grey.svg';
import GalacticVisionary from '../../../../assets/svg/badges/galactic-visionary.svg';
import GalacticVisionaryGrey from '../../../../assets/svg/badges/galactic-visionary-grey.svg';
import AsteroidScholar from '../../../../assets/svg/badges/asteroid-scholar.svg';
import AsteroidScholarGrey from '../../../../assets/svg/badges/asteroid-scholar-grey.svg';
import CelestialSavant from '../../../../assets/svg/badges/celestial-savant.svg';
import CelestialSavantGrey from '../../../../assets/svg/badges/celestial-savant-grey.svg';
import CosmicPersona from '../../../../assets/svg/badges/cosmic-persona.svg';
import CosmicPersonaGrey from '../../../../assets/svg/badges/cosmic-persona-grey.svg';

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
    achievedCelestialCadet,
    achievedAstroAce,
    achievedGalacticAviator,
    achievedCosmicArranger,
    achievedCelestialContributor,
    achievedProlificExplorer,
    achievedGalaxyLuminary,
    achievedCosmicChronicler,
    achievedStellarSupporter,
    achievedCosmicConversationalist,
    achievedGalacticPlanetologist,
    achievedCosmicObserver,
    achievedNebulaGazer,
    achievedGalacticVisionary,
    achievedAsteroidScholar,
    achievedCelestialSavant,
    achievedCosmicPersona,
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
                  title={<BadgeName variant='title'>Cosmic Pioneer</BadgeName>}
                  description='Complete introduction and launch your cosmic adventure.'
                  left={() => <RocketLaunch width={100} height={100} />}
                />
                <AchievementsItem
                  title={
                    <BadgeName variant='title'>Adventurous Explorer</BadgeName>
                  }
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
                  title={<BadgeName variant='title'>Stellar Voyager</BadgeName>}
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
                  title={<BadgeName variant='title'>Astro Pioneer</BadgeName>}
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
                  title={
                    <BadgeName variant='title'>Cosmic Trailblazer</BadgeName>
                  }
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
                  title={<BadgeName variant='title'>Celestial Nomad</BadgeName>}
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
                  title={
                    <BadgeName variant='title'>Galactic Wayfarer</BadgeName>
                  }
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
                  title={
                    <BadgeName variant='title'>Interstellar Voyager</BadgeName>
                  }
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
                  title={
                    <BadgeName variant='title'>Stellar Centurion</BadgeName>
                  }
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
                    <BadgeName variant='title'>
                      Cosmic Voyager Extraordinaire
                    </BadgeName>
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
                  title={
                    <BadgeName variant='title'>Red Planet Voyager</BadgeName>
                  }
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
                  title={
                    <BadgeName variant='title'>Mars Rover Maestro</BadgeName>
                  }
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
                  title={
                    <BadgeName variant='title'>Martian Lens Master</BadgeName>
                  }
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
                  title={
                    <BadgeName variant='title'>Cosmic Chronologist</BadgeName>
                  }
                  description='Navigate Earth dates and Martian sols in Mars rover searches.'
                  left={() =>
                    achievedCosmicChronologist ? (
                      <Calendar width={100} height={100} />
                    ) : (
                      <CalendarGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<BadgeName variant='title'>Cosmic Cadet</BadgeName>}
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
                  title={<BadgeName variant='title'>Star Navigator</BadgeName>}
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
                  title={<BadgeName variant='title'>Galactic Sage</BadgeName>}
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
                  title={<BadgeName variant='title'>Nova Scholar</BadgeName>}
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
                  title={<BadgeName variant='title'>Quasar Virtuoso</BadgeName>}
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
                  title={
                    <BadgeName variant='title'>Supernova Savant</BadgeName>
                  }
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
                  title={
                    <BadgeName variant='title'>Light Speed Explorer</BadgeName>
                  }
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
                  title={
                    <BadgeName variant='title'>Odyssey Trailblazer</BadgeName>
                  }
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
                  title={
                    <BadgeName variant='title'>Infinity Voyager</BadgeName>
                  }
                  description='Successfully complete an Infinity Expedition.'
                  left={() =>
                    achievedInfinityVoyager ? (
                      <Infinity width={100} height={100} />
                    ) : (
                      <InfinityGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<BadgeName variant='title'>Celestial Cadet</BadgeName>}
                  description='Reach a score of 50 points on Astro Aviator.'
                  left={() =>
                    achievedCelestialCadet ? (
                      <CelestialCadet width={100} height={100} />
                    ) : (
                      <CelestialCadetGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<BadgeName variant='title'>Astro Ace</BadgeName>}
                  description='Reach a score of 100 points on Astro Aviator.'
                  left={() =>
                    achievedAstroAce ? (
                      <AstroAce width={100} height={100} />
                    ) : (
                      <AstroAceGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={
                    <BadgeName variant='title'>Galactic Aviator</BadgeName>
                  }
                  description='Reach a score of 500 points on Astro Aviator.'
                  left={() =>
                    achievedGalacticAviator ? (
                      <GalacticAviator width={100} height={100} />
                    ) : (
                      <GalacticAviatorGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<BadgeName variant='title'>Cosmic Arranger</BadgeName>}
                  description='Orchestrate the planets in perfect harmony.'
                  left={() =>
                    achievedCosmicArranger ? (
                      <CosmicArranger width={100} height={100} />
                    ) : (
                      <CosmicArrangerGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={
                    <BadgeName variant='title'>Celestial Contributor</BadgeName>
                  }
                  description='Create 1st post in the Cosmic Community.'
                  left={() =>
                    achievedCelestialContributor ? (
                      <CelestialContributor width={100} height={100} />
                    ) : (
                      <CelestialContributorGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={
                    <BadgeName variant='title'>Prolific Explorer</BadgeName>
                  }
                  description='Create 10th post in the Cosmic Community.'
                  left={() =>
                    achievedProlificExplorer ? (
                      <ProlificExplorer width={100} height={100} />
                    ) : (
                      <ProlificExplorerGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<BadgeName variant='title'>Galaxy Luminary</BadgeName>}
                  description='Create 50th post in the Cosmic Community.'
                  left={() =>
                    achievedGalaxyLuminary ? (
                      <GalaxyLuminary width={100} height={100} />
                    ) : (
                      <GalaxyLuminaryGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={
                    <BadgeName variant='title'>Cosmic Chronicler</BadgeName>
                  }
                  description='Create 250th post in the Cosmic Community.'
                  left={() =>
                    achievedCosmicChronicler ? (
                      <CosmicChronicler width={100} height={100} />
                    ) : (
                      <CosmicChroniclerGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={
                    <BadgeName variant='title'>Stellar Supporter</BadgeName>
                  }
                  description='Star 300 posts in the Cosmic Community.'
                  left={() =>
                    achievedStellarSupporter ? (
                      <StellarSupporter width={100} height={100} />
                    ) : (
                      <StellarSupporterGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={
                    <BadgeName variant='title'>
                      Cosmic Conversationalist
                    </BadgeName>
                  }
                  description='Comment on 300 posts in the Cosmic Community.'
                  left={() =>
                    achievedCosmicConversationalist ? (
                      <CosmicConversationalist width={100} height={100} />
                    ) : (
                      <CosmicConversationalistGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={
                    <BadgeName variant='title'>
                      Galactic Planetologist
                    </BadgeName>
                  }
                  description='Explore all planets within the Planetarium.'
                  left={() =>
                    achievedGalacticPlanetologist ? (
                      <GalacticPlanetologist width={100} height={100} />
                    ) : (
                      <GalacticPlanetologistGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<BadgeName variant='title'>Cosmic Observer</BadgeName>}
                  description='View 10 Astronomy Pictures of the Day.'
                  left={() =>
                    achievedCosmicObserver ? (
                      <CosmicObserver width={100} height={100} />
                    ) : (
                      <CosmicObserverGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<BadgeName variant='title'>Nebula Gazer</BadgeName>}
                  description='View 50 Astronomy Pictures of the Day.'
                  left={() =>
                    achievedNebulaGazer ? (
                      <NebulaGazer width={100} height={100} />
                    ) : (
                      <NebulaGazerGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={
                    <BadgeName variant='title'>Galactic Visionary</BadgeName>
                  }
                  description='View 250 Astronomy Pictures of the Day.'
                  left={() =>
                    achievedGalacticVisionary ? (
                      <GalacticVisionary width={100} height={100} />
                    ) : (
                      <GalacticVisionaryGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={
                    <BadgeName variant='title'>Asteroid Scholar</BadgeName>
                  }
                  description='Dive into the Asteroid Almanac 10 times.'
                  left={() =>
                    achievedAsteroidScholar ? (
                      <AsteroidScholar width={100} height={100} />
                    ) : (
                      <AsteroidScholarGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={
                    <BadgeName variant='title'>Celestial Savant</BadgeName>
                  }
                  description='Explore 100 space facts.'
                  left={() =>
                    achievedCelestialSavant ? (
                      <CelestialSavant width={100} height={100} />
                    ) : (
                      <CelestialSavantGrey width={100} height={100} />
                    )
                  }
                />
                <AchievementsItem
                  title={<BadgeName variant='title'>Cosmic Persona</BadgeName>}
                  description='Tailor your cosmic identity with a new profile image.'
                  left={() =>
                    achievedCosmicPersona ? (
                      <CosmicPersona width={100} height={100} />
                    ) : (
                      <CosmicPersonaGrey width={100} height={100} />
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
