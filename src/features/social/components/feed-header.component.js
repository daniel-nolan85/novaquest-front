import { TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import {
  Header,
  SearchContainer,
  SignalsIcon,
} from '../styles/feed-header.styles';
import Signals from '../../../../assets/svg/signals.svg';

export const FeedHeader = ({ navigate }) => (
  <Header>
    <SearchContainer>
      <Searchbar placeholder='Search posts...' />
    </SearchContainer>
    <TouchableOpacity onPress={() => navigate('Signals')}>
      <SignalsIcon>
        <Signals width={32} height={32} />
      </SignalsIcon>
    </TouchableOpacity>
  </Header>
);
