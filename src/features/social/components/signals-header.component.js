import { useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import DatePicker, { getToday } from 'react-native-modern-datepicker';
import { useSelector } from 'react-redux';
import {
  Header,
  SearchContainer,
  CalendarIcon,
  ModalWrapper,
  ModalView,
  Option,
  OptionText,
} from '../styles/signals-header.styles';
import CalendarWhite from '../../../../assets/svg/calendar-white.svg';

export const SignalsHeader = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(getToday());

  const { createdAt } = useSelector((state) => state.user);

  const handleCalendar = () => {
    setOpen(!open);
  };

  const handleDateChange = (d) => {
    const selectedDate = d.replace(/\//g, '-');
    setDate(selectedDate);
    setOpen(!open);
  };

  console.log('date => ', date);

  return (
    <Header>
      <SearchContainer>
        <Searchbar placeholder='Search signals...' />
      </SearchContainer>
      <TouchableOpacity onPress={handleCalendar}>
        <CalendarIcon>
          <CalendarWhite width={32} height={32} />
        </CalendarIcon>
      </TouchableOpacity>
      <Modal animationType='slide' transparent={true} visible={open}>
        <ModalWrapper>
          <ModalView>
            <DatePicker
              mode='calendar'
              selected={date}
              onDateChange={handleDateChange}
              minimumDate={createdAt}
              maximumDate={getToday()}
            />
            <Option onPress={handleCalendar}>
              <OptionText>Close</OptionText>
            </Option>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </Header>
  );
};
