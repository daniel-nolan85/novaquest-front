import { View } from 'react-native';
import { Text } from '../typography/text.component';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import Error from '../../../assets/svg/error.svg';
import Info from '../../../assets/svg/info.svg';
import Success from '../../../assets/svg/success.svg';
import Warning from '../../../assets/svg/warning.svg';

export const ToastNotification = ({ type, title, body }) => {
  let icon, backgroundColor, shadowColor;

  switch (type) {
    case 'success':
      icon = <Success width={30} height={30} />;
      backgroundColor = '#28a745';
      shadowColor = '#218838';
      break;
    case 'info':
      icon = <Info width={30} height={30} />;
      backgroundColor = '#17a2b8';
      shadowColor = '#138496';
      break;
    case 'warning':
      icon = <Warning width={30} height={30} />;
      backgroundColor = '#ffc107';
      shadowColor = '#d39e00';
      break;
    case 'error':
      icon = <Error width={30} height={30} />;
      backgroundColor = '#c0392b';
      shadowColor = '#c82333';
      break;
    default:
      icon = <Success width={30} height={30} />;
      backgroundColor = '#28a745';
      shadowColor = '#218838';
  }
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={{
        top: 70,
        backgroundColor,
        width: '100%',
        position: 'absolute',
        borderRadius: 5,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor,
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
      }}
    >
      {icon}
      <View>
        <Text
          variant='title'
          style={{
            color: '#fff',
            fontWeight: 'bold',
            marginLeft: 10,
            marginBottom: 5,
            fontSize: 16,
          }}
        >
          {title}
        </Text>
        <Text
          variant='body'
          style={{
            color: '#fff',
            fontWeight: '500',
            marginLeft: 10,
            fontSize: 14,
          }}
        >
          {body}
        </Text>
      </View>
    </Animated.View>
  );
};
