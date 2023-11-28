import React from 'react';
import LottieView from 'lottie-react-native';

export const SpaceRide = () => {
  return (
    <LottieView
      key='animation'
      autoPlay
      loop
      resizeMode='cover'
      source={require('../../../../assets/animation/space-ride.json')}
    />
  );
};
