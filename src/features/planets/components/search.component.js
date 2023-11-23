import { useState, useContext } from 'react';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';
import { PlanetsContext } from '../../../services/planets/planets.context';

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = () => {
  const { keyword, search, setError } = useContext(PlanetsContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  const handleClear = () => {
    setError(null);
    setSearchKeyword('');
    search('');
  };

  return (
    <SearchContainer>
      <Searchbar
        placeholder='Search planets by name or type...'
        value={searchKeyword}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onClearIconPress={handleClear}
      />
    </SearchContainer>
  );
};
