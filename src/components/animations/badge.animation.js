import { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import styled from 'styled-components/native';
import { FadeInView } from './fade.animation';
import { LinearGradient } from 'expo-linear-gradient';

const Animation = styled(Animatable.View)`
  align-items: center;
  justify-content: center;
  transform: {
    scale: 0;
  }
  background-color: transparent;
`;

const TextWrapper = styled.View`
  align-self: center;
  position: absolute;
  bottom: 50px;
  z-index: 100;
  padding: 16px;
`;

const Title = styled.Text`
  align-self: center;
  margin: 16px;
  font-family: Audiowide_400Regular;
  font-size: 20px;
`;

const Body = styled.Text`
  font-family: Questrial_400Regular;
  font-size: 16px;
  margin: 0 10px;
`;

const Option = styled.TouchableOpacity`
  margin: 16px 0;
  width: 100%;
`;

const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#009999', '#00cccc'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  padding: 16px;
  margin: 6px;
  background-color: #009999;
  border-radius: 12px;
  align-items: center;
`;

const OptionText = styled.Text`
  color: #fff;
  text-transform: uppercase;
  font-family: Questrial_400Regular;
`;

export const BadgeAnimation = ({ svg, title, body, handleSubmit }) => {
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleZoomOutAnimation = () => {
    setIsZoomedIn(true);
    setTimeout(() => {
      setShowText(true);
    }, 2000);
  };

  const zoomOut = {
    0: {
      scale: 1,
      translateY: 0,
    },
    1: {
      scale: 0.5,
      translateY: -300,
    },
  };

  return (
    <>
      <Animation
        animation={!isZoomedIn ? 'zoomIn' : zoomOut}
        duration={2000}
        useNativeDriver
        onAnimationEnd={handleZoomOutAnimation}
      >
        {svg}
      </Animation>
      {showText && (
        <TextWrapper>
          <FadeInView>
            <Title>{title}</Title>
            <Body>{body}</Body>
            <Option onPress={handleSubmit}>
              <GradientBackground>
                <OptionText>Continue Odyssey</OptionText>
              </GradientBackground>
            </Option>
          </FadeInView>
        </TextWrapper>
      )}
    </>
  );
};
