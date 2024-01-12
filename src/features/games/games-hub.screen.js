import { useState } from 'react';
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
import styled from 'styled-components/native';
import { Text } from '../../components/typography/text.component';
import { SafeArea } from '../../components/utils/safe-area.component';
import { LoadingSpinner } from '../../../assets/loading-spinner';

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
    title: 'Astro Aviator',
    name: 'AstroAviator',
    image:
      'https://res.cloudinary.com/daufzqlld/image/upload/v1703017736/astro-aviator_ppt6kx.heic',
    description:
      'Prepare for a cosmic challenge in Astro Aviator! Guide your spaceship through asteroid-filled space, aiming to surpass your highest score. Can you navigate the celestial obstacles and become a space-faring champion?',
  },
  {
    title: 'Cosmic Conundrum',
    name: 'CosmicConundrum',
    image:
      'https://res.cloudinary.com/daufzqlld/image/upload/v1703017736/trivia_lm99oq.jpg',
    description:
      'Engage your cosmic intellect with Cosmic Conundrum! Customize your space quiz by selecting the difficulty and length. Face space-themed questions, earn points, and unlock your stellar knowledge. How high can you score in this cosmic challenge?',
  },
  {
    title: 'Interstellar Assembly',
    name: 'InterstellarAssembly',
    image:
      'https://res.cloudinary.com/daufzqlld/image/upload/v1703017736/interstellar-assembly_bsuzax.jpg',
    description:
      'Embark on a planetary puzzle journey with Interstellar Assembly! Arrange the planets in the correct cosmic order and race against time to set new records. Sharpen your mind and assemble the celestial bodies with speed and precision!',
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

export const GamesHubScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollX, setScrollX] = useState(0);

  const { navigate } = navigation;

  return (
    <ImageBackground
      onLoadEnd={() => setIsLoading(false)}
      source={{
        uri: 'https://res.cloudinary.com/daufzqlld/image/upload/v1703023132/space-journey_vqmxhi.gif',
      }}
      style={{ flex: 1 }}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SafeAreaView>
          <Title variant='title'>Games Hub</Title>
          <AnimatedFlatList
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={CARD_SIZE + SPACING * 4}
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
