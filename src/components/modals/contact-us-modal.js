import { useState } from 'react';
import { Modal, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { SafeArea } from '../utils/safe-area.component';
import { Text } from '../typography/text.component';
import Close from '../../../assets/svg/close.svg';
import { sendMessage } from '../../requests/auth';

const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`;

const ModalView = styled.ScrollView`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  width: 100%;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 2px;
  }
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const CloseIcon = styled.TouchableOpacity`
  width: 55px;
  height: 55px;
  position: absolute;
  z-index: 999;
  top: ${(props) => props.theme.space[2]};
  right: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[2]};
`;

export const AnimationWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.space[4]};
`;

export const Animation = styled(LottieView)`
  width: 250px;
  height: 250px;
  align-self: center;
`;

export const ContactUsTitle = styled(Text)`
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const ContactUsText = styled(Text)`
  margin: ${(props) => props.theme.space[3]};
`;

const OptionContainer = styled.View`
  width: 100%;
`;

const Option = styled.TouchableOpacity`
  margin: ${(props) => props.theme.space[3]};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#009999', '#00cccc'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  padding: ${(props) => props.theme.space[3]};
  margin: 6px;
  background-color: #009999;
  border-radius: 12px;
  align-items: center;
`;

const OptionText = styled(Text)`
  color: ${(props) =>
    props.disabled ? '#666' : props.theme.colors.text.inverse};
  text-transform: uppercase;
`;

const Input = styled(TextInput)`
  background-color: #fff;
  align-self: center;
  margin: 0 ${(props) => props.theme.space[2]};
  width: 90%;
`;

export const ContactUsModal = ({ visible, setVisible }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { token, role, rank, name } = useSelector((state) => state.user);

  const closeModal = () => {
    setUserName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setVisible(false);
  };

  const sendMail = async () => {
    setIsLoading(true);
    await sendMessage(token, role, userName, email, subject, message)
      .then((res) => {
        setIsLoading(false);
        setUserName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setVisible(false);
        Toast.show({
          type: 'success',
          text1: `Transmission Successful, ${rank} ${name}!`,
          text2:
            'Your cosmic message has been sent across the stellar waves. Await our intergalactic response.',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: `Error in the Cosmos, ${rank} ${name}!`,
          text2:
            'We encountered a glitch in the space-time email continuum. Please check your connection and try again.',
        });
        console.error(err);
      });
  };

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <ModalView contentContainerStyle={{ alignItems: 'center' }}>
              <CloseIcon onPress={closeModal}>
                <Close />
              </CloseIcon>
              <AnimationWrapper>
                <Animation
                  key='animation'
                  autoPlay
                  loop
                  resizeMode='cover'
                  source={require('../../../assets/animation/contact-us.json')}
                />
              </AnimationWrapper>
              <ContactUsTitle variant='title'>Contact Us</ContactUsTitle>
              <ContactUsText variant='body'>
                {rank} {name}, please complete and transmit the form below to
                share your cosmic queries and stellar musings. We eagerly await
                your celestial transmission.
              </ContactUsText>
              <Input
                label={<Text variant='body'>Name</Text>}
                value={userName}
                onChangeText={(text) => setUserName(text)}
              />
              <Input
                label={<Text variant='body'>Email</Text>}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType='email-address'
              />
              <Input
                label={<Text variant='body'>Subject</Text>}
                value={subject}
                onChangeText={(text) => setSubject(text)}
              />
              <Input
                label={<Text variant='body'>Message</Text>}
                value={message}
                onChangeText={(text) => setMessage(text)}
                multiline={true}
              />
              <OptionContainer>
                <Option onPress={sendMail} disabled={isLoading}>
                  <GradientBackground>
                    {isLoading ? (
                      <ActivityIndicator size='small' color='#fff' />
                    ) : (
                      <OptionText variant='body'>Submit</OptionText>
                    )}
                  </GradientBackground>
                </Option>
              </OptionContainer>
            </ModalView>
          </KeyboardAvoidingView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
