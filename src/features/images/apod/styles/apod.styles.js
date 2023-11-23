import styled from 'styled-components/native';
import { SafeArea } from '../../../../components/utils/safe-area.component';

export const ApodSafeArea = styled(SafeArea)`
  flex: 1;
`;

export const IconsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[2]};
`;
