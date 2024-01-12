import { FlatList } from 'react-native';
import moment from 'moment';
import {
  LeaderboardWrapper,
  LeaderboardHeader,
  Player,
  Position,
  PlayerImage,
  PlayerInfo,
  Name,
  Score,
  Timestamp,
} from '../styles/leaderboard-list.styles';
import defaultProfile from '../../../../../assets/img/defaultProfile.png';

export const LeaderboardList = ({ navigate, topScores }) => {
  const renderItem = ({ item, index }) => {
    let positionText = (index + 1).toString();
    if (index > 0 && item.score === topScores[index - 1].score) {
      positionText = '=';
    }

    return (
      <LeaderboardWrapper key={item._id}>
        <LeaderboardHeader>
          <Player
            onPress={() => navigate('UserProfile', { userId: item.player._id })}
          >
            <Position varinat='title'>{positionText}</Position>
            <PlayerImage
              source={
                item.player.profileImage
                  ? item.player.profileImage
                  : defaultProfile
              }
            />
            <PlayerInfo>
              <Name variant='title'>
                {item.player.rank} {item.player.name}
              </Name>
              <Score variant='title'>{item.score}</Score>
            </PlayerInfo>
          </Player>
        </LeaderboardHeader>
        <Timestamp variant='body'>{moment(item.createdAt).fromNow()}</Timestamp>
      </LeaderboardWrapper>
    );
  };

  return (
    <FlatList
      data={topScores}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
    />
  );
};
