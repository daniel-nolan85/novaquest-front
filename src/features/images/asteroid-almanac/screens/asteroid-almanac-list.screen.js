import { useState, useEffect, useContext, useCallback } from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { List } from 'react-native-paper';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DatePicker, { getToday } from 'react-native-modern-datepicker';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { NASA_API_KEY } from '@env';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';
import { AsteroidAlmanacInfoCard } from '../components/asteroid-almanac-info-card.component';
import Calendar from '../../../../../assets/svg/calendar.svg';
import Close from '../../../../../assets/svg/close.svg';
import { IconsWrapper } from '../../apod/styles/apod.styles';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
} from '../../apod/styles/apod-modal.styles';
import { ImagesContext } from '../../../../services/images/images.context';
import { AudioContext } from '../../../../services/audio/audio.context';
import { updateNumOfAsteroids } from '../../../../requests/user';
import {
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
import Size from '../../../../../assets/svg/size.svg';
import Performance from '../../../../../assets/svg/performance.svg';
import Radar from '../../../../../assets/svg/radar.svg';

const AsteroidList = styled.FlatList.attrs({
  contentContainerStyle: { padding: 16 },
})``;

const { width } = Dimensions.get('screen');

const { Accordion } = List;

export const AsteroidAlmanacListScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [asteroids, setAsteroids] = useState([]);
  const [open, setOpen] = useState(false);

  const { token, _id, role, numOfAsteroids } = useSelector(
    (state) => state.user
  );

  const { date, setDate } = useContext(ImagesContext);
  const { stopGameMusic } = useContext(AudioContext);

  useFocusEffect(
    useCallback(() => {
      stopGameMusic();
    }, [])
  );

  useEffect(() => {
    fetchAsteroids();
  }, [date]);

  const fetchAsteroids = async () => {
    setIsLoading(true);
    await axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&api_key=${NASA_API_KEY}`
      )
      .then((res) => {
        setIsLoading(false);
        setCount(res.data.element_count);
        const asteroidsArray = Object.entries(res.data.near_earth_objects);
        asteroidsArray.sort((a, b) => new Date(a[0]) - new Date(b[0]));
        setAsteroids(asteroidsArray);
        if (numOfAsteroids < 10) updateAsteroids();
      })
      .catch((err) => console.error(err));
  };

  const updateAsteroids = async () => {
    await updateNumOfAsteroids(token, _id, role)
      .then((res) => {
        if (res.data) navigate(res.data);
      })
      .catch((err) => console.error(err));
  };

  const handleCalendar = () => {
    setOpen(!open);
  };

  const handleDateChange = (d) => {
    const selectedDate = d.replace(/\//g, '-');
    setDate(selectedDate);
    setOpen(!open);
  };

  const { navigate, dispatch } = navigation;

  const [activeDate, setActiveDate] = useState(null);
  const [asteroidsInfo, setAsteroidsInfo] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [cardExpanded, setCardExpanded] = useState(false);
  const [sizeExpanded, setSizeExpanded] = useState(false);
  const [speedExpanded, setSpeedExpanded] = useState(false);
  const [proximityExpanded, setProximityExpanded] = useState(false);

  useEffect(() => {
    setCardExpanded(asteroidsInfo.map(() => false));
    setSizeExpanded(asteroidsInfo.map(() => false));
    setSpeedExpanded(asteroidsInfo.map(() => false));
    setProximityExpanded(asteroidsInfo.map(() => false));
  }, [asteroidsInfo]);

  const weekdays = asteroids.map(([dateString, asteroidsData]) => {
    const date = moment(dateString, 'YYYY-MM-DD').toDate();
    const weekday = moment(date).format('ddd');

    return {
      date,
      weekday,
      asteroidsData,
    };
  });

  useEffect(() => {
    if (weekdays && weekdays.length > 0) {
      setAsteroidsInfo(weekdays[0].asteroidsData);
      setActiveDate(weekdays[0].date);
    }
  }, [asteroids]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <IconsWrapper>
            <TouchableOpacity
              onPress={() => {
                dispatch(DrawerActions.openDrawer());
              }}
            >
              <Ionicons name='md-menu' size={30} color='#009999' />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCalendar}>
              <Calendar width={24} height={24} />
            </TouchableOpacity>
          </IconsWrapper>
          <View style={styles.container}>
            <View style={styles.picker}>
              <View style={[styles.itemRow, { paddingHorizontal: 16 }]}>
                {weekdays.map((item, dateIndex) => {
                  const isActive =
                    activeDate !== null &&
                    activeDate.toDateString() === item.date.toDateString();

                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => {
                        setAsteroidsInfo([...item.asteroidsData]);
                        setActiveDate(item.date);
                      }}
                    >
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: '#009999',
                            borderColor: '#009999',
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: '#fff' },
                          ]}
                        >
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: '#fff' },
                          ]}
                        >
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            </View>

            <View
              style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}
            >
              <View style={styles.placeholder}>
                <View style={styles.placeholderInset}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {asteroidsInfo.map((asteroid, index) => (
                      <View
                        style={{ margin: 10, position: 'relative' }}
                        key={index}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            const newExpandedStates = [...cardExpanded];
                            newExpandedStates[index] =
                              !newExpandedStates[index];
                            setCardExpanded(newExpandedStates);
                            setExpanded(!expanded);
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
                                  <Text>
                                    {asteroid.is_sentry_object ? 'Yes' : 'No'}
                                  </Text>
                                </StatsContainer>
                              </CardWrapper>
                              <View style={styles.iconContainer}>
                                <Ionicons
                                  name={
                                    expanded ? 'ios-arrow-up' : 'ios-arrow-down'
                                  }
                                  size={24}
                                  color='#fff'
                                />
                              </View>
                            </LinearGradient>
                          </AsteroidHeaderCard>
                        </TouchableOpacity>
                        {cardExpanded[index] && (
                          <ScrollView showsVerticalScrollIndicator={false}>
                            <AsteroidDetailsCard elevation={5}>
                              <Accordion
                                title='Estimated diameter'
                                left={(props) => (
                                  <Size {...props} height={24} width={24} />
                                )}
                                expanded={sizeExpanded[index]}
                                onPress={() => {
                                  const newExpandedStates = [...sizeExpanded];
                                  newExpandedStates[index] =
                                    !newExpandedStates[index];
                                  setSizeExpanded(newExpandedStates);
                                }}
                              >
                                <StatsWrapper>
                                  <StatsContainer>
                                    <StatsTitle variant='body'>
                                      Feet:
                                    </StatsTitle>
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
                                    <StatsTitle variant='body'>
                                      Meters:
                                    </StatsTitle>
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
                                    <StatsTitle variant='body'>
                                      Kilometers:
                                    </StatsTitle>
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
                                    <StatsTitle variant='body'>
                                      Miles:
                                    </StatsTitle>
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
                                  <Performance
                                    {...props}
                                    height={24}
                                    width={24}
                                  />
                                )}
                                expanded={speedExpanded[index]}
                                onPress={() => {
                                  const newExpandedStates = [...speedExpanded];
                                  newExpandedStates[index] =
                                    !newExpandedStates[index];
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
                                        asteroid.close_approach_data[0]
                                          .relative_velocity
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
                                        asteroid.close_approach_data[0]
                                          .relative_velocity.kilometers_per_hour
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
                                        asteroid.close_approach_data[0]
                                          .relative_velocity.miles_per_hour
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
                                  const newExpandedStates = [
                                    ...proximityExpanded,
                                  ];
                                  newExpandedStates[index] =
                                    !newExpandedStates[index];
                                  setProximityExpanded(newExpandedStates);
                                }}
                              >
                                <StatsWrapper>
                                  <StatsContainer>
                                    <StatsTitle variant='body'>
                                      Astronomical:
                                    </StatsTitle>
                                    <StatsItem variant='body'>
                                      {parseFloat(
                                        asteroid.close_approach_data[0]
                                          .miss_distance.astronomical
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
                                        asteroid.close_approach_data[0]
                                          .miss_distance.lunar
                                      ).toFixed(2)}{' '}
                                      LD
                                    </StatsItem>
                                  </StatsContainer>
                                  <StatsContainer>
                                    <StatsTitle variant='body'>
                                      Kilometers:
                                    </StatsTitle>
                                    <StatsItem variant='body'>
                                      {parseFloat(
                                        asteroid.close_approach_data[0]
                                          .miss_distance.kilometers
                                      ).toFixed(2)}{' '}
                                      km
                                    </StatsItem>
                                  </StatsContainer>
                                  <StatsContainer>
                                    <StatsTitle variant='body'>
                                      Miles:
                                    </StatsTitle>
                                    <StatsItem variant='body'>
                                      {parseFloat(
                                        asteroid.close_approach_data[0]
                                          .miss_distance.miles
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
                </View>
              </View>
            </View>
          </View>
          <Modal animationType='slide' transparent={true} visible={open}>
            <ModalWrapper>
              <ModalView>
                <CloseIcon onPress={handleCalendar}>
                  <Close />
                </CloseIcon>
                <DatePicker
                  mode='calendar'
                  selected={date}
                  onDateChange={handleDateChange}
                  maximumDate={getToday()}
                  style={{ marginTop: 20 }}
                />
              </ModalView>
            </ModalWrapper>
          </Modal>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  /** Item */
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  itemWeekday: {
    fontSize: 12,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderColor: '#e5e7eb',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
