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

export const AchievementsRoute = ({ achievements }) => {
  const [visible, setVisible] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState({});

  const achievementIconMapping = {
    achievedCosmicPioneer: {
      icon: RocketLaunch,
      name: 'Cosmic Pioneer',
      description:
        'Complete the app introduction and launch your cosmic adventure!',
    },
    achievedAdventurousExplorer: {
      icon: AdventurousExplorer,
      name: 'Adventurous Explorer',
      description: 'Explore the cosmos for 4 days.',
    },
    achievedStellarVoyager: {
      icon: StellarVoyager,
      name: 'Stellar Voyager',
      description: 'Explore the cosmos for 7 days.',
    },
    achievedAstroPioneer: {
      icon: AstroPioneer,
      name: 'Astro Pioneer',
      description: 'Explore the cosmos for 14 days.',
    },
    achievedCosmicTrailblazer: {
      icon: CosmicTrailblazer,
      name: 'Cosmic Trailblazer',
      description: 'Explore the cosmos for 30 days.',
    },
    achievedCelestialNomad: {
      icon: CelestialNomad,
      name: 'Celestial Nomad',
      description: 'Explore the cosmos for 60 days.',
    },
    achievedGalacticWayfarer: {
      icon: GalacticWayfarer,
      name: 'Galactic Wayfarer',
      description: 'Explore the cosmos for 90 days.',
    },
    achievedInterstellarVoyager: {
      icon: InterstellarVoyager,
      name: 'Interstellar Voyager',
      description: 'Explore the cosmos for 180 days.',
    },
    achievedStellarCenturion: {
      icon: StellarCenturion,
      name: 'Stellar Centurion',
      description: 'Explore the cosmos for 270 days.',
    },
    achievedVoyagerExtraordinaire: {
      icon: VoyagerExtraordinaire,
      name: 'Cosmic Voyager Extraordinaire',
      description: 'Explore the cosmos for 365 days.',
    },
    achievedRedPlanetVoyager: {
      icon: OneRover,
      name: 'Red Planet Voyager',
      description: 'Explore Mars with your first rover image view.',
    },
    achievedMarsRoverMaestro: {
      icon: AllRovers,
      name: 'Mars Rover Maestro',
      description:
        'Master Martian landscapes by viewing images from all rovers.',
    },
    achievedMartianLensMaster: {
      icon: Camera,
      name: 'Martian Lens Master',
      description: 'Explore all available cameras on each Martian rover.',
    },
    achievedCosmicChronologist: {
      icon: Calendar,
      name: 'Cosmic Chronologist',
      description:
        'Navigate both Earth dates and Martian sols in Mars rover camera searches.',
    },
    achievedCosmicCadet: {
      icon: CosmicCadet,
      name: 'Cosmic Cadet',
      description: 'Achieve more than 50% as a Lunar Learner.',
    },
    achievedStarNavigator: {
      icon: StarNavigator,
      name: 'Star Navigator',
      description: 'Score more than 50% as a Solar Seeker.',
    },
    achievedGalacticSage: {
      icon: GalacticSage,
      name: 'Galactic Sage',
      description: 'Exceed 50% as a Galactic Guardian.',
    },
    achievedNovaScholar: {
      icon: Scholar,
      name: 'Nova Scholar',
      description: 'Achieve 100% as a Lunar Learner.',
    },
    achievedQuasarVirtuoso: {
      icon: Quasar,
      name: 'Quasar Virtuoso',
      description: 'Attain 100% as a Solar Seeker.',
    },
    achievedSupernovaSavant: {
      icon: Supernova,
      name: 'Supernova Savant',
      description: 'Score 100% as a Galactic Guardian.',
    },
    achievedLightSpeedExplorer: {
      icon: LightSpeed,
      name: 'Light Speed Explorer',
      description: 'Successfully complete a Cosmic Quickstep.',
    },
    achievedOdysseyTrailblazer: {
      icon: Trailblazer,
      name: 'Odyssey Trailblazer',
      description: 'Successfully complete a Galaxy Quest.',
    },
    achievedInfinityVoyager: {
      icon: Infinity,
      name: 'Infinity Voyager',
      description: 'Successfully complete an Infinity Expedition.',
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
