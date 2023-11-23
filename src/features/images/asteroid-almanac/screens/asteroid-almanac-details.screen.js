import { useState, useEffect } from 'react';
import { List } from 'react-native-paper';
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { Text } from '../../../../components/typography/text.component';
import {
  AsteroidCard,
  AsteroidHeaderCard,
  AsteroidDetailsCard,
} from '../styles/asteroid-almanac-info-card.styles';
import {
  CardWrapper,
  StatsWrapper,
  StatsContainer,
  StatsTitle,
  StatsItem,
} from '../styles/asteroid-almanac-details.styles';
import Size from '../../../../../assets/size.svg';
import Performance from '../../../../../assets/performance.svg';
import Radar from '../../../../../assets/radar.svg';

const { Accordion, Icon } = List;

export const AsteroidAlmanacDetailsScreen = ({ route }) => {
  const [cardExpanded, setCardExpanded] = useState(false);
  const [sizeExpanded, setSizeExpanded] = useState(false);
  const [speedExpanded, setSpeedExpanded] = useState(false);
  const [proximityExpanded, setProximityExpanded] = useState(false);

  useEffect(() => {
    setCardExpanded(asteroids.map(() => false));
    setSizeExpanded(asteroids.map(() => false));
    setSpeedExpanded(asteroids.map(() => false));
    setProximityExpanded(asteroids.map(() => false));
  }, [asteroids]);

  const { asteroids } = route.params;

  return (
    <ImageBackground
      source={{
        uri: 'https://res.cloudinary.com/daufzqlld/image/upload/v1700325802/asteroids_oknjzk.gif',
      }}
    >
      <SafeArea>
        <ScrollView>
          {asteroids.map((asteroid, index) => (
            <View style={{ margin: 10, position: 'relative' }}>
              <TouchableOpacity
                onPress={() => {
                  const newExpandedStates = [...cardExpanded];
                  newExpandedStates[index] = !newExpandedStates[index];
                  setCardExpanded(newExpandedStates);
                }}
              >
                <AsteroidHeaderCard elevation={5}>
                  <LinearGradient
                    colors={['#009999', '#00cccc']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ borderRadius: 8, padding: 20 }}
                  >
                    <Text
                      variant='title'
                      style={{ color: '#fff', fontSize: 18 }}
                    >
                      {asteroid.name}
                    </Text>
                    <CardWrapper>
                      <StatsContainer>
                        <Text>Absolute magnitude:</Text>
                        <Text>{asteroid.absolute_magnitude_h}</Text>
                      </StatsContainer>
                      <StatsContainer>
                        <Text>Potentially hazardous:</Text>
                        <Text>
                          {asteroid.is_potentially_hazardous_asteroid
                            ? 'Yes'
                            : 'No'}
                        </Text>
                      </StatsContainer>
                      <StatsContainer>
                        <Text>Sentry object:</Text>
                        <Text>{asteroid.is_sentry_object ? 'Yes' : 'No'}</Text>
                      </StatsContainer>
                    </CardWrapper>
                  </LinearGradient>
                </AsteroidHeaderCard>
              </TouchableOpacity>
              {cardExpanded[index] && (
                <ScrollView>
                  <AsteroidDetailsCard elevation={5}>
                    <Accordion
                      title='Estimated diameter'
                      left={(props) => (
                        <Size {...props} height={24} width={24} />
                      )}
                      expanded={sizeExpanded[index]}
                      onPress={() => {
                        const newExpandedStates = [...sizeExpanded];
                        newExpandedStates[index] = !newExpandedStates[index];
                        setSizeExpanded(newExpandedStates);
                      }}
                    >
                      <StatsWrapper>
                        <StatsContainer>
                          <StatsTitle variant='body'>Feet:</StatsTitle>
                          <StatsItem variant='body'>
                            {asteroid.estimated_diameter.feet.estimated_diameter_min.toFixed(
                              2
                            )}{' '}
                            -
                            {asteroid.estimated_diameter.feet.estimated_diameter_max.toFixed(
                              2
                            )}{' '}
                            ft
                          </StatsItem>
                        </StatsContainer>
                        <StatsContainer>
                          <StatsTitle variant='body'>Meters:</StatsTitle>
                          <StatsItem variant='body'>
                            {asteroid.estimated_diameter.meters.estimated_diameter_min.toFixed(
                              2
                            )}{' '}
                            -
                            {asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(
                              2
                            )}{' '}
                            m
                          </StatsItem>
                        </StatsContainer>
                        <StatsContainer>
                          <StatsTitle variant='body'>Kilometers:</StatsTitle>
                          <StatsItem variant='body'>
                            {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                              2
                            )}{' '}
                            -
                            {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                              2
                            )}{' '}
                            km
                          </StatsItem>
                        </StatsContainer>
                        <StatsContainer>
                          <StatsTitle variant='body'>Miles:</StatsTitle>
                          <StatsItem variant='body'>
                            {asteroid.estimated_diameter.miles.estimated_diameter_min.toFixed(
                              2
                            )}{' '}
                            -
                            {asteroid.estimated_diameter.miles.estimated_diameter_max.toFixed(
                              2
                            )}{' '}
                            mi
                          </StatsItem>
                        </StatsContainer>
                      </StatsWrapper>
                    </Accordion>
                    <Accordion
                      title='Relative velocity'
                      left={(props) => (
                        <Performance {...props} height={24} width={24} />
                      )}
                      expanded={speedExpanded[index]}
                      onPress={() => {
                        const newExpandedStates = [...speedExpanded];
                        newExpandedStates[index] = !newExpandedStates[index];
                        setSpeedExpanded(newExpandedStates);
                      }}
                    >
                      <StatsWrapper>
                        <StatsContainer>
                          <StatsTitle variant='body'>
                            Kilometers per second:
                          </StatsTitle>
                          <StatsItem variant='body'>
                            {parseFloat(
                              asteroid.close_approach_data[0].relative_velocity
                                .kilometers_per_second
                            ).toFixed(2)}{' '}
                            kps
                          </StatsItem>
                        </StatsContainer>
                        <StatsContainer>
                          <StatsTitle variant='body'>
                            Kilometers per hour:
                          </StatsTitle>
                          <StatsItem variant='body'>
                            {parseFloat(
                              asteroid.close_approach_data[0].relative_velocity
                                .kilometers_per_hour
                            ).toFixed(2)}{' '}
                            kph
                          </StatsItem>
                        </StatsContainer>
                        <StatsContainer>
                          <StatsTitle variant='body'>
                            Miles per hour:
                          </StatsTitle>
                          <StatsItem variant='body'>
                            {parseFloat(
                              asteroid.close_approach_data[0].relative_velocity
                                .miles_per_hour
                            ).toFixed(2)}{' '}
                            mph
                          </StatsItem>
                        </StatsContainer>
                      </StatsWrapper>
                    </Accordion>

                    <Accordion
                      title='Proximity'
                      left={(props) => (
                        <Radar {...props} height={24} width={24} />
                      )}
                      expanded={proximityExpanded[index]}
                      onPress={() => {
                        const newExpandedStates = [...proximityExpanded];
                        newExpandedStates[index] = !newExpandedStates[index];
                        setProximityExpanded(newExpandedStates);
                      }}
                    >
                      <StatsWrapper>
                        <StatsContainer>
                          <StatsTitle variant='body'>Astronomical:</StatsTitle>
                          <StatsItem variant='body'>
                            {parseFloat(
                              asteroid.close_approach_data[0].miss_distance
                                .astronomical
                            ).toFixed(2)}{' '}
                            AU
                          </StatsItem>
                        </StatsContainer>
                        <StatsContainer>
                          <StatsTitle variant='body'>
                            Lunar distance:
                          </StatsTitle>
                          <StatsItem variant='body'>
                            {parseFloat(
                              asteroid.close_approach_data[0].miss_distance
                                .lunar
                            ).toFixed(2)}{' '}
                            LD
                          </StatsItem>
                        </StatsContainer>
                        <StatsContainer>
                          <StatsTitle variant='body'>Kilometers:</StatsTitle>
                          <StatsItem variant='body'>
                            {parseFloat(
                              asteroid.close_approach_data[0].miss_distance
                                .kilometers
                            ).toFixed(2)}{' '}
                            km
                          </StatsItem>
                        </StatsContainer>
                        <StatsContainer>
                          <StatsTitle variant='body'>Miles:</StatsTitle>
                          <StatsItem variant='body'>
                            {parseFloat(
                              asteroid.close_approach_data[0].miss_distance
                                .miles
                            ).toFixed(2)}{' '}
                            mi
                          </StatsItem>
                        </StatsContainer>
                      </StatsWrapper>
                    </Accordion>
                  </AsteroidDetailsCard>
                </ScrollView>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeArea>
    </ImageBackground>
  );
};
