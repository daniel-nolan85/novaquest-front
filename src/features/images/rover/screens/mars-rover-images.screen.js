import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NASA_API_KEY } from '@env';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { MarsRoverImage } from '../components/mars-rover-image-card.components';
import { Text } from '../../../../components/typography/text.component';
import Filters from '../../../../../assets/filters.svg';
import { IconsWrapper } from '../../apod/styles/apod.styles';
import { Heading } from '../styles/mars-rover-images-screen.styles';
import { Option, OptionText } from '../styles/mars-rover-images-screen.styles';
import { ImagesContext } from '../../../../services/images/images.context';
import { AmendParamsModal } from '../components/amend-params-modal.component';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';

const RoverImageList = styled.FlatList.attrs({
  contentContainerStyle: { paddingHorizontal: 16 },
})``;

export const MarsRoverImagesScreen = ({ navigation }) => {
  const { selectedRover, camera, dateType, date, cameraFullName } =
    useContext(ImagesContext);

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  console.log('selectedRover => ', selectedRover);
  console.log('dateType => ', dateType);
  console.log('date => ', date);
  console.log('camera => ', camera);

  useEffect(() => {
    retrieveImages();
  }, [selectedRover]);

  const retrieveImages = async () => {
    console.log('fetching');
    setIsLoading(true);
    await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?${dateType}=${date}&camera=${camera}&api_key=${NASA_API_KEY}`
      )
      .then((res) => {
        console.log(res.data.photos);
        setIsLoading(false);
        setImages(res.data.photos);
      });
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const ordinalSuffixOf = (i) => {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + 'st';
    }
    if (j == 2 && k != 12) {
      return i + 'nd';
    }
    if (j == 3 && k != 13) {
      return i + 'rd';
    }
    return i + 'th';
  };

  const handleFilters = () => {
    setOpen(!open);
  };

  return (
    <SafeArea>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <IconsWrapper>
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
            >
              <Ionicons name='md-menu' size={30} color='#009999' />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFilters}>
              <Filters width={24} height={24} />
            </TouchableOpacity>
          </IconsWrapper>
          {images.length ? (
            <Heading>
              <Text variant='title'>
                The Mars {capitalizeFirstLetter(selectedRover)} Rover captured{' '}
                {images.length === 1
                  ? `${images.length} image`
                  : `${images.length} images`}{' '}
                with the {cameraFullName} on{' '}
                {dateType === 'sol'
                  ? `it's ${ordinalSuffixOf(date)} Martian sol`
                  : `${date}`}
              </Text>
            </Heading>
          ) : (
            <Heading>
              <Text variant='title'>
                The Mars {capitalizeFirstLetter(selectedRover)} Rover did not
                capture any images with the {cameraFullName} on{' '}
                {dateType === 'sol'
                  ? `it's ${ordinalSuffixOf(date)} Martian sol`
                  : `${date}`}
              </Text>
              <Option onPress={handleFilters}>
                <OptionText variant='body'>Refine parameters</OptionText>
              </Option>
            </Heading>
          )}
          <AmendParamsModal handleFilters={handleFilters} open={open} />
          <RoverImageList
            data={images}
            renderItem={({ item }) => {
              return (
                <Spacer position='bottom' size='large'>
                  <MarsRoverImage image={item} />
                </Spacer>
              );
            }}
            keyExtractor={(item) => item.name}
          />
        </>
      )}
    </SafeArea>
  );
};
