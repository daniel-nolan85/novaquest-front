import { createDrawerNavigator } from '@react-navigation/drawer';
import { InterstellarAssemblyNavigator } from './interstellar-assembly.navigator';
import { AstroAviatorNavigator } from './astro-aviator.navigator';
import { TriviaNavigator } from './trivia.navigator';
import { Text } from '../../components/typography/text.component';

const { Navigator, Screen } = createDrawerNavigator();

export const GamesNavigator = () => {
  return (
    <Navigator>
      <Screen
        name='InterstellarAssembly'
        component={InterstellarAssemblyNavigator}
        options={{
          headerShown: false,
          drawerLabel: () => <Text variant='body'>Interstellar Assembly</Text>,
        }}
      />
      <Screen
        name='AstroAviator'
        component={AstroAviatorNavigator}
        options={{
          headerShown: false,
          drawerLabel: () => <Text variant='body'>Astro Aviator</Text>,
        }}
      />
      <Screen
        name='TriviaAviator'
        component={TriviaNavigator}
        options={{
          headerShown: false,
          drawerLabel: () => <Text variant='body'>Trivia</Text>,
        }}
      />
    </Navigator>
  );
};
