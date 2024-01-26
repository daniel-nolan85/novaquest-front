import { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import { SpaceRide } from '../components/space-ride.component';
import { LoginForm } from '../components/login-form.component';
import { RegistrationForm } from '../components/registration-form.component';
import { GuestExplorerModal } from '../components/guest-explorer-modal.component';
import { ToastNotification } from '../../../components/animations/toast-notification.animation';

export const AccountScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [ip, setIp] = useState('');
  const [showBlockedToast, setShowBlockedToast] = useState(false);
  const [showPasswordLoginToast, setShowPasswordLoginToast] = useState(false);
  const [showPasswordRegistrationToast, setShowPasswordRegistrationToast] =
    useState(false);
  const [showEmailInvalidToast, setShowEmailInvalidToast] = useState(false);
  const [showEmailNotVerifiedToast, setShowEmailNotVerifiedToast] =
    useState(false);
  const [showInvalidCredentialsToast, setShowInvalidCredentialsToast] =
    useState(false);
  const [showVerificationSuccessToast, setShowVerificationSuccessToast] =
    useState(false);
  const [showVerificationErrorToast, setShowVerificationErrorToast] =
    useState(false);
  const [showEmailInUseToast, setShowEmailInUseToast] = useState(false);
  const [showInvalidEmailLoginToast, setShowInvalidEmailLoginToast] =
    useState(false);
  const [
    showInvalidEmailRegistrationToast,
    setShowInvalidEmailRegistrationToast,
  ] = useState(false);
  const [showErrorLoginToast, setShowErrorLoginToast] = useState(false);
  const [showErrorRegistrationToast, setShowErrorRegistrationToast] =
    useState(false);
  const [showResetPasswordToast, setShowResetPasswordToast] = useState(false);
  const [verificationSuccessTitle, setVerificationSuccessTitle] = useState('');
  const [resetPasswordTitle, setResetPasswordTitle] = useState('');

  useEffect(() => {
    getThisIP();
  }, []);

  const { navigate } = navigation;

  const getThisIP = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    setIp(res.data.IPv4);
  };

  const handleGuestLogin = () => {
    setVisible(true);
  };

  const blockedToastContent = {
    type: 'error',
    title: 'Warning: Unauthorized Access!',
    body: 'A blocked user attempted to sign in. If you believe this is in error, contact us immediately, Commander. Your cosmic security is our priority.',
  };

  const passwordLoginToastContent = {
    type: 'warning',
    title: 'Login Failed',
    body: 'Password must be at least 6 characters and contain letters and numbers.',
  };

  const passwordRegistrationToastContent = {
    type: 'warning',
    title: 'Registration Failed',
    body: 'Password must be at least 6 characters and contain letters and numbers.',
  };

  const emailInvalidToastContent = {
    type: 'warning',
    title: `Commander, it seems there's a warp in the space-time email continuum! `,
    body: 'Please enter a valid email address to continue your cosmic journey.',
  };

  const emailNotVerifiedToastContent = {
    type: 'warning',
    title: 'Email Not Verified',
    body: 'Please check your email and click the verification link to complete your registration.',
  };

  const invalidCredentialsToastContent = {
    type: 'warning',
    title: 'Login Failed',
    body: 'No account found with the provided credentials. Please check your email and password.',
  };

  const verificationSuccessToastContent = {
    type: 'success',
    title: verificationSuccessTitle,
    body: 'Please click the link to complete your registration.',
  };

  const verificationErrorToastContent = {
    type: 'error',
    title: 'Error sending verification email',
    body: 'Please check your email is correct and try again.',
  };

  const emailInUseToastContent = {
    type: 'warning',
    title: 'Registration Failed',
    body: 'This email address is already in use.',
  };

  const invalidEmailLoginToastContent = {
    type: 'warning',
    title: 'Login Failed',
    body: 'Please enter a valid email.',
  };

  const invalidEmailRegistrationToastContent = {
    type: 'warning',
    title: 'Registration Failed',
    body: 'Please enter a valid email.',
  };

  const errorLoginToastContent = {
    type: 'error',
    title: 'Login Failed',
    body: 'An error occurred during registration.',
  };

  const errorRegistrationToastContent = {
    type: 'error',
    title: 'Registration Failed',
    body: 'An error occurred during registration.',
  };

  const resetPasswordToastContent = {
    type: 'success',
    title: resetPasswordTitle,
    body: 'Please follow the instructions to reset your password.',
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}>
        <SpaceRide />
      </View>
      <View style={{ flex: 0.5, backgroundColor: '#eeeeef' }}>
        <Swiper
          showsPagination
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
        >
          <LoginForm
            handleGuestLogin={handleGuestLogin}
            ip={ip}
            setShowBlockedToast={setShowBlockedToast}
            setShowPasswordLoginToast={setShowPasswordLoginToast}
            setShowEmailInvalidToast={setShowEmailInvalidToast}
            setShowEmailNotVerifiedToast={setShowEmailNotVerifiedToast}
            setShowInvalidCredentialsToast={setShowInvalidCredentialsToast}
            setShowInvalidEmailLoginToast={setShowInvalidEmailLoginToast}
            setShowErrorLoginToast={setShowErrorLoginToast}
            setShowResetPasswordToast={setShowResetPasswordToast}
            setResetPasswordTitle={setResetPasswordTitle}
          />
          <RegistrationForm
            handleGuestLogin={handleGuestLogin}
            navigate={navigate}
            ip={ip}
            setShowBlockedToast={setShowBlockedToast}
            setShowEmailInvalidToast={setShowEmailInvalidToast}
            setShowPasswordRegistrationToast={setShowPasswordRegistrationToast}
            setShowVerificationSuccessToast={setShowVerificationSuccessToast}
            setShowVerificationErrorToast={setShowVerificationErrorToast}
            setShowEmailInUseToast={setShowEmailInUseToast}
            setShowInvalidEmailRegistrationToast={
              setShowInvalidEmailRegistrationToast
            }
            setShowErrorRegistrationToast={setShowErrorRegistrationToast}
            setVerificationSuccessTitle={setVerificationSuccessTitle}
          />
          <GuestExplorerModal
            visible={visible}
            setVisible={setVisible}
            ip={ip}
            setShowBlockedToast={setShowBlockedToast}
          />
        </Swiper>
      </View>
      {showBlockedToast && <ToastNotification {...blockedToastContent} />}
      {showPasswordLoginToast && (
        <ToastNotification {...passwordLoginToastContent} />
      )}
      {showPasswordRegistrationToast && (
        <ToastNotification {...passwordRegistrationToastContent} />
      )}
      {showEmailInvalidToast && (
        <ToastNotification {...emailInvalidToastContent} />
      )}
      {showEmailNotVerifiedToast && (
        <ToastNotification {...emailNotVerifiedToastContent} />
      )}
      {showInvalidCredentialsToast && (
        <ToastNotification {...invalidCredentialsToastContent} />
      )}
      {showVerificationSuccessToast && (
        <ToastNotification {...verificationSuccessToastContent} />
      )}
      {showVerificationErrorToast && (
        <ToastNotification {...verificationErrorToastContent} />
      )}
      {showEmailInUseToast && <ToastNotification {...emailInUseToastContent} />}
      {showInvalidEmailLoginToast && (
        <ToastNotification {...invalidEmailLoginToastContent} />
      )}
      {showInvalidEmailRegistrationToast && (
        <ToastNotification {...invalidEmailRegistrationToastContent} />
      )}
      {showErrorLoginToast && <ToastNotification {...errorLoginToastContent} />}
      {showErrorRegistrationToast && (
        <ToastNotification {...errorRegistrationToastContent} />
      )}
      {showResetPasswordToast && (
        <ToastNotification {...resetPasswordToastContent} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#009999',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});
