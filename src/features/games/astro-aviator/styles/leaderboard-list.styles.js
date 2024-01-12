import styled from 'styled-components/native';
import { Text } from '../../../../components/typography/text.component';

export const LeaderboardWrapper = styled.View`
  background-color: #fff;
  flex-direction: column;
  width: 100%;
  border-radius: 12px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 4px;
  }
  margin: 6px 0;
  padding: 12px 0;
`;

export const LeaderboardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Player = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 0 8px;
`;

export const Position = styled(Text)`
  margin-right: 5px;
  font-size: 32px;
  color: #009999;
  width: 55px;
`;

export const PlayerImage = styled.Image`
  height: 52px;
  width: 52px;
  border-radius: 25px;
`;

export const PlayerInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 220px;
`;

export const Name = styled(Text)`
  font-size: 15px;
  margin-left: 10px;
  width: 150px;
`;

export const Score = styled(Text)`
  font-size: 24px;
  color: #009999;
`;

export const Timestamp = styled(Text)`
  margin-left: 130px;
  font-size: 14px;
  color: #009999;
`;
