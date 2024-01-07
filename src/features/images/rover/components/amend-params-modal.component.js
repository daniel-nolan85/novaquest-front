import { useState, useEffect, useContext } from 'react';
import { Modal, View, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import DatePicker from 'react-native-modern-datepicker';
import axios from 'axios';
import { NASA_API_KEY } from '@env';
import { ImagesContext } from '../../../../services/images/images.context';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  Option,
  OptionText,
  Title,
  AmendedOption,
} from '../styles/amend-params-modal.styles';
import Close from '../../../../../assets/svg/close.svg';
import Rover from '../../../../../assets/svg/rover.svg';
import Mars from '../../../../../assets/svg/mars.svg';
import Earth from '../../../../../assets/svg/earth.svg';
import { Text } from '../../../../components/typography/text.component';

const { Item } = Picker;

export const AmendParamsModal = ({ open, handleFilters }) => {
  const [showRoverPicker, setShowRoverPicker] = useState(false);
  const [showSolSlider, setShowSolSlider] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amendedRover, setAmendedRover] = useState('');
  const [marsDate, setMarsDate] = useState(null);
  const [earthDate, setEarthDate] = useState(null);
  const [landingDate, setLandingDate] = useState(null);
  const [maxSol, setMaxSol] = useState(null);
  const [maxEarth, setMaxEarth] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  const { selectedRover, setSelectedRover, dateType, setDateType, setDate } =
    useContext(ImagesContext);

  useEffect(() => {
    retrieveDates();
  }, [amendedRover]);

  const retrieveDates = async () => {
    await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/manifests/${amendedRover}?api_key=${NASA_API_KEY}`
      )
      .then((res) => {
        setLandingDate(res.data.photo_manifest.landing_date);
        setMaxSol(res.data.photo_manifest.max_sol);
        setMaxEarth(res.data.photo_manifest.max_date);
      });
  };

  const setNewParams = async () => {
    setSelectedRover(amendedRover);
    if (marsDate) {
      setDateType('sol');
      setDate(marsDate);
    }
    if (earthDate) {
      setDateType('earth_date');
      setDate(earthDate);
    }
    setAmendedRover('');
    setMarsDate(null);
    setEarthDate(null);
    handleFilters();
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleDateChange = (d) => {
    const selectedDate = d.replace(/\//g, '-');
    setEarthDate(selectedDate);
  };

  const handleTextInputChange = (text) => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= maxSol) {
      setMarsDate(numericValue);
    }
  };

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  return (
    <Modal animationType='slide' transparent={true} visible={open}>
      <ModalWrapper>
        <ModalView>
          <CloseIcon onPress={handleFilters}>
            <Close />
          </CloseIcon>
          <Title variant='title'>Refine Parameters</Title>
          <AmendedOption
            onPress={() => {
              setShowRoverPicker(!showRoverPicker);
              setShowSolSlider(false);
              setShowDatePicker(false);
            }}
          >
            <Rover width={48} height={48} />
            <Text variant='body'>{capitalizeFirstLetter(amendedRover)}</Text>
          </AmendedOption>
          {showRoverPicker && (
            <Picker
              style={{ width: 350 }}
              selectedValue={amendedRover}
              onValueChange={(rover) => {
                setShowRoverPicker(!showRoverPicker);
                setAmendedRover(rover);
                setMarsDate(null);
                setEarthDate(null);
              }}
            >
              <Item label='Curiosity' value='curiosity' />
              <Item label='Opportunity' value='opportunity' />
              <Item label='Perseverance' value='perseverance' />
              <Item label='Spirit' value='spirit' />
            </Picker>
          )}
          <AmendedOption
            onPress={() => {
              setShowSolSlider(!showSolSlider);
              setShowRoverPicker(false);
              setShowDatePicker(false);
              setIsEditable(false);
            }}
          >
            <Mars width={48} height={48} />
            <Text>{marsDate}</Text>
          </AmendedOption>
          {showSolSlider && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {isEditable ? (
                <TextInput
                  style={{
                    fontSize: 20,
                    marginTop: 10,
                    width: 50,
                    textAlign: 'center',
                    borderBottomWidth: 1,
                  }}
                  keyboardType='numeric'
                  value={marsDate}
                  onChangeText={handleTextInputChange}
                  onBlur={toggleEditable}
                  autoFocus
                />
              ) : (
                <TouchableOpacity onPress={toggleEditable}>
                  <Text
                    style={{
                      fontSize: 60,
                      color: '#999',
                      fontWeight: '400',
                    }}
                  >
                    {marsDate}
                  </Text>
                </TouchableOpacity>
              )}
              <Slider
                style={{ width: 350, height: 15 }}
                minimumValue={1}
                maximumValue={maxSol}
                step={1}
                value={marsDate}
                minimumTrackTintColor='#111'
                maximumTrackTintColor='#111'
                thumbTintColor='#009999'
                onValueChange={(v) => {
                  setEarthDate(null);
                  setMarsDate(v);
                }}
                onSlidingComplete={(v) => {
                  setShowSolSlider(!showSolSlider);
                }}
              />
            </View>
          )}
          <AmendedOption
            onPress={() => {
              setShowDatePicker(!showDatePicker);
              setShowSolSlider(false);
              setShowRoverPicker(false);
            }}
          >
            <Earth width={48} height={48} />
            <Text>{earthDate}</Text>
          </AmendedOption>
          {showDatePicker && (
            <DatePicker
              mode='calendar'
              selected={maxEarth}
              onDateChange={(d) => {
                handleDateChange(d);
                setMarsDate(null);
                setShowDatePicker(!showDatePicker);
              }}
              minimumDate={landingDate}
              maximumDate={maxEarth}
            />
          )}
          {amendedRover && (marsDate || earthDate) && (
            <Option onPress={setNewParams}>
              <OptionText>Search</OptionText>
            </Option>
          )}
        </ModalView>
      </ModalWrapper>
    </Modal>
  );
};
