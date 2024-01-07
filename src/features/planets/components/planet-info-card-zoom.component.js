import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { Animated } from 'react-native';
import { Text } from '../../../components/typography/text.component';
import {
  PlanetCard,
  PlanetCardCoverZoom,
  Info,
} from '../styles/planet-info-card.styles';

export const PlanetInfoCardZoom = ({ planet }) => {
  const { name, photo, type } = planet;

  scale = new Animated.Value(1);

  const zoomImage = Animated.event(
    [
      {
        nativeEvent: { scale },
      },
    ],
    { useNativeDriver: true }
  );

  const zoomState = (e) => {
    if (e.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <PlanetCard elevation={5}>
      <PinchGestureHandler
        onGestureEvent={zoomImage}
        onHandlerStateChange={zoomState}
      >
        <PlanetCardCoverZoom
          key={name}
          source={{ uri: photo }}
          style={{ transform: [{ scale }] }}
          resizeMode={'contain'}
        />
      </PinchGestureHandler>
      <Info>
        <Text variant='title'>{capitalizeFirstLetter(name)}</Text>
        <Text variant='body'>{capitalizeFirstLetter(type)}</Text>
      </Info>
    </PlanetCard>
  );
};
