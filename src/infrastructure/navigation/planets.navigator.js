import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { PlanetsSetupScreen } from '../../features/images/planets/screens/planets-setup.screen';
import { PlanetsScreen } from '../../features/images/planets/screens/planets.screen';
import { PlanetDetailsScreen } from '../../features/images/planets/screens/planet-details.screen';
import { PlanetsAllCompleteScreen } from '../../features/images/planets/screens/planets-all-complete.screen';

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
      <Screen name='PlanetsAllComplete' component={PlanetsAllCompleteScreen} />
    </Navigator>
  );
};
