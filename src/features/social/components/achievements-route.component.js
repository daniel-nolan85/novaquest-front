import { useState } from 'react';
import {
  AchievementsRouteWrapper,
  AchievementsList,
  AchievementWrapper,
} from '../styles/achievements-route.styles';
import { AchievementInfoModal } from './achievement-info-modal.component';
import RocketLaunch from '../../../../assets/svg/badges/rocket-launch.svg';
import AdventurousExplorer from '../../../../assets/svg/badges/adventurous-explorer.svg';
import StellarVoyager from '../../../../assets/svg/badges/stellar-voyager.svg';
import AstroPioneer from '../../../../assets/svg/badges/astro-pioneer.svg';
import CosmicTrailblazer from '../../../../assets/svg/badges/cosmic-trailblazer.svg';
import CelestialNomad from '../../../../assets/svg/badges/celestial-nomad.svg';
import GalacticWayfarer from '../../../../assets/svg/badges/galactic-wayfarer.svg';
import InterstellarVoyager from '../../../../assets/svg/badges/interstellar-voyager.svg';
import StellarCenturion from '../../../../assets/svg/badges/stellar-centurion.svg';
import VoyagerExtraordinaire from '../../../../assets/svg/badges/voyager-extraordinaire.svg';
import OneRover from '../../../../assets/svg/badges/one-rover.svg';
import AllRovers from '../../../../assets/svg/badges/all-rovers.svg';
import Camera from '../../../../assets/svg/badges/rover-camera.svg';
import Calendar from '../../../../assets/svg/badges/rover-calendar.svg';
import CosmicCadet from '../../../../assets/svg/badges/cosmic-cadet.svg';
import StarNavigator from '../../../../assets/svg/badges/star-navigator.svg';
import GalacticSage from '../../../../assets/svg/badges/galactic-sage.svg';
import Scholar from '../../../../assets/svg/badges/scholar.svg';
import Quasar from '../../../../assets/svg/badges/quasar.svg';
import Supernova from '../../../../assets/svg/badges/supernova.svg';
import LightSpeed from '../../../../assets/svg/badges/light-speed.svg';
import Trailblazer from '../../../../assets/svg/badges/trailblazer.svg';
import Infinity from '../../../../assets/svg/badges/infinity.svg';
import CelestialCadet from '../../../../assets/svg/badges/celestial-cadet.svg';
import AstroAce from '../../../../assets/svg/badges/astro-ace.svg';
import GalacticAviator from '../../../../assets/svg/badges/galactic-aviator.svg';
import CosmicArranger from '../../../../assets/svg/badges/cosmic-arranger.svg';
import CelestialContributor from '../../../../assets/svg/badges/celestial-contributor.svg';
import ProlificExplorer from '../../../../assets/svg/badges/prolific-explorer.svg';
import GalaxyLuminary from '../../../../assets/svg/badges/galaxy-luminary.svg';
import CosmicChronicler from '../../../../assets/svg/badges/cosmic-chronicler.svg';
import StellarSupporter from '../../../../assets/svg/badges/stellar-supporter.svg';
import CosmicConversationalist from '../../../../assets/svg/badges/cosmic-conversationalist.svg';
import GalacticPlanetologist from '../../../../assets/svg/badges/galactic-planetologist.svg';
import CosmicObserver from '../../../../assets/svg/badges/cosmic-observer.svg';
import NebulaGazer from '../../../../assets/svg/badges/nebula-gazer.svg';
import GalacticVisionary from '../../../../assets/svg/badges/galactic-visionary.svg';
import AsteroidScholar from '../../../../assets/svg/badges/asteroid-scholar.svg';
import CelestialSavant from '../../../../assets/svg/badges/celestial-savant.svg';
import CosmicPersona from '../../../../assets/svg/badges/cosmic-persona.svg';

