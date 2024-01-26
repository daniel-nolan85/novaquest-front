import { useState } from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  OptionContainer,
  Option,
  GradientBackground,
  OptionText,
} from '../styles/guest-explorer-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import { checkBlockedList, createGuestUser } from '../../../requests/auth';

export const GuestExplorerModal = ({
  visible,
  setVisible,
  ip,
  setShowBlockedToast,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const checkBlocked = async () => {
    setIsLoading(true);
    await checkBlockedList(ip).then((res) => {
      if (res.data.length === 0) {
        handleSubmit();
      } else {
        setIsLoading(false);
        setShowBlockedToast(true);
        setTimeout(() => {
          setShowBlockedToast(false);
        }, 3000);
        return;
      }
    });
  };

  const handleSubmit = async () => {
    await createGuestUser('guest')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            _id: res.data._id,
            ipAddresses: res.data.ipAddresses,
            role: res.data.role,
            notifications: res.data.notifications,
            newNotificationsCount: res.data.newNotificationsCount,
            xp: res.data.xp,
            rank: res.data.rank,
            bio: res.data.bio,
            profileImage: res.data.profileImage,
            lastLoginDate: res.data.lastLoginDate,
            createdAt: res.data.createdAt,
            daysInSpace: res.data.daysInSpace,
            name: res.data.name,
            allies: res.data.allies,
            explorers: res.data.explorers,
            blockeds: res.data.blockeds,
            textSpeed: res.data.textSpeed,
            soundEffects: res.data.soundEffects,
            highScore: res.data.highScore,
            viewedRovers: res.data.viewedRovers,
            viewedRoverCameras: res.data.viewedRoverCameras,
            viewedRoverDateTypes: res.data.viewedRoverDateTypes,
            viewedPlanets: res.data.viewedPlanets,
            numOfPosts: res.data.numOfPosts,
            numOfStars: res.data.numOfStars,
            numOfComments: res.data.numOfComments,
            numOfApods: res.data.numOfApods,
            numOfFacts: res.data.numOfFacts,
            numOfAsteroids: res.data.numOfAsteroids,
            achievedCosmicPioneer: res.data.achievedCosmicPioneer,
            achievedAdventurousExplorer: res.data.achievedAdventurousExplorer,
            achievedStellarVoyager: res.data.achievedStellarVoyager,
            achievedAstroPioneer: res.data.achievedAstroPioneer,
            achievedCosmicTrailblazer: res.data.achievedCosmicTrailblazer,
            achievedCelestialNomad: res.data.achievedCelestialNomad,
            achievedGalacticWayfarer: res.data.achievedGalacticWayfarer,
            achievedInterstellarVoyager: res.data.achievedInterstellarVoyager,
            achievedStellarCenturion: res.data.achievedStellarCenturion,
            achievedVoyagerExtraordinaire:
              res.data.achievedVoyagerExtraordinaire,
            achievedRedPlanetVoyager: res.data.achievedRedPlanetVoyager,
            achievedMarsRoverMaestro: res.data.achievedMarsRoverMaestro,
            achievedMartianLensMaster: res.data.achievedMartianLensMaster,
            achievedCosmicChronologist: res.data.achievedCosmicChronologist,
            achievedCosmicCadet: res.data.achievedCosmicCadet,
            achievedStarNavigator: res.data.achievedStarNavigator,
            achievedGalacticSage: res.data.achievedGalacticSage,
            achievedNovaScholar: res.data.achievedNovaScholar,
            achievedQuasarVirtuoso: res.data.achievedQuasarVirtuoso,
            achievedSupernovaSavant: res.data.achievedSupernovaSavant,
            achievedLightSpeedExplorer: res.data.achievedLightSpeedExplorer,
            achievedOdysseyTrailblazer: res.data.achievedOdysseyTrailblazer,
            achievedInfinityVoyager: res.data.achievedInfinityVoyager,
            achievedCelestialCadet: res.data.achievedCelestialCadet,
            achievedAstroAce: res.data.achievedAstroAce,
            achievedGalacticAviator: res.data.achievedGalacticAviator,
            achievedCosmicArranger: res.data.achievedCosmicArranger,
            achievedCelestialContributor: res.data.achievedCelestialContributor,
            achievedProlificExplorer: res.data.achievedProlificExplorer,
            achievedGalaxyLuminary: res.data.achievedGalaxyLuminary,
            achievedCosmicChronicler: res.data.achievedCosmicChronicler,
            achievedStellarSupporter: res.data.achievedStellarSupporter,
            achievedCosmicConversationalist:
              res.data.achievedCosmicConversationalist,
            achievedGalacticPlanetologist:
              res.data.achievedGalacticPlanetologist,
            achievedCosmicObserver: res.data.achievedCosmicObserver,
            achievedNebulaGazer: res.data.achievedNebulaGazer,
            achievedGalacticVisionary: res.data.achievedGalacticVisionary,
            achievedAsteroidScholar: res.data.achievedAsteroidScholar,
            achievedCelestialSavant: res.data.achievedCelestialSavant,
            achievedCosmicPersona: res.data.achievedCosmicPersona,
          },
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={() => setVisible(false)}>
              <Close />
            </CloseIcon>
            <Text
              variant='title'
              style={{ textAlign: 'center', marginTop: 20, marginBottom: 10 }}
            >
              Embark on an expedition as a Guest Explorer!
            </Text>
            <Text variant='body'>
              While your cosmic journey will be filled with wonders and
              discoveries, please note that as a guest, your progress won't be
              saved. If you decide to log out, your cosmic achievements and
              insights will drift away into the vastness of space. Ready to
              explore the cosmos without leaving a permanent mark? Blast off as
              a Guest Explorer and let the cosmic adventure begin!
            </Text>
            <OptionContainer>
              <Option onPress={checkBlocked}>
                <GradientBackground>
                  {isLoading ? (
                    <ActivityIndicator size='small' color='#fff' />
                  ) : (
                    <OptionText variant='body'>
                      Launch into the Cosmos
                    </OptionText>
                  )}
                </GradientBackground>
              </Option>
            </OptionContainer>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
