import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NASA_API_KEY } from '@env';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import Filters from '../../../../../assets/svg/filters.svg';
import { IconsWrapper } from '../../apod/styles/apod.styles';
import { ImagesContext } from '../../../../services/images/images.context';
import { AmendParamsModal } from '../components/amend-params-modal.component';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';
import { MarsRoverImageGallery } from '../components/mars-rover-image-gallery.component';
import {
  updateViewedRovers,
  updateGuestViewedRovers,
} from '../../../../requests/user';

export const MarsRoverImagesScreen = ({ navigation }) => {
  const { selectedRover, dateType, date } = useContext(ImagesContext);

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [cameraData, setCameraData] = useState({});
  const [newCamera, setNewCamera] = useState('');

  const { user } = useSelector((state) => ({ ...state }));
  const reduxDispatch = useDispatch();

  const { navigate, dispatch } = navigation;

  const roverCameras = {
    curiosity: [
      { abbreviation: 'FHAZ', fullName: 'Front Hazard Avoidance Camera' },
      { abbreviation: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera' },
      { abbreviation: 'MAST', fullName: 'Mast Camera' },
      { abbreviation: 'CHEMCAM', fullName: 'Chemistry and Camera Complex' },
      { abbreviation: 'MAHLI', fullName: 'Mars Hand Lens Imager' },
      { abbreviation: 'MARDI', fullName: 'Mars Descent Imager' },
      { abbreviation: 'NAVCAM', fullName: 'Navigation Camera' },
    ],
    opportunity: [
      { abbreviation: 'FHAZ', fullName: 'Front Hazard Avoidance Camera' },
      { abbreviation: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera' },
      { abbreviation: 'NAVCAM', fullName: 'Navigation Camera' },
      { abbreviation: 'PANCAM', fullName: 'Panoramic Camera' },
      {
        abbreviation: 'MINITES',
        fullName: 'Miniature Thermal Emission Spectrometer',
      },
    ],
    spirit: [
      { abbreviation: 'FHAZ', fullName: 'Front Hazard Avoidance Camera' },
      { abbreviation: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera' },
      { abbreviation: 'NAVCAM', fullName: 'Navigation Camera' },
      { abbreviation: 'PANCAM', fullName: 'Panoramic Camera' },
      {
        abbreviation: 'MINITES',
        fullName: 'Miniature Thermal Emission Spectrometer',
      },
    ],
    perseverance: [
      { abbreviation: 'EDL_RUCAM', fullName: 'Rover Up-Look Camera' },
      { abbreviation: 'EDL_RDCAM', fullName: 'Rover Down-Look Camera' },
      { abbreviation: 'EDL_DDCAM', fullName: 'Descent Stage Down-Look Camera' },
      { abbreviation: 'EDL_PUCAM1', fullName: 'Parachute Up-Look Camera A' },
      { abbreviation: 'EDL_PUCAM2', fullName: 'Parachute Up-Look Camera B' },
      { abbreviation: 'NAVCAM_LEFT', fullName: 'Navigation Camera - Left' },
      { abbreviation: 'NAVCAM_RIGHT', fullName: 'Navigation Camera - Right' },
      { abbreviation: 'MCZ_LEFT', fullName: 'Mast Camera Zoom - Left' },
      { abbreviation: 'MCZ_RIGHT', fullName: 'Mast Camera Zoom - Right' },
      {
        abbreviation: 'FRONT_HAZCAM_LEFT_A',
        fullName: 'Front Hazard Avoidance Camera - Left',
      },
      {
        abbreviation: 'FRONT_HAZCAM_RIGHT_A',
        fullName: 'Front Hazard Avoidance Camera - Right',
      },
      {
        abbreviation: 'REAR_HAZCAM_LEFT',
        fullName: 'Rear Hazard Avoidance Camera - Left',
      },
      {
        abbreviation: 'REAR_HAZCAM_RIGHT',
        fullName: 'Rear Hazard Avoidance Camera - Right',
      },
      { abbreviation: 'SKYCAM', fullName: 'MEDA Skycam' },
      { abbreviation: 'SHERLOC_WATSON', fullName: 'SHERLOC WATSON Camera' },
    ],
  };

  useEffect(() => {
    const selectedRoverCameras = roverCameras[selectedRover] || [];
    setCameras(selectedRoverCameras);
  }, [selectedRover]);

  useEffect(() => {
    if (cameras.length > 0) {
      setNewCamera(cameras[0].abbreviation);
    }
  }, [cameras]);

  useEffect(() => {
    if (newCamera) {
      retrieveImages();
    }
  }, [newCamera]);

  const retrieveImages = async () => {
    setIsLoading(true);
    await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?${dateType}=${date}&api_key=${NASA_API_KEY}`
      )
      .then((res) => {
        let updatedCameraData = {};
        cameras.forEach((camera) => {
          const cameraPhotos = res.data.photos.filter(
            (photo) => photo.camera.name === camera.abbreviation
          );

          updatedCameraData[camera.abbreviation] = {
            camera: camera.abbreviation,
            fullName: camera.fullName,
            photos: cameraPhotos,
          };
        });
        setCameraData(updatedCameraData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error('Error fetching images:', err);
      });
    if (user.role !== 'guest') {
      await updateViewedRovers(
        user.token,
        user._id,
        selectedRover,
        newCamera,
        dateType
      )
        .then((res) => {
          reduxDispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              viewedRovers: res.data.user.viewedRovers,
              viewedRoverCameras: res.data.user.viewedRoverCameras,
              viewedRoverDateTypes: res.data.user.viewedRoverDateTypes,
            },
          });
          if (res.data.achievement) {
            navigate(res.data.achievement);
          } else if (res.data.simultaneousAchievements) {
            const firstAchievement = res.data.simultaneousAchievements[0];
            const additionalAchievements =
              res.data.simultaneousAchievements.slice(1);
            navigate(firstAchievement, { additionalAchievements });
          } else if (res.data.noAchievements) {
            navigate('MarsRoverImagesScreen');
          }
        })
        .catch((err) => console.error(err));
    } else {
      if (
        user &&
        user.viewedRovers &&
        !user.viewedRovers.includes(selectedRover) &&
        user.viewedRoverCameras &&
        !user.viewedRoverCameras.includes(camera) &&
        user.viewedRoverDateTypes &&
        !user.viewedRoverDateTypes.includes(dateType)
      ) {
        reduxDispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            viewedRovers: user.viewedRovers.includes(selectedRover)
              ? user.viewedRovers
              : [...user.viewedRovers, selectedRover],
            viewedRoverCameras: user.viewedRoverCameras.includes(camera)
              ? user.viewedRoverCameras
              : [...user.viewedRoverCameras, camera],
            viewedRoverDateTypes: user.viewedRoverDateTypes.includes(dateType)
              ? user.viewedRoverDateTypes
              : [...user.viewedRoverDateTypes, dateType],
          },
        });
      }
      const achievements = await updateGuestViewedRovers(user);
      if (achievements.length > 1) {
        const firstAchievement = achievements[0];
        const additionalAchievements = achievements.slice(1);
        navigate(firstAchievement, { additionalAchievements });
      } else if (achievements.length === 1) {
        navigate(achievements[0]);
      } else {
        navigate('MarsRoverImagesScreen');
      }
    }
  };

  const handleFilters = () => {
    setOpen(!open);
  };

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
            <TouchableOpacity onPress={handleFilters}>
              <Filters width={24} height={24} />
            </TouchableOpacity>
          </IconsWrapper>
          <MarsRoverImageGallery cameraData={cameraData} navigate={navigate} />
          <AmendParamsModal handleFilters={handleFilters} open={open} />
        </SafeArea>
      )}
    </>
  );
};
