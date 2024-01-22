import { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { fetchLeaderboard } from '../../../../requests/games';
import { LeaderboardHeader } from '../components/leaderboard-header.component';
import { LeaderboardList } from '../components/leaderboard-list.component';

export const LeaderboardScreen = ({ navigation }) => {
  const [topScores, setTopScores] = useState([]);

  const { token, role } = useSelector((state) => state.user);

  const { navigate } = navigation;

  useFocusEffect(
    useCallback(() => {
      getLeaderboard();
    }, [])
  );

  const getLeaderboard = async () => {
    await fetchLeaderboard(token, role)
      .then((res) => {
        setTopScores(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeArea style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        <LeaderboardHeader setTopScores={setTopScores} />
        <ScrollView>
          <LeaderboardList navigate={navigate} topScores={topScores} />
        </ScrollView>
      </View>
    </SafeArea>
  );
};
