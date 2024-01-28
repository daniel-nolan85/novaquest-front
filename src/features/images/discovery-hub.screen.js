import { useState, useEffect, useContext } from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import Animated, {
  interpolate,
  Extrapolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Text } from '../../components/typography/text.component';
import { SafeArea } from '../../components/utils/safe-area.component';
import { LoadingSpinner } from '../../../assets/loading-spinner';
import { AudioContext } from '../../services/audio/audio.context';

const SRC_WIDTH = Dimensions.get('window').width;
const CARD_SIZE = SRC_WIDTH * 0.8;
const SPACING = SRC_WIDTH * 0.02;
const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SafeAreaView = styled(SafeArea)`
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const Title = styled(Text)`
  color: #009999;
  font-size: 30px;
`;
const CardView = styled.View`
  flex-direction: column;
`;
const Card = styled(Animated.View)`
  width: ${CARD_SIZE};
  height: 100%;
  overflow: hidden;
  border-radius: 15px;
`;
const CardText = styled(Text)`
  color: #009999;
  font-size: 25px;
  margin-top: 50px;
  margin-bottom: 10px;
  text-align: center;
`;
const CardDescription = styled(Text)`
  color: #009999;
  width: ${CARD_SIZE};
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
`;

const DATA = [
  {
    title: 'APOD',
    name: 'Apod',
    image:
      'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450501/apod_wjztgg.jpg',
    description:
      'Embark on a daily cosmic journey with Astronomy Picture of the Day! Witness breathtaking space images accompanied by detailed descriptions. Feel free to explore the cosmos through time by selecting a date from the calendar and unveil the wonders of earlier Pics of the Day.',
  },
  {
    title: 'Asteroid Almanac',
    name: 'AsteroidAlmanac',
    image:
      'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450505/asteroid-almanac_fphagh.jpg',
    description:
      'Dive into the cosmic realm of Asteroid Almanac! Select a date to unveil information on all near-earth objects within a 7-day orbit. Explore the trajectories and details of these celestial travelers to enhance your understanding of the dynamic dance between Earth and asteroids.',
  },
  {
    title: 'ISS Tracker',
    name: 'ISSTracker',
    image:
      'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450723/space-station_xfynvu.jpg',
    description: `Embark on a real-time cosmic journey with our ISS Tracker! Stay connected with the International Space Station as you witness its live location updates against a map of Earth. Explore the Earth's orbit, track its current velocity, and follow the ISS as it speeds through the cosmos, bringing the wonders of space closer to you.`,
  },
  {
    title: 'Mars Rovers',
    name: 'MarsRovers',
    image:
      'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450682/opportunity_yfcpxp.jpg',
    description:
      'Step into the shoes of a Martian explorer with Mars Rovers! Choose a rover, pick a camera to look through, and select a date to unveil real images captured on the Red Planet. Immerse yourself in the Martian landscapes and experience the wonders of interplanetary exploration.',
  },
  {
    title: 'Planetarium',
    name: 'Planets',
    image:
      'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450683/planetarium_utndzz.jpg',
    description:
      'Explore the wonders of the cosmos in the Planetarium, a celestial archive that unveils fascinating facts, knowledge, and captivating images of planets and dwarfs in our solar system. Embark on a cosmic journey as you delve into the mysteries and unique characteristics of each celestial body.',
  },
];

const Item = ({
  index,
  scrollX,
  title,
  name,
  imageUrl,
  description,
  navigate,
}) => {
  const size = useSharedValue(0.8);
  const inputRange = [
    (index - 1) * CARD_SIZE,
    index * CARD_SIZE,
    (index + 1) * CARD_SIZE,
  ];

  size.value = interpolate(
    scrollX,
    inputRange,
    [0.8, 1, 0.8],
    Extrapolate.CLAMP
  );

  const opacity = useSharedValue(1);
  const opacityInputRange = [
    (index - 1) * CARD_SIZE,
    index * CARD_SIZE,
    (index + 1) * CARD_SIZE,
  ];
  opacity.value = interpolate(
    scrollX,
    opacityInputRange,
    [0.5, 1, 0.5],
    Extrapolate.CLAMP
  );

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: size.value }],
      opacity: opacity.value,
    };
  });

  return (
    <CardView>
      <CardText variant='title'>{title}</CardText>
      <Card
        style={[
          cardStyle,
          {
            marginLeft: index === 0 ? SIDECARD_LENGTH : SPACING,
            marginRight: index === DATA.length - 1 ? SIDECARD_LENGTH : SPACING,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigate(name)}
          style={{ width: '100%', height: '50%' }}
        >
          <Image
            source={{
              uri: imageUrl,
            }}
            style={{ width: '100%', height: '100%' }}
          />
        </TouchableOpacity>
        <CardDescription variant='body'>{description}</CardDescription>
      </Card>
    </CardView>
  );
};

export const DiscoveryHubScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollX, setScrollX] = useState(0);

  const { navigate, addListener } = navigation;

  const { playGameMusic } = useContext(AudioContext);

  const { soundEffects } = useSelector((state) => state.user);

  useEffect(() => {
    const focusListener = addListener('focus', () => {
      if (soundEffects) playGameMusic();
    });

    return () => {
      focusListener();
    };
  }, [navigation, soundEffects]);

  return (
    <ImageBackground
      onLoadEnd={() => setIsLoading(false)}
      source={{
        uri: 'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450723/space-journey_fknh88.gif',
      }}
      style={{ flex: 1 }}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SafeAreaView>
          <Title variant='title'>Discovery Hub</Title>
          <AnimatedFlatList
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={CARD_SIZE + SPACING * 3.5}
            disableIntervalMomentum={true}
            disableScrollViewPanResponder={true}
            snapToAlignment={'center'}
            data={DATA}
            horizontal={true}
            renderItem={({ item, index }) => (
              <Item
                key={item.name}
                index={index}
                scrollX={scrollX}
                title={item.title}
                name={item.name}
                imageUrl={item.image}
                description={item.description}
                navigate={navigate}
              />
            )}
            keyExtractor={(item) => item.id}
            onScroll={(e) => {
              setScrollX(e.nativeEvent.contentOffset.x);
            }}
          />
        </SafeAreaView>
      )}
    </ImageBackground>
  );
};
