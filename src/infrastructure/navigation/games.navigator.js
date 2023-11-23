import { createDrawerNavigator } from '@react-navigation/drawer';
import { InterstellarAssemblyNavigator } from './interstellar-assembly.navigator';
import { AstroAviatorNavigator } from './astro-aviator.navigator';
import { TriviaNavigator } from './trivia.navigator';

const { Navigator, Screen } = createDrawerNavigator();

export const GamesNavigator = () => {
  return (
    <Navigator>
      <Screen
        name='InterstellarAssembly'
        component={InterstellarAssemblyNavigator}
        options={{
          headerShown: false,
          drawerLabel: 'Drag & Drop',
        }}
      />
      <Screen
        name='AstroAviator'
        component={AstroAviatorNavigator}
        options={{
          headerShown: false,
          drawerLabel: 'Astro Aviator',
        }}
      />
      <Screen
        name='TriviaAviator'
        component={TriviaNavigator}
        options={{
          headerShown: false,
          drawerLabel: 'Trivia',
        }}
      />
    </Navigator>
  );
};
