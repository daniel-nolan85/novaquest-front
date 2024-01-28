import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchUsersSignals } from '../../../requests/user';
import { SignalList } from '../components/signal-list.component';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { SignalsHeader } from '../components/signals-header.component';

export const SignalsScreen = ({ navigation }) => {
  const [filteredSignals, setFilteredSignals] = useState([]);

  const { token, _id, role } = useSelector((state) => state.user);

  const { navigate } = navigation;

  useFocusEffect(
    useCallback(() => {
      usersSignals();
    }, [])
  );

  const usersSignals = async () => {
    await fetchUsersSignals(token, _id, role)
      .then((res) => {
        setFilteredSignals(res.data.notifications);
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeArea style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        <SignalsHeader setFilteredSignals={setFilteredSignals} />
        <SignalList navigate={navigate} signals={filteredSignals} />
      </View>
    </SafeArea>
  );
};
