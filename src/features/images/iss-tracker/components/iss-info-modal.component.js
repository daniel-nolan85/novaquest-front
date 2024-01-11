import { Modal, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { Text } from '../../../../components/typography/text.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  AnimationWrapper,
  Animation,
  Title,
  InfoTitleWrapper,
  InfoItem,
  InfoValue,
  InfoTitle,
  InfoDescription,
} from '../styles/iss-info-modal.styles';
import Close from '../../../../../assets/svg/close.svg';
import Altitude from '../../../../../assets/svg/altitude.svg';
import Footprint from '../../../../../assets/svg/footprint.svg';
import Performance from '../../../../../assets/svg/performance.svg';
import Visibility from '../../../../../assets/svg/visibility.svg';

export const ISSInfoModal = ({ visible, setVisible, issData }) => {
  const { altitude, footprint, velocity, visibility } = issData;

  const { Section } = List;

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={() => setVisible(false)}>
              <Close />
            </CloseIcon>
            <AnimationWrapper>
              <Animation
                key='animation'
                autoPlay
                loop
                resizeMode='cover'
                source={require('../../../../../assets/animation/iss.json')}
              />
            </AnimationWrapper>
            <Title variant='title'>ISS Info</Title>
            {Object.keys(issData).length > 0 && (
              <ScrollView
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <Section>
                  <InfoItem
                    title={
                      <InfoTitleWrapper>
                        <InfoTitle variant='body'>Altitude</InfoTitle>
                        <InfoValue variant='body'>
                          {altitude.toFixed(2)} km
                        </InfoValue>
                      </InfoTitleWrapper>
                    }
                    left={() => <Altitude width={32} height={32} />}
                  />
                  <InfoDescription variant='body'>
                    Altitude refers to the height of the ISS above Earth's
                    surface. The higher the altitude, the farther it is from the
                    Earth.
                  </InfoDescription>
                  <InfoItem
                    title={
                      <InfoTitleWrapper>
                        <InfoTitle variant='body'>Footprint</InfoTitle>
                        <InfoValue variant='body'>
                          {footprint.toFixed(2)} km
                        </InfoValue>
                      </InfoTitleWrapper>
                    }
                    left={() => <Footprint width={32} height={32} />}
                  />
                  <InfoDescription variant='body'>
                    Footprint in the ISS Tracker marks the area on Earth beneath
                    the International Space Station's orbital path.
                  </InfoDescription>
                  <InfoItem
                    title={
                      <InfoTitleWrapper>
                        <InfoTitle variant='body'>Velocity</InfoTitle>
                        <InfoValue variant='body'>
                          {velocity.toFixed(2)} km
                        </InfoValue>
                      </InfoTitleWrapper>
                    }
                    left={() => <Performance width={32} height={32} />}
                  />
                  <InfoDescription variant='body'>
                    Velocity represents the current speed of the ISS as it
                    orbits Earth, giving you insights into its rapid journey
                    across the cosmos.
                  </InfoDescription>
                  <InfoItem
                    title={
                      <InfoTitleWrapper>
                        <InfoTitle variant='body'>Visibility</InfoTitle>
                        <InfoValue variant='body'>
                          {capitalizeFirstLetter(visibility)}
                        </InfoValue>
                      </InfoTitleWrapper>
                    }
                    left={() => <Visibility width={32} height={32} />}
                  />
                  <InfoDescription variant='body'>
                    Visibility in the ISS Tracker indicates whether the
                    International Space Station is currently hidden in Earth's
                    shadow or brightly illuminated by the sun.
                  </InfoDescription>
                </Section>
              </ScrollView>
            )}
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
