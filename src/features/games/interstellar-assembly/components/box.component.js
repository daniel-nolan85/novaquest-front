import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { SIZE, MARGIN } from '../utils';

export const Box = ({ imageUrl }) => {
  return <Image source={{ uri: imageUrl }} style={styles.image} />;
};

const styles = StyleSheet.create({
  container: {
    margin: MARGIN,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SIZE - MARGIN * 2,
    height: SIZE - MARGIN * 2,
    borderRadius: 8,
  },
});
