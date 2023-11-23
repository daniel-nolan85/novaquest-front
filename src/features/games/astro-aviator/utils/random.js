import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getAsteroidData = (addToPosX = 0) => {
  let yPos = -getRandom(300, windowHeight - 100);

  const asteroid = {
    pos: { x: windowWidth + addToPosX, y: yPos },
    size: { height: getRandom(50, 200), width: getRandom(50, 200) },
  };

  return asteroid;
};
