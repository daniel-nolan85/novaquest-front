import { useState } from 'react';
import { Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import DatePicker, { getToday } from 'react-native-modern-datepicker';
import { useSelector } from 'react-redux';
import {
  Header,
  SearchContainer,
  CalendarIcon,
  ModalWrapper,
  ModalView,
  CloseIcon,
  Title,
  OptionContainer,
  Option,
  GradientBackground,
  OptionText,
} from '../styles/signals-header.styles';
import CalendarWhite from '../../../../assets/svg/calendar-white.svg';
import Close from '../../../../assets/svg/close.svg';
import {
  filterSignalsByDate,
  filterSignalsByQuery,
} from '../../../requests/signals';

export const SignalsHeader = ({ setFilteredSignals }) => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { token, _id, role, createdAt } = useSelector((state) => state.user);

  const handleCalendar = () => {
    setStartDate(null);
    setEndDate(null);
    setOpen(!open);
  };

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
    setShowStartPicker(false);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
    setShowEndPicker(false);
  };

  const setDates = async () => {
    setIsLoading(true);
    await filterSignalsByDate(token, _id, role, startDate, endDate)
      .then((res) => {
        if (res.data !== null) {
          setFilteredSignals(res.data.notifications);
        } else {
          setFilteredSignals([]);
        }
        setOpen(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setOpen(false);
        setIsLoading(false);
      });
  };

  const handleSearch = async (query) => {
    await filterSignalsByQuery(token, _id, role, query)
      .then((res) => {
        setFilteredSignals(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Header>
      <SearchContainer>
        <Searchbar
          placeholder='Search signals...'
          onChangeText={(query) => {
            setSearchQuery(query);
            handleSearch(query);
          }}
          value={searchQuery}
        />
      </SearchContainer>
      <TouchableOpacity onPress={handleCalendar}>
        <CalendarIcon>
          <CalendarWhite width={32} height={32} />
        </CalendarIcon>
      </TouchableOpacity>
      <Modal animationType='slide' transparent={true} visible={open}>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={handleCalendar}>
              <Close />
            </CloseIcon>
            {!showStartPicker && !showEndPicker && (
              <>
                <Title variant='title'>Filter signals by date</Title>
                <OptionContainer>
                  <Option onPress={() => setShowStartPicker(true)}>
                    <GradientBackground>
                      <OptionText variant='body'>
                        {startDate ? startDate : 'Set Start Date'}
                      </OptionText>
                    </GradientBackground>
                  </Option>
                  <Option
                    onPress={() => setShowEndPicker(true)}
                    disabled={!startDate}
                  >
                    <GradientBackground>
                      <OptionText variant='body'>
                        {endDate ? endDate : 'Set End Date'}
                      </OptionText>
                    </GradientBackground>
                  </Option>
                  <Option onPress={setDates} disabled={!startDate || !endDate}>
                    <GradientBackground>
                      {isLoading ? (
                        <ActivityIndicator size='large' color='#fff' />
                      ) : (
                        <>
                          <OptionText variant='body'>Go</OptionText>
                        </>
                      )}
                    </GradientBackground>
                  </Option>
                </OptionContainer>
              </>
            )}
            {showStartPicker && (
              <DatePicker
                mode='calendar'
                selected={startDate}
                onDateChange={handleStartDateChange}
                minimumDate={createdAt}
                maximumDate={getToday()}
              />
            )}
            {showEndPicker && (
              <DatePicker
                mode='calendar'
                selected={endDate}
                onDateChange={handleEndDateChange}
                minimumDate={startDate}
                maximumDate={getToday()}
              />
            )}
          </ModalView>
        </ModalWrapper>
      </Modal>
    </Header>
  );
};
