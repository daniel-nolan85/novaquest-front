import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { WelcomeNavigator } from './welcome.navigator';
import { AppNavigator } from './app.navigator';
import { AccountNavigator } from './account.navigator';
import { ToastContext } from '../../services/toast/toast.context';
import { ToastNotification } from '../../components/animations/toast-notification.animation';

export const Navigation = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const { showDeleteAccountToast, deleteAccountBody } =
    useContext(ToastContext);

  const deleteAccountToastContent = {
    type: 'success',
    title: 'Your account has been successfully deleted',
    body: deleteAccountBody,
  };

  return (
    <NavigationContainer>
      {user && !user.achievedCosmicPioneer ? (
        <WelcomeNavigator />
      ) : user ? (
        <AppNavigator />
      ) : (
        <AccountNavigator />
      )}
      {showDeleteAccountToast && (
        <ToastNotification {...deleteAccountToastContent} />
      )}
    </NavigationContainer>
  );
};
