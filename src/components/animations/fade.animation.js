import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const { View, Value, timing } = Animated;

export const FadeInView = ({ duration = 1500, ...props }) => {
  useEffect(() => {
    timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  const fadeAnim = useRef(new Value(0)).current;

  return (
    <View style={{ ...props.style, opacity: fadeAnim }}>{props.children}</View>
  );
};
