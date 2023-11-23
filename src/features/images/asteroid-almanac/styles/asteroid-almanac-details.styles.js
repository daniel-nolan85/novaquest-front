import styled from 'styled-components/native';
import { Text } from '../../../../components/typography/text.component';

export const CardWrapper = styled.View`
  padding: 16px 16px 0 16px;
`;

export const StatsWrapper = styled.View`
  padding: 16px 16px 0 16px;
`;

export const StatsContainer = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 16px;
`;

export const StatsTitle = styled(Text)`
  width: 40%;
`;

export const StatsItem = styled(Text)`
  width: 40%;
`;
