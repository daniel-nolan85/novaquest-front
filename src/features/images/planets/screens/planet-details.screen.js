import { useState, useCallback } from 'react';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { PlanetInfoCard } from '../components/planet-info-card.component';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import {
  Description,
  StatsWrapper,
  StatsContainer,
  StatsTitle,
  StatsItem,
} from '../styles/planet-details.styles';
import { updatePlanetsViewed } from '../../../../requests/user';

const { Accordion, Icon } = List;

export const PlanetDetailsScreen = ({ route }) => {
  const [descExpanded, setDescExpanded] = useState(false);
  const [statsExpanded, setStatsExpanded] = useState(false);

  const { token, _id, role } = useSelector((state) => state.user);

  useFocusEffect(
    useCallback(() => {
      updateViewedPlanets();
    }, [])
  );

  const updateViewedPlanets = async () => {
    await updatePlanetsViewed(token, _id, role, name)
      .then((res) => {
        if (res.data.achievement) navigate(res.data.achievement);
      })
      .catch((err) => console.error(err));
  };

  const { navigate, planet } = route.params;
  const {
    name,
    description,
    avgDistFromSun,
    diameter,
    dayDuration,
    yearDuration,
    gravity,
    avgTemp,
    atmosphere,
    yearDiscovered,
    numMoons,
  } = planet;

  return (
    <SafeArea>
      <PlanetInfoCard planet={planet} />
      <ScrollView>
        <Accordion
          title='Description'
          left={(props) => <Icon {...props} icon='book-open-variant' />}
          expanded={descExpanded}
          onPress={() => setDescExpanded(!descExpanded)}
        >
          <Description variant='body'>{description}</Description>
        </Accordion>
        <Accordion
          title='Stats'
          left={(props) => <Icon {...props} icon='information' />}
          expanded={statsExpanded}
          onPress={() => setStatsExpanded(!statsExpanded)}
        >
          <StatsWrapper>
            {avgDistFromSun && (
              <StatsContainer>
                <StatsTitle variant='body'>
                  Average distance from the sun:
                </StatsTitle>
                <StatsItem variant='body'>{avgDistFromSun[0]}</StatsItem>
              </StatsContainer>
            )}
            {diameter && (
              <StatsContainer>
                <StatsTitle variant='body'>Diameter:</StatsTitle>
                <StatsItem variant='body'>{diameter[0]}</StatsItem>
              </StatsContainer>
            )}
            {dayDuration && (
              <StatsContainer>
                <StatsTitle variant='body'>
                  Time to rotate on axis (a day):
                </StatsTitle>
                <StatsItem variant='body'>{dayDuration}</StatsItem>
              </StatsContainer>
            )}
            {yearDuration && (
              <StatsContainer>
                <StatsTitle variant='body'>
                  Time to orbit the sun (a year):
                </StatsTitle>
                <StatsItem variant='body'>{yearDuration}</StatsItem>
              </StatsContainer>
            )}
            {gravity && (
              <StatsContainer>
                <StatsTitle variant='body'>Gravity:</StatsTitle>
                <StatsItem variant='body'>{gravity}</StatsItem>
              </StatsContainer>
            )}
            {avgTemp && (
              <StatsContainer>
                <StatsTitle variant='body'>Average temperature:</StatsTitle>
                <StatsItem variant='body'>{avgTemp[0]}</StatsItem>
              </StatsContainer>
            )}
            {atmosphere && (
              <StatsContainer>
                <StatsTitle variant='body'>Contents of atmosphere:</StatsTitle>
                <StatsItem variant='body'>{atmosphere}</StatsItem>
              </StatsContainer>
            )}
            {yearDiscovered && (
              <StatsContainer>
                <StatsTitle variant='body'>Year of discovery:</StatsTitle>
                <StatsItem variant='body'>{yearDiscovered}</StatsItem>
              </StatsContainer>
            )}
            {numMoons && (
              <StatsContainer>
                <StatsTitle variant='body'>Number of known moons:</StatsTitle>
                <StatsItem variant='body'>{numMoons}</StatsItem>
              </StatsContainer>
            )}
          </StatsWrapper>
        </Accordion>
      </ScrollView>
    </SafeArea>
  );
};
