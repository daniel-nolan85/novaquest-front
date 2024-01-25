import { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { Box } from '../components/box.component';
import { Draggable } from '../components/draggable.component';
import { shuffleArray } from '../utils';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';
import { IconsWrapper } from '../styles/interstellar-assembly.styles';
import { InterstellarAssemblyModal } from '../components/interstellar-assembly-modal.component';
import { awardAchievement } from '../../../../requests/user';
import { GamesContext } from '../../../../services/games/games.context';
import { AudioContext } from '../../../../services/audio/audio.context';

const imageUrls = [
  'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450647/mercury-nobg_omo3qa.png',
  'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450766/venus-nobg_efr88b.png',
  'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450596/earth-nobg_btxhtw.png',
  'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450646/mars-nobg_lqtoin.png',
  'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450646/jupiter-nobg_uxx5qn.png',
  'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450687/saturn-nobg_h2kdtc.png',
  'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450726/uranus-nobg_kbb5n0.png',
  'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450682/neptune-nobg_bjoszm.png',
];

export const InterstellarAssemblyGameScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isGameWon, setIsGameWon] = useState(false);
  const [currentOrderArray, setCurrentOrderArray] = useState([]);

  const user = useSelector((state) => state.user);

  const isFirstRun = useRef(true);

  const { visible, setVisible } = useContext(GamesContext);
  const { stopGameMusic } = useContext(AudioContext);

  useFocusEffect(
    useCallback(() => {
      stopGameMusic();
    }, [])
  );

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      if (user && !user.achievedCosmicArranger) {
        awardAchievement(
          user.token,
          user._id,
          user.role,
          'achievedCosmicArranger'
        )
          .then((res) => {
            navigate('InterstellarAssemblyGameWon');
          })
          .catch((err) => console.error(err));
      } else if (isGameWon) setVisible(true);
    }
  }, [isGameWon]);

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
      setVisible(false);
      setCurrentOrderArray([]);
    }, 5);
  };

  const { navigate, dispatch } = navigation;

  return (
    <ImageBackground
      source={{
        uri: 'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450724/starry-bg_avlfmi.jpg',
      }}
      style={{ flex: 1 }}
      onLoadEnd={() => setIsLoading(false)}
    >
      <Image
        source={{
          uri: 'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450725/sun-bottom2_qhi02l.png',
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
        {visible && (
          <InterstellarAssemblyModal
            handlePlayAgain={handlePlayAgain}
            visible={visible}
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
