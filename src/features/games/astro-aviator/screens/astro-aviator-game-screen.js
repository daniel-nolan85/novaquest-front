import { useState, useEffect, useRef } from 'react';
import { GameEngine } from 'react-native-game-engine';
import { TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { restart } from '../entities';
import { Physics } from '../physics';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { Text } from '../../../../components/typography/text.component';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';
import Crown from '../../../../../assets/svg/crown.svg';
import { IconsWrapper } from '../styles/astro-aviator.styles';
import { GameBackground } from '../styles/astro-aviator-game.styles';
import { catchScore } from '../../../../requests/user';

export const AstroAviatorGameScreen = ({ navigation }) => {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  const isFirstRun = useRef(true);

  const user = useSelector((state) => state.user);
  const reduxDispatch = useDispatch();

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      if (!running) {
        saveScore();
      }
    }
  }, [running]);

  const saveScore = async () => {
    await catchScore(user.token, user._id, currentPoints)
      .then((res) => {
        reduxDispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            highScore: res.data.user.highScore,
          },
        });
        if (res.data.achievement) {
          navigate(res.data.achievement);
        } else if (res.data.simultaneousAchievements) {
          const firstAchievement = res.data.simultaneousAchievements[0];
          const additionalAchievements =
            res.data.simultaneousAchievements.slice(1);
          navigate(firstAchievement, { additionalAchievements });
        }
      })
      .catch((err) => console.error(err));
  };

  const { navigate, dispatch } = navigation;

  return (
    <GameBackground onLoadEnd={() => setIsLoading(false)}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SafeArea
          style={{
            flex: 1,
          }}
        >
          <IconsWrapper>
            <TouchableOpacity
              onPress={() => {
                dispatch(DrawerActions.openDrawer());
              }}
            >
              <Ionicons name='md-menu' size={30} color='#009999' />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigate('Leaderboard');
              }}
            >
              <Crown height={30} width={30} />
            </TouchableOpacity>
          </IconsWrapper>
          {user.highScore && (
            <Text
              variant='title'
              style={{
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 'bold',
                color: '#009999',
                marginTop: -20,
              }}
            >
              High Score: {user.highScore}
            </Text>
          )}
          {currentPoints > 0 && (
            <Text
              variant='title'
              style={{
                textAlign: 'center',
                fontSize: 40,
                fontWeight: 'bold',
                color: '#009999',
              }}
            >
              {currentPoints}
            </Text>
          )}
          <GameEngine
            ref={(ref) => {
              setGameEngine(ref);
            }}
            systems={[Physics]}
            entities={restart()}
            running={running}
            onEvent={(e) => {
              switch (e.type) {
                case 'game_over':
                  setRunning(false);
                  gameEngine.stop();
                  break;
                case 'new_point':
                  setCurrentPoints(currentPoints + 1);
                  break;
              }
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          ></GameEngine>
          {!running && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: '#009999',
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  borderRadius: 12,
                }}
                onPress={() => {
                  setCurrentPoints(-1);
                  setRunning(true);
                  gameEngine.swap(restart());
                }}
              >
                <Text
                  variant='title'
                  style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}
                >
                  START GAME
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeArea>
      )}
    </GameBackground>
  );
};
