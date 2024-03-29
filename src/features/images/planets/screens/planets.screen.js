import { useContext, useCallback } from 'react';
import styled from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { PlanetInfoCard } from '../components/planet-info-card.component';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { PlanetsContext } from '../../../../services/planets/planets.context';
import { AudioContext } from '../../../../services/audio/audio.context';
import { Text } from '../../../../components/typography/text.component';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';
import { Search } from '../components/search.component';
import { SafeArea } from '../../../../components/utils/safe-area.component';

const PlanetList = styled.FlatList.attrs({
  contentContainerStyle: { padding: 16 },
})``;

export const PlanetsScreen = ({ navigation }) => {
  const { planets, isLoading, error } = useContext(PlanetsContext);
  const { stopGameMusic } = useContext(AudioContext);

  useFocusEffect(
    useCallback(() => {
      stopGameMusic();
    }, [])
  );

  const { navigate } = navigation;
  return (
    <SafeArea>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Search />
          {!error ? (
            <PlanetList
              data={planets}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigate('PlanetDetails', {
                        planet: item,
                        navigate,
                      });
                    }}
                  >
                    <Spacer position='bottom' size='large'>
                      <PlanetInfoCard planet={item} />
                    </Spacer>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.name}
              ListFooterComponent={<Spacer position='bottom' size='xxLarge' />}
            />
          ) : (
            <Spacer position='left' size='xLarge'>
              <Text variant='error'>{error}</Text>
            </Spacer>
          )}
        </>
      )}
    </SafeArea>
  );
};
