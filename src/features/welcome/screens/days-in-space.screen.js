import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { ImagesContext } from '../../../services/images/images.context';
import { badgeUnlocked } from '../../../requests/user';
import { BadgeAnimation } from '../../../components/animations/badge.animation';
import AdventurousExplorer from '../../../../assets/svg/badges/adventurous-explorer.svg';
import StellarVoyager from '../../../../assets/svg/badges/stellar-voyager.svg';
import AstroPioneer from '../../../../assets/svg/badges/astro-pioneer.svg';
import CosmicTrailblazer from '../../../../assets/svg/badges/cosmic-trailblazer.svg';
import CelestialNomad from '../../../../assets/svg/badges/celestial-nomad.svg';
import GalacticWayfarer from '../../../../assets/svg/badges/galactic-wayfarer.svg';
import InterstellarVoyager from '../../../../assets/svg/badges/interstellar-voyager.svg';
import StellarCenturion from '../../../../assets/svg/badges/stellar-centurion.svg';
import VoyagerExtraordinaire from '../../../../assets/svg/badges/voyager-extraordinaire.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const DaysInSpaceScreen = ({ route }) => {
  const { setRenderDays } = useContext(ImagesContext);
  const { daysInSpace } = route.params;
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAdventurousExplorer = () => {
    badgeUnlocked(user.token, user._id, 'achievedAdventurousExplorer')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedAdventurousExplorer: res.data.achievedAdventurousExplorer,
          },
        });
        setRenderDays(false);
      })
      .catch((err) => console.error(err));
  };

  const handleStellarVoyager = () => {
    badgeUnlocked(user.token, user._id, 'achievedStellarVoyager')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedStellarVoyager: res.data.achievedStellarVoyager,
          },
        });
        setRenderDays(false);
      })
      .catch((err) => console.error(err));
  };

  const handleAstroPioneer = () => {
    badgeUnlocked(user.token, user._id, 'achievedAstroPioneer')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedAstroPioneer: res.data.achievedAstroPioneer,
          },
        });
        setRenderDays(false);
      })
      .catch((err) => console.error(err));
  };

  const handleCosmicTrailblazer = () => {
    badgeUnlocked(user.token, user._id, 'achievedCosmicTrailblazer')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedCosmicTrailblazer: res.data.achievedCosmicTrailblazer,
          },
        });
        setRenderDays(false);
      })
      .catch((err) => console.error(err));
  };

  const handleCelestialNomad = () => {
    badgeUnlocked(user.token, user._id, 'achievedCelestialNomad')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedCelestialNomad: res.data.achievedCelestialNomad,
          },
        });
        setRenderDays(false);
      })
      .catch((err) => console.error(err));
  };

  const handleGalacticWayfarer = () => {
    badgeUnlocked(user.token, user._id, 'achievedGalacticWayfarer')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedGalacticWayfarer: res.data.achievedGalacticWayfarer,
          },
        });
        setRenderDays(false);
      })
      .catch((err) => console.error(err));
  };

  const handleInterstellarVoyager = () => {
    badgeUnlocked(user.token, user._id, 'achievedInterstellarVoyager')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedInterstellarVoyager: res.data.achievedInterstellarVoyager,
          },
        });
        setRenderDays(false);
      })
      .catch((err) => console.error(err));
  };

  const handleStellarCenturion = () => {
    badgeUnlocked(user.token, user._id, 'achievedStellarCenturion')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedStellarCenturion: res.data.achievedStellarCenturion,
          },
        });
        setRenderDays(false);
      })
      .catch((err) => console.error(err));
  };

  const handleVoyagerExtraordinaire = () => {
    badgeUnlocked(user.token, user._id, 'achievedVoyagerExtraordinaire')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedVoyagerExtraordinaire:
              res.data.achievedVoyagerExtraordinaire,
          },
        });
        setRenderDays(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <BadgeContainer>
      {daysInSpace === 4 ? (
        <BadgeAnimation
          svg={<AdventurousExplorer width={380} height={380} />}
          title='Adventurous Explorer'
          body={`Bravo, Adventurous Explorer! Your journey among the stars has been acknowledged. Your spacecraft has navigated the celestial seas, and the cosmos salutes your stellar accomplishments.`}
          handleSubmit={handleAdventurousExplorer}
        />
      ) : daysInSpace === 7 ? (
        <BadgeAnimation
          svg={<StellarVoyager width={380} height={380} />}
          title='Stellar Voyager'
          body={`Stellar Voyager, your name echoes through the cosmic corridors. Your pioneering spirit in the realm of space exploration has earned you the distinguished title of Stellar Voyager.`}
          handleSubmit={handleStellarVoyager}
        />
      ) : daysInSpace === 14 ? (
        <BadgeAnimation
          svg={<AstroPioneer width={380} height={380} />}
          title='Astro Pioneer'
          body={`Salutations, Astro Pioneer! Your cosmic trail has been marked, and your unwavering commitment to cosmic exploration sets you apart in the vastness of space.`}
          handleSubmit={handleAstroPioneer}
        />
      ) : daysInSpace === 30 ? (
        <BadgeAnimation
          svg={<CosmicTrailblazer width={380} height={380} />}
          title='Cosmic Trailblazer'
          body={`Hail, Cosmic Trailblazer! Your journey across the celestial highways has earned you the revered title of Cosmic Trailblazer. Continue to traverse the cosmic realms with wisdom and wonder.`}
          handleSubmit={handleCosmicTrailblazer}
        />
      ) : daysInSpace === 60 ? (
        <BadgeAnimation
          svg={<CelestialNomad width={380} height={380} />}
          title='Celestial Nomad'
          body={`Greetings, Celestial Nomad! Your cosmic wanderlust knows no bounds, as you traverse the vast expanse of celestial skies. As a seasoned explorer, your nomadic journey through the cosmos is both recognized and celebrated.`}
          handleSubmit={handleCelestialNomad}
        />
      ) : daysInSpace === 90 ? (
        <BadgeAnimation
          svg={<GalacticWayfarer width={380} height={380} />}
          title='Galactic Wayfarer'
          body={`Well done, Galactic Wayfarer! Your spacecraft has ventured beyond the stars, and your interstellar journey is acknowledged. You are now a seasoned explorer of the cosmic depths.`}
          handleSubmit={handleGalacticWayfarer}
        />
      ) : daysInSpace === 180 ? (
        <BadgeAnimation
          svg={<InterstellarVoyager width={380} height={380} />}
          title='Interstellar Voyager'
          body={`Congratulations, Interstellar Voyager! Your journey has transcended time and space, marking you as an extraordinary cosmic explorer. Your legacy in the cosmos is etched among the stars.`}
          handleSubmit={handleInterstellarVoyager}
        />
      ) : daysInSpace === 270 ? (
        <BadgeAnimation
          svg={<StellarCenturion width={380} height={380} />}
          title='Stellar Centurion'
          body={`Majestic Stellar Centurion! Your cosmic saga has spanned a century of exploration, and your dedication to unraveling the universe's mysteries is unparalleled. You are truly a cosmic centurion.`}
          handleSubmit={handleStellarCenturion}
        />
      ) : (
        daysInSpace === 365 && (
          <BadgeAnimation
            svg={<VoyagerExtraordinaire width={380} height={380} />}
            title='Cosmic Voyager Extraordinaire'
            body={`Behold, Cosmic Voyager of the Cosmos! Your commitment to cosmic exploration has reached a remarkable milestone—365 days of unrivaled cosmic discovery. The cosmos applauds your enduring curiosity and wisdom.`}
            handleSubmit={handleVoyagerExtraordinaire}
          />
        )
      )}
    </BadgeContainer>
  );
};
