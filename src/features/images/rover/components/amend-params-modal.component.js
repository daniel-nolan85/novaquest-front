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
  Option,
  OptionText,
  AmendedOption,
} from '../styles/amend-params-modal.styles';
import Rover from '../../../../../assets/rover.svg';
import Camera from '../../../../../assets/camera.svg';
import Mars from '../../../../../assets/mars.svg';
import Earth from '../../../../../assets/earth.svg';
import { Text } from '../../../../components/typography/text.component';

export const AmendParamsModal = ({ open, handleFilters }) => {
  const [showRoverPicker, setShowRoverPicker] = useState(false);
  const [showCameraPicker, setShowCameraPicker] = useState(false);
  const [showSolSlider, setShowSolSlider] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amendedRover, setAmendedRover] = useState('');
  const [amendedCamera, setAmendedCamera] = useState({
    code: '',
    fullName: '',
  });
  const [marsDate, setMarsDate] = useState(null);
  const [earthDate, setEarthDate] = useState(null);
  const [landingDate, setLandingDate] = useState(null);
  const [maxSol, setMaxSol] = useState(null);
  const [maxEarth, setMaxEarth] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  const {
    setSelectedRover,
    setCamera,
    setDateType,
    setDate,
    setCameraFullName,
  } = useContext(ImagesContext);

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

  const setNewParams = () => {
    setSelectedRover(amendedRover);
    setCamera(amendedCamera.code);
    setCameraFullName(amendedCamera.fullName);
    if (marsDate) {
      setDateType('sol');
      setDate(marsDate);
    }
    if (earthDate) {
      setDateType('earth_date');
      setDate(earthDate);
    }
    setAmendedRover('');
    setAmendedCamera({
      code: '',
      fullName: '',
    });
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

  const getCameraOptions = (rover) => {
    switch (rover) {
      case 'curiosity':
        return [
          { code: 'fhaz', fullName: 'Front Hazard Avoidance Camera' },
          { code: 'rhaz', fullName: 'Rear Hazard Avoidance Camera' },
          { code: 'mast', fullName: 'Mast Camera' },
          { code: 'chemcam', fullName: 'Chemistry and Camera Complex' },
          { code: 'mahli', fullName: 'Mars Hand Lens Imager' },
          { code: 'mardi', fullName: 'Mars Descent Imager' },
          { code: 'navcam', fullName: 'Navigation Camera' },
        ];
      case 'opportunity':
        return [
          { code: 'fhaz', fullName: 'Front Hazard Avoidance Camera' },
          { code: 'rhaz', fullName: 'Rear Hazard Avoidance Camera' },
          { code: 'navcam', fullName: 'Navigation Camera' },
          { code: 'pancam', fullName: 'Panoramic Camera' },
          {
            code: 'minites',
            fullName: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
          },
        ];
      case 'perseverance':
        return [
          { code: 'edl_rucam', fullName: 'Rover Up-Look Camera' },
          { code: 'edl_rdcam', fullName: 'Rover Down-Look Camera' },
          { code: 'edl_ddcam', fullName: 'Descent Stage Down-Look Camera' },
          { code: 'edl_pucam1', fullName: 'Parachute Up-Look Camera A' },
          { code: 'edl_pucam2', fullName: 'Parachute Up-Look Camera B' },
          { code: 'navcam_left', fullName: 'Navigation Camera - Left' },
          { code: 'navcam_right', fullName: 'Navigation Camera - Right' },
          { code: 'mcz_left', fullName: 'Mast Camera Zoom - Left' },
          { code: 'mcz_right', fullName: 'Mast Camera Zoom - Right' },
          {
            code: 'front_hazcam_left_a',
            fullName: 'Front Hazard Avoidance Camera - Left',
          },
          {
            code: 'front_hazcam_right_a',
            fullName: 'Front Hazard Avoidance Camera - Right',
          },
          {
            code: 'rear_hazcam_left',
            fullName: 'Rear Hazard Avoidance Camera - Left',
          },
          {
            code: 'rear_hazcam_right',
            fullName: 'Rear Hazard Avoidance Camera - Right',
          },
          {
            code: 'skycam',
            fullName: 'MEDA Skycam',
          },
          {
            code: 'sherloc_watson',
            fullName: 'Sherlock Watson Camera',
          },
        ];
      case 'spirit':
        return [
          { code: 'fhaz', fullName: 'Front Hazard Avoidance Camera' },
          { code: 'rhaz', fullName: 'Rear Hazard Avoidance Camera' },
          { code: 'navcam', fullName: 'Navigation Camera' },
          { code: 'pancam', fullName: 'Panoramic Camera' },
          {
            code: 'minites',
            fullName: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
          },
        ];
      default:
        return [];
    }
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
          <AmendedOption
            onPress={() => {
              setShowRoverPicker(!showRoverPicker);
              setShowCameraPicker(false);
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
                setAmendedCamera({ code: null, fullName: null });
                setMarsDate(null);
                setEarthDate(null);
              }}
            >
              <Picker.Item label='Curiosity' value='curiosity' />
              <Picker.Item label='Opportunity' value='opportunity' />
              <Picker.Item label='Perseverance' value='perseverance' />
              <Picker.Item label='Spirit' value='spirit' />
            </Picker>
          )}
          {amendedRover && (
            <>
              <AmendedOption
                onPress={() => {
                  setShowCameraPicker(!showCameraPicker);
                  setShowRoverPicker(false);
                  setShowSolSlider(false);
                  setShowDatePicker(false);
                }}
              >
                <Camera width={48} height={48} />
                <Text>{amendedCamera.fullName}</Text>
              </AmendedOption>
              {showCameraPicker && (
                <Picker
                  style={{ width: 350 }}
                  selectedValue={amendedCamera.code}
                  onValueChange={(cameraCode) => {
                    const selectedCameraOption = getCameraOptions(
                      amendedRover
                    ).find((camera) => camera.code === cameraCode);
                    setAmendedCamera(selectedCameraOption);
                    setShowCameraPicker(!showCameraPicker);
                  }}
                >
                  {getCameraOptions(amendedRover).map((cameraOption, index) => (
                    <Picker.Item
                      key={index}
                      label={cameraOption.fullName}
                      value={cameraOption.code}
                    />
                  ))}
                </Picker>
              )}
              <AmendedOption
                onPress={() => {
                  setShowSolSlider(!showSolSlider);
                  setShowCameraPicker(false);
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
                  setShowCameraPicker(false);
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
            </>
          )}
          {amendedRover && amendedCamera.code && (marsDate || earthDate) && (
            <Option onPress={setNewParams}>
              <OptionText>Search</OptionText>
            </Option>
          )}
          <Option onPress={handleFilters}>
            <OptionText>Close</OptionText>
          </Option>
        </ModalView>
      </ModalWrapper>
    </Modal>
  );
};
