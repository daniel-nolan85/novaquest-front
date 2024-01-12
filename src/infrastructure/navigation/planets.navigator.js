import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { PlanetsSetupScreen } from '../../features/images/planets/screens/planets-setup.screen';
import { PlanetsScreen } from '../../features/planets/screens/planets.screen';
import { PlanetDetailsScreen } from '../../features/planets/screens/planet-details.screen';

const { Navigator, Screen } = createStackNavigator();

export const PlanetsNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        headerShown: false,
      }}
    >
      <Screen name='PlanetsSetup' component={PlanetsSetupScreen} />
      <Screen name='PlanetsList' component={PlanetsScreen} />
      <Screen name='PlanetDetails' component={PlanetDetailsScreen} />
    </Navigator>
  );
};
