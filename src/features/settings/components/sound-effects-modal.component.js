import { Modal, Switch } from 'react-native';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  AnimationWrapper,
  Animation,
  OptionContainer,
  Option,
  GradientBackground,
  OptionText,
  DaysDescription,
} from '../styles/settings.styles';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import Close from '../../../../assets/svg/close.svg';

export const SoundEffectsModal = ({
  soundEffects,
  setSoundEffects,
  updateUserSoundEffects,
  showSoundEffects,
  closeSoundEffectsModal,
}) => {
  return (
    <>
      <SafeArea>
        <Modal
          visible={showSoundEffects}
          transparent={true}
          animationType='slide'
        >
          <ModalWrapper>
            <ModalView>
              <CloseIcon onPress={closeSoundEffectsModal}>
                <Close />
              </CloseIcon>
              <AnimationWrapper>
                <Animation
                  key='animation'
                  autoPlay
                  loop
                  resizeMode='cover'
                  source={require('../../../../assets/animation/sound-effects.json')}
                />
              </AnimationWrapper>
              <Text variant='title' style={{ textAlign: 'center' }}>
                Celestial Soundtrack
              </Text>
              <DaysDescription variant='body'>
                Welcome to the symphony of the cosmos, Commander! Toggle the
                celestial soundtrack on or off to customize your interstellar
                experience.
              </DaysDescription>
              <Switch
                value={soundEffects}
                onValueChange={() => setSoundEffects(!soundEffects)}
                trackColor={{ true: '#009999' }}
                style={{ margin: 20 }}
              />
              <OptionContainer>
                <Option onPress={updateUserSoundEffects}>
                  <GradientBackground>
                    <OptionText variant='body'>
                      Update Sound Preferences
                    </OptionText>
                  </GradientBackground>
                </Option>
              </OptionContainer>
            </ModalView>
          </ModalWrapper>
        </Modal>
      </SafeArea>
    </>
  );
};
