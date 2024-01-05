import { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { fetchUsersSignals } from '../../../requests/user';
import { SignalList } from '../components/signal-list.component';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { SignalsHeader } from '../components/signals-header.component';

export const SignalsScreen = ({ navigation }) => {
  const [signals, setSignals] = useState([]);

  const { token, _id } = useSelector((state) => state.user);

  const { navigate } = navigation;

  useFocusEffect(
    useCallback(() => {
      usersSignals();
    }, [])
  );

  const usersSignals = async () => {
    await fetchUsersSignals(token, _id)
      .then((res) => {
        setSignals(res.data.notifications);
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeArea style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        <SignalsHeader />
        <ScrollView>
          <SignalList navigate={navigate} signals={signals} />
        </ScrollView>
      </View>
    </SafeArea>
  );
};
