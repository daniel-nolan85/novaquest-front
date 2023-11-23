import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AppNavigator } from './app.navigator';
import { AccountNavigator } from './account.navigator';

export const Navigation = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
