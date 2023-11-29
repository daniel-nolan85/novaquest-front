import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AppNavigator } from './app.navigator';
import { AccountNavigator } from './account.navigator';
import { WelcomeScreen } from '../../features/welcome/screens/welcome.screen';

export const Navigation = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <NavigationContainer>
      {user && !user.hasCompletedWelcome ? (
        <WelcomeScreen />
      ) : user ? (
        <AppNavigator />
      ) : (
        <AccountNavigator />
      )}
    </NavigationContainer>
  );
};
