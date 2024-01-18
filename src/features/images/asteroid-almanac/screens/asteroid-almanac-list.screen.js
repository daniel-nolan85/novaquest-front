import { useState, useEffect, useContext } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DatePicker, { getToday } from 'react-native-modern-datepicker';
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
import { updateNumOfAsteroids } from '../../../../requests/user';

const AsteroidList = styled.FlatList.attrs({
  contentContainerStyle: { padding: 16 },
})``;

export const AsteroidAlmanacListScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [asteroids, setAsteroids] = useState([]);
  const [open, setOpen] = useState(false);

  const { token, _id, numOfAsteroids } = useSelector((state) => state.user);

  const { date, setDate } = useContext(ImagesContext);

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
    await updateNumOfAsteroids(token, _id)
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

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SafeArea>
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
          <AsteroidList
            data={asteroids}
            renderItem={({ item }) => {
              const [date, asteroids] = item;
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigate('AsteroidAlmanacDetails', {
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
        </SafeArea>
      )}
    </>
  );
};
