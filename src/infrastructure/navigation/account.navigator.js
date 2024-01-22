import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { AccountScreen } from '../../features/account/screens/account.screen';
import { TermsAndConditionsScreen } from '../../features/account/screens/terms-and-conditions.screen';
import { PrivacyPolicyScreen } from '../../features/account/screens/privacy-policy.screen';
import { CookiesPolicyScreen } from '../../features/account/screens/cookies-policy.screen';

const { Navigator, Screen } = createStackNavigator();

export const AccountNavigator = () => (
  <Navigator
    screenOptions={{
      ...TransitionPresets.ModalPresentationIOS,
      headerShown: false,
    }}
  >
    <Screen name='AccountScreen' component={AccountScreen} />
    <Screen name='TermsAndConditions' component={TermsAndConditionsScreen} />
    <Screen name='PrivacyPolicy' component={PrivacyPolicyScreen} />
    <Screen name='CookiesPolicy' component={CookiesPolicyScreen} />
  </Navigator>
);
