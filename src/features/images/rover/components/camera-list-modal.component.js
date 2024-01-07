import { Modal } from 'react-native';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  CameraList,
  Camera,
  GradientBackground,
  CameraText,
} from '../styles/mars-rover-image-card.styles';
import Close from '../../../../../assets/svg/close.svg';

export const CameraListModal = ({
  cameraData,
  handleCameraChange,
  visible,
  setVisible,
}) => {
  const closeModal = () => {
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <Camera
      onPress={() => {
        handleCameraChange(item.camera);
        setVisible(false);
      }}
    >
      <GradientBackground>
        <CameraText variant='title'>{item.camera}</CameraText>
      </GradientBackground>
    </Camera>
  );

  const data = Object.entries(cameraData).map(([key, value]) => ({
    _id: key,
    ...value,
  }));

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeModal}>
              <Close />
            </CloseIcon>
            {data.length > 0 && (
              <CameraList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
              />
            )}
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
