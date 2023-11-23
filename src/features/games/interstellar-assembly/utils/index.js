import { Dimensions } from 'react-native';

const COL = 1;
export const MARGIN = 8;
export const SIZE = 75;

export const getPosition = (index) => {
  'worklet';
  return {
    x: 0,
    y: index * SIZE,
  };
};

export const getOrder = (x, y) => {
  'worklet';
  const row = Math.round(y / SIZE);
  const col = Math.round(x / SIZE);
  return row * COL + col;
};

export const shuffleArray = (array) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};
