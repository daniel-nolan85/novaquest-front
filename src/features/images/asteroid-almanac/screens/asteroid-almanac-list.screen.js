import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { NASA_API_KEY } from '@env';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';
import { AsteroidAlmanacInfoCard } from '../components/asteroid-almanac-info-card.component';

const AsteroidList = styled.FlatList.attrs({
  contentContainerStyle: { padding: 16 },
})``;

export const AsteroidAlmanacListScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [asteroids, setAsteroids] = useState([]);

  useEffect(() => {
    fetchAsteroids();
  }, []);

  const fetchAsteroids = async () => {
    console.log('fetching');
    setIsLoading(true);
    await axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&api_key=${NASA_API_KEY}`
      )
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setCount(res.data.element_count);
        const asteroidsArray = Object.entries(res.data.near_earth_objects);
        asteroidsArray.sort((a, b) => new Date(a[0]) - new Date(b[0]));
        setAsteroids(asteroidsArray);
      });
  };

  const { navigate } = navigation;
  const { date } = route.params;

  return (
    <SafeArea>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* {!error ? ( */}
          <AsteroidList
            data={asteroids}
            renderItem={({ item }) => {
              const [date, asteroids] = item;
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigate('AsteroidsDetails', {
                      asteroids,
                    });
                  }}
                >
                  <Spacer position='bottom' size='large'>
                    <AsteroidAlmanacInfoCard date={date} />
                  </Spacer>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.name}
            ListFooterComponent={<Spacer position='bottom' size='xxLarge' />}
          />
          {/* ) : (
            <Spacer position='left' size='xLarge'>
              <Text variant='error'>{error}</Text>
            </Spacer>
          )} */}
        </>
      )}
    </SafeArea>
  );
};