export const AchievementsRoute = ({ achievements }) => {
  const [visible, setVisible] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState({});

  const achievementIconMapping = {
    achievedCosmicPioneer: {
      icon: RocketLaunch,
      name: 'Cosmic Pioneer',
      description: 'Complete introduction and launch your cosmic adventure.',
      xp: 50,
    },
    achievedAdventurousExplorer: {
      icon: AdventurousExplorer,
      name: 'Adventurous Explorer',
      description: 'Explore the cosmos for 4 days.',
      xp: 100,
    },
    achievedStellarVoyager: {
      icon: StellarVoyager,
      name: 'Stellar Voyager',
      description: 'Explore the cosmos for 7 days.',
      xp: 150,
    },
    achievedAstroPioneer: {
      icon: AstroPioneer,
      name: 'Astro Pioneer',
      description: 'Explore the cosmos for 14 days.',
      xp: 200,
    },
    achievedCosmicTrailblazer: {
      icon: CosmicTrailblazer,
      name: 'Cosmic Trailblazer',
      description: 'Explore the cosmos for 30 days.',
      xp: 250,
    },
    achievedCelestialNomad: {
      icon: CelestialNomad,
      name: 'Celestial Nomad',
      description: 'Explore the cosmos for 60 days.',
      xp: 300,
    },
    achievedGalacticWayfarer: {
      icon: GalacticWayfarer,
      name: 'Galactic Wayfarer',
      description: 'Explore the cosmos for 90 days.',
      xp: 450,
    },
    achievedInterstellarVoyager: {
      icon: InterstellarVoyager,
      name: 'Interstellar Voyager',
      description: 'Explore the cosmos for 180 days.',
      xp: 600,
    },
    achievedStellarCenturion: {
      icon: StellarCenturion,
      name: 'Stellar Centurion',
      description: 'Explore the cosmos for 270 days.',
      xp: 750,
    },
    achievedVoyagerExtraordinaire: {
      icon: VoyagerExtraordinaire,
      name: 'Cosmic Voyager Extraordinaire',
      description: 'Explore the cosmos for 365 days.',
      xp: 1000,
    },
    achievedRedPlanetVoyager: {
      icon: OneRover,
      name: 'Red Planet Voyager',
      description: 'Explore Mars with your first rover image view.',
      xp: 100,
    },
    achievedMarsRoverMaestro: {
      icon: AllRovers,
      name: 'Mars Rover Maestro',
      description:
        'Master Martian landscapes by viewing images from all rovers.',
      xp: 300,
    },
    achievedMartianLensMaster: {
      icon: Camera,
      name: 'Martian Lens Master',
      description: 'Explore all available cameras on each Martian rover.',
      xp: 500,
    },
    achievedCosmicChronologist: {
      icon: Calendar,
      name: 'Cosmic Chronologist',
      description:
        'Navigate Earth dates and Martian sols in Mars rover searches.',
      xp: 100,
    },
    achievedCosmicCadet: {
      icon: CosmicCadet,
      name: 'Cosmic Cadet',
      description: 'Achieve more than 50% as a Lunar Learner.',
      xp: 100,
    },
    achievedStarNavigator: {
      icon: StarNavigator,
      name: 'Star Navigator',
      description: 'Score more than 50% as a Solar Seeker.',
      xp: 150,
    },
    achievedGalacticSage: {
      icon: GalacticSage,
      name: 'Galactic Sage',
      description: 'Exceed 50% as a Galactic Guardian.',
      xp: 250,
    },
    achievedNovaScholar: {
      icon: Scholar,
      name: 'Nova Scholar',
      description: 'Achieve 100% as a Lunar Learner.',
      xp: 200,
    },
    achievedQuasarVirtuoso: {
      icon: Quasar,
      name: 'Quasar Virtuoso',
      description: 'Attain 100% as a Solar Seeker.',
      xp: 300,
    },
    achievedSupernovaSavant: {
      icon: Supernova,
      name: 'Supernova Savant',
      description: 'Score 100% as a Galactic Guardian.',
      xp: 500,
    },
    achievedLightSpeedExplorer: {
      icon: LightSpeed,
      name: 'Light Speed Explorer',
      description: 'Successfully complete a Cosmic Quickstep.',
      xp: 100,
    },
    achievedOdysseyTrailblazer: {
      icon: Trailblazer,
      name: 'Odyssey Trailblazer',
      description: 'Successfully complete a Galaxy Quest.',
      xp: 150,
    },
    achievedInfinityVoyager: {
      icon: Infinity,
      name: 'Infinity Voyager',
      description: 'Successfully complete an Infinity Expedition.',
      xp: 250,
    },
    achievedCelestialCadet: {
      icon: CelestialCadet,
      name: 'Celestial Cadet',
      description: 'Reach a score of 50 points on Astro Aviator.',
      xp: 150,
    },
    achievedAstroAce: {
      icon: AstroAce,
      name: 'Astro Ace',
      description: 'Reach a score of 100 points on Astro Aviator.',
      xp: 250,
    },
    achievedGalacticAviator: {
      icon: GalacticAviator,
      name: 'Galactic Aviator',
      description: 'Reach a score of 500 points on Astro Aviator.',
      xp: 750,
    },
    achievedCosmicArranger: {
      icon: CosmicArranger,
      name: 'Cosmic Arranger',
      description: 'Orchestrate the planets in perfect harmony.',
      xp: 100,
    },
    achievedCelestialContributor: {
      icon: CelestialContributor,
      name: 'Celestial Contributor',
      description: 'Create 1st post in the Cosmic Community.',
      xp: 150,
    },
    achievedProlificExplorer: {
      icon: ProlificExplorer,
      name: 'Prolific Explorer',
      description: 'Create 10th post in the Cosmic Community.',
      xp: 250,
    },
    achievedGalaxyLuminary: {
      icon: GalaxyLuminary,
      name: 'Galaxy Luminary',
      description: 'Create 50th post in the Cosmic Community.',
      xp: 500,
    },
    achievedCosmicChronicler: {
      icon: CosmicChronicler,
      name: 'Cosmic Chronicler',
      description: 'Create 250th post in the Cosmic Community.',
      xp: 750,
    },
    achievedStellarSupporter: {
      icon: StellarSupporter,
      name: 'Stellar Supporter',
      description: 'Star 300 posts in the Cosmic Community.',
      xp: 250,
    },
    achievedCosmicConversationalist: {
      icon: CosmicConversationalist,
      name: 'Cosmic Conversationalist',
      description: 'Comment on 300 posts in the Cosmic Community.',
      xp: 350,
    },
    achievedGalacticPlanetologist: {
      icon: GalacticPlanetologist,
      name: 'Galactic Planetologist',
      description: 'Explore all planets within the Planetarium.',
      xp: 150,
    },
    achievedCosmicObserver: {
      icon: CosmicObserver,
      name: 'Cosmic Observer',
      description: 'View 10 Astronomy Pictures of the Day.',
      xp: 100,
    },
    achievedNebulaGazer: {
      icon: NebulaGazer,
      name: 'Nebula Gazer',
      description: 'View 50 Astronomy Pictures of the Day.',
      xp: 250,
    },
    achievedGalacticVisionary: {
      icon: GalacticVisionary,
      name: 'Galactic Visionary',
      description: 'View 250 Astronomy Pictures of the Day.',
      xp: 600,
    },
    achievedAsteroidScholar: {
      icon: AsteroidScholar,
      name: 'Asteroid Scholar',
      description: 'Dive into the Asteroid Almanac 10 times.',
      xp: 150,
    },
    achievedCelestialSavant: {
      icon: CelestialSavant,
      name: 'Celestial Savant',
      description: 'Explore 100 space facts.',
      xp: 250,
    },
    achievedCosmicPersona: {
      icon: CosmicPersona,
      name: 'Cosmic Persona',
      description: 'Tailor your cosmic identity with a new profile image.',
      xp: 150,
    },
  };

  const showAchievementInfo = (achievement) => {
    setVisible(true);
    setSelectedAchievement(achievement);
  };

  const selectedAchievementData = achievementIconMapping[selectedAchievement];
  const IconComponent = selectedAchievementData && selectedAchievementData.icon;

  return (
    <AchievementsRouteWrapper>
      <AchievementsList
        data={achievements}
        numColumns={3}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          const {
            icon: IconComponent,
            name,
            description,
          } = achievementIconMapping[item];
          return (
            <AchievementWrapper
              key={index}
              onPress={() => showAchievementInfo(item)}
            >
              <IconComponent height={100} width={100} />
            </AchievementWrapper>
          );
        }}
      />
      <AchievementInfoModal
        visible={visible}
        setVisible={setVisible}
        selectedAchievement={selectedAchievement}
        IconComponent={IconComponent}
        achievementIconMapping={achievementIconMapping}
      />
    </AchievementsRouteWrapper>
  );
};
