import { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { ImagesContext } from '../../../../services/images/images.context';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { MarsRoverImage } from '../components/mars-rover-image-card.components';
import {
  RoverImageCard,
  RoverImageCardCover,
  Offline,
  Header,
  CameraIcon,
  Title,
} from '../styles/mars-rover-image-card.styles';
import Camera from '../../../../../assets/svg/camera.svg';
import { CameraListModal } from './camera-list-modal.component';
import { updateViewedRovers } from '../../../../requests/user';

const RoverImageList = styled.FlatList.attrs({
  contentContainerStyle: { paddingHorizontal: 16 },
  marginBottom: 300,
})``;

export const MarsRoverImageGallery = ({ cameraData, navigate }) => {
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [visible, setVisible] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const { selectedRover, dateType } = useContext(ImagesContext);

  useEffect(() => {
    if (cameraData && Object.keys(cameraData).length > 0) {
      setSelectedCamera(Object.keys(cameraData)[0]);
    }
  }, [cameraData]);

  const handleCameraChange = async (newCamera) => {
    setSelectedCamera(newCamera);
    await updateViewedRovers(
      user.token,
      user._id,
      user.role,
      selectedRover,
      newCamera,
      dateType
    )
      .then((res) => {
        dispatch({
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
  };

  return (
    <View>
      <View>
        <Header>
          <CameraIcon onPress={() => setVisible(true)}>
            <Camera height={48} width={48} />
          </CameraIcon>
          {selectedCamera && cameraData[selectedCamera] && (
            <Title variant='title'>{cameraData[selectedCamera].fullName}</Title>
          )}
        </Header>
        {selectedCamera &&
        cameraData[selectedCamera] &&
        cameraData[selectedCamera].photos.length > 0 ? (
          <RoverImageList
            data={cameraData[selectedCamera].photos}
            renderItem={({ item }) => {
              return (
                <Spacer position='bottom' size='large'>
                  <MarsRoverImage image={item} />
                </Spacer>
              );
            }}
            keyExtractor={(item) => item.name}
            ListFooterComponent={<Spacer position='bottom' size='xxLarge' />}
          />
        ) : (
          <RoverImageCard elevation={5}>
            <RoverImageCardCover
              source={{
                uri: 'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705450725/static_i56eul.gif',
              }}
            />
            <Offline variant='title'>Martian Cam Offline</Offline>
          </RoverImageCard>
        )}
      </View>
      <CameraListModal
        cameraData={cameraData}
        handleCameraChange={handleCameraChange}
        visible={visible}
        setVisible={setVisible}
      />
    </View>
  );
};
