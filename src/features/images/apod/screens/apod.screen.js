import { useState, useEffect, useRef } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
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

export const ApodScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(getToday());
  const [image, setImage] = useState('');
  const [explanation, setExplanation] = useState('');
  const [title, setTitle] = useState('');

  const isFirstRun = useRef(true);

  useEffect(() => {
    fetchApod();
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      fetchApodByDate();
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
                navigation.dispatch(DrawerActions.openDrawer());
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
