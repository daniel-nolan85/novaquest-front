import { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { Box } from '../components/box.component';
import { Draggable } from '../components/draggable.component';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { shuffleArray } from '../utils';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';
import { IconsWrapper } from '../styles/interstellar-assembly.styles';
import { InterstellarAssemblyModal } from '../components/interstellar-assembly-modal.component';

const imageUrls = [
  'https://res.cloudinary.com/daufzqlld/image/upload/v1700514767/mercury-nobg_e72zse.png',
  'https://res.cloudinary.com/daufzqlld/image/upload/v1700514776/venus-nobg_ziczr8.png',
  'https://res.cloudinary.com/daufzqlld/image/upload/v1700514822/earth-nobg_a8gcia.png',
  'https://res.cloudinary.com/daufzqlld/image/upload/v1700514823/mars-nobg_cj4u36.png',
  'https://res.cloudinary.com/daufzqlld/image/upload/v1700514823/jupiter-nobg_dplcy3.png',
  'https://res.cloudinary.com/daufzqlld/image/upload/v1700515858/saturn-nobg_cxzpx6.png',
  'https://res.cloudinary.com/daufzqlld/image/upload/v1700514823/uranus-nobg_kzt67f.png',
  'https://res.cloudinary.com/daufzqlld/image/upload/v1700514823/neptune-nobg_ff5xit.png',
];

export const InterstellarAssemblyGameScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isGameWon, setIsGameWon] = useState(false);
  const [currentOrderArray, setCurrentOrderArray] = useState([]);

  const initialOrder = imageUrls.map((_, index) => index);
  const positions = useSharedValue(
    Object.assign(
      {},
      ...shuffleArray([...Array(imageUrls.length).keys()]).map(
        (item, index) => ({ [item]: index })
      )
    )
  );

  useAnimatedReaction(
    () => positions.value,
    (currentOrder) => {
      runOnJS(setCurrentOrderArray)(Object.values(currentOrder));
      const isCorrectOrder =
        JSON.stringify(currentOrderArray) === JSON.stringify(initialOrder);
      if (isCorrectOrder) {
        runOnJS(setIsGameWon)(true);
      }
    },
    [positions.value]
  );

  const handlePlayAgain = () => {
    positions.value = Object.assign(
      {},
      ...shuffleArray([...Array(imageUrls.length).keys()]).map(
        (item, index) => ({ [item]: index })
      )
    );
    setTimeout(() => {
      setIsGameWon(false);
      setCurrentOrderArray([]);
    }, 5);
  };

  const { dispatch } = navigation;

  return (
    <ImageBackground
      source={{
        uri: 'https://res.cloudinary.com/daufzqlld/image/upload/v1700521873/starry-bg_nl3ofp.jpg',
      }}
      style={{ height: '100%' }}
      onLoadEnd={() => setIsLoading(false)}
    >
      <Image
        source={{
          uri: 'https://res.cloudinary.com/daufzqlld/image/upload/v1700522543/sun-bottom2_bu4jl4.png',
        }}
        style={{ width: '100%', height: 180, position: 'absolute' }}
      />
      <SafeArea>
        <IconsWrapper>
          <TouchableOpacity
            onPress={() => {
              dispatch(DrawerActions.openDrawer());
            }}
          >
            <Ionicons name='md-menu' size={30} color='#009999' />
          </TouchableOpacity>
        </IconsWrapper>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <GestureHandlerRootView>
            <View style={styles.wrapper}>
              {imageUrls.map((imageUrl, index) => {
                return (
                  <Draggable key={imageUrl} positions={positions} id={index}>
                    <Box key={imageUrl} imageUrl={imageUrl} />
                  </Draggable>
                );
              })}
            </View>
          </GestureHandlerRootView>
        )}
        {isGameWon && (
          <InterstellarAssemblyModal
            handlePlayAgain={handlePlayAgain}
            isGameWon={isGameWon}
          />
        )}
      </SafeArea>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    padding: 16,
    marginTop: 40,
    alignItems: 'center',
  },
});
