import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Header, SearchContainer } from '../styles/leaderboard-header.styles';
import { filterPlayersByQuery } from '../../../../requests/games';

export const LeaderboardHeader = ({ setTopScores }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { token, role } = useSelector((state) => state.user);

  const handleSearch = async (query) => {
    await filterPlayersByQuery(token, role, query)
      .then((res) => {
        setTopScores(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Header>
      <SearchContainer>
        <Searchbar
          placeholder='Search players...'
          onChangeText={(query) => {
            setSearchQuery(query);
            handleSearch(query);
          }}
          value={searchQuery}
        />
      </SearchContainer>
    </Header>
  );
};
