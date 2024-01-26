import { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { NASA_API_KEY } from '@env';
import DatePicker, { getToday } from 'react-native-modern-datepicker';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Close from '../../../../../assets/svg/close.svg';
import Calendar from '../../../../../assets/svg/calendar.svg';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';
import { ApodInfoCard } from '../components/apod-card.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
} from '../styles/apod-modal.styles';
import { ApodSafeArea, IconsWrapper } from '../styles/apod.styles';
import { updateNumOfApods } from '../../../../requests/user';
import { AudioContext } from '../../../../services/audio/audio.context';

export const ApodScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(getToday());
  const [image, setImage] = useState('');
  const [explanation, setExplanation] = useState('');
  const [title, setTitle] = useState('');

  const { token, _id, role, numOfApods } = useSelector((state) => state.user);

  const isFirstRun = useRef(true);

  const { navigate, dispatch } = navigation;

  const { stopGameMusic } = useContext(AudioContext);

  useFocusEffect(
    useCallback(() => {
      stopGameMusic();
    }, [])
  );

  useEffect(() => {
    fetchApod();
    if (numOfApods < 300) {
      updateApods();
    }
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      fetchApodByDate();
      if (numOfApods < 300) {
        updateApods();
      }
    }
  }, [date]);

  const fetchApod = async () => {
    setIsLoading(true);
    await axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
      .then((res) => {
        setIsLoading(false);
        setImage(res.data.url);
        setExplanation(res.data.explanation);
        setTitle(res.data.title);
      });
  };

  const fetchApodByDate = async () => {
    setIsLoading(true);
    await axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`
      )
      .then((res) => {
        setIsLoading(false);
        setImage(res.data.url);
        setExplanation(res.data.explanation);
        setTitle(res.data.title);
      });
  };

  const updateApods = async () => {
    await updateNumOfApods(token, _id, role)
      .then((res) => {
        if (res.data.achievement) navigate(res.data.achievement);
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

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ApodSafeArea>
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
                  minimumDate='1995-06-17'
                  maximumDate={getToday()}
                  style={{ marginTop: 20 }}
                />
              </ModalView>
            </ModalWrapper>
          </Modal>
          <ApodInfoCard image={image} title={title} explanation={explanation} />
        </ApodSafeArea>
      )}
    </>
  );
};
