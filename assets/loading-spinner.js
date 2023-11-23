import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

// Define the "spin" animation
Animatable.initializeRegistryWithDefinitions({
  spin: {
    from: {
      transform: [{ rotate: '0deg' }],
    },
    to: {
      transform: [{ rotate: '360deg' }],
    },
  },
});

export const LoadingSpinner = () => {
  const spinDuration = 7000; // Change the duration here (in milliseconds) for a slower spin

  return (
    <View style={styles.container}>
      <View style={styles.solarSystem}>
        <Animatable.View
          animation='spin'
          easing='linear'
          iterationCount='infinite'
          duration={spinDuration}
          style={[styles.orbit, styles.earthOrbit]}
        >
          <View style={[styles.planet, styles.earth]}></View>
          <Animatable.View
            animation='spin'
            easing='linear'
            iterationCount='infinite'
            duration={spinDuration}
            style={[styles.orbit, styles.venusOrbit]}
          >
            <View style={[styles.planet, styles.venus]}></View>
            <Animatable.View
              animation='spin'
              easing='linear'
              iterationCount='infinite'
              duration={spinDuration}
              style={[styles.orbit, styles.mercuryOrbit]}
            >
              <View style={[styles.planet, styles.mercury]}></View>
              <View style={styles.sun}></View>
            </Animatable.View>
          </Animatable.View>
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d2630',
  },
  solarSystem: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbit: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fafbfC',
    borderRadius: 125,
  },
  earthOrbit: {
    width: 165,
    height: 165,
  },
  venusOrbit: {
    width: 120,
    height: 120,
  },
  mercuryOrbit: {
    width: 90,
    height: 90,
  },
  planet: {
    position: 'absolute',
    top: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3ff9dc',
  },
  sun: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#ffab91',
  },
  earth: {},
  venus: {},
  mercury: {},
});
