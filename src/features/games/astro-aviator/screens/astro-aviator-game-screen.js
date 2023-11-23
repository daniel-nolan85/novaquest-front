import { useState, useEffect } from 'react';
import { GameEngine } from 'react-native-game-engine';
import { TouchableOpacity, View, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { restart } from '../entities';
import { Physics } from '../physics';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { Text } from '../../../../components/typography/text.component';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';
import { IconsWrapper } from '../styles/astro-aviator.styles';
import { GameBackground } from '../styles/astro-aviator-game.styles';

export const AstroAviatorGameScreen = ({ navigation }) => {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setRunning(false);
  }, []);

  const { dispatch } = navigation;

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
          </IconsWrapper>
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
