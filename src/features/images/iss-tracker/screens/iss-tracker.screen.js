import { useState, useEffect, useRef } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Satellite from '../../../../../assets/svg/satellite.svg';
import { LoadingSpinner } from '../../../../../assets/loading-spinner';
import { ISSInfoModal } from '../components/iss-info-modal.component';
import { ISSTrackView, MenuIcon } from '../styles/iss-tracker.styles';

export const ISSTrackerScreen = ({ navigation }) => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isMapMoving, setIsMapMoving] = useState(false);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 100,
    longitudeDelta: 100,
    initialZoom: 1,
  });
  const [previousRegion, setPreviousRegion] = useState(null);
  const [issData, setIssData] = useState({});
  const [visible, setVisible] = useState(false);

  const previousRegionRef = useRef(null);

  const { dispatch } = navigation;

  useEffect(() => {
    if (!isMapMoving) {
      const issInterval = setInterval(() => {
        getISS();
      }, 2000);

      return () => {
        clearInterval(issInterval);
      };
    }
  }, [isMapMoving]);

  useEffect(() => {
    const inactivityTimeout = setTimeout(() => {
      if (previousRegionRef.current === previousRegion) {
        setIsMapMoving(false);
        getISS();
      }
    }, 5000);

    return () => {
      clearTimeout(inactivityTimeout);
    };
  }, [previousRegion]);

  const getISS = async () => {
    try {
      const response = await fetch(
        'https://api.wheretheiss.at/v1/satellites/25544'
      );
      const data = await response.json();
      const { latitude, longitude } = data;
      setIssData(data);
      setPosition({ latitude, longitude });
      setRegion({
        ...region,
        latitude,
        longitude,
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching ISS data:', error);
    }
  };

  const handleMapMovement = (newRegion) => {
    setIsMapMoving(true);
    setPreviousRegion(newRegion);
    previousRegionRef.current = newRegion;
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <MapView
            style={{ flex: 1, position: 'relative' }}
            region={region}
            onRegionChangeComplete={handleMapMovement}
          >
            <MenuIcon
              onPress={() => {
                dispatch(DrawerActions.openDrawer());
              }}
            >
              <Ionicons name='md-menu' size={30} color='#009999' />
            </MenuIcon>
            <Callout onPress={() => setVisible(true)}>
              <Marker coordinate={position}>
                <Satellite height={32} width={32} />
              </Marker>
            </Callout>
          </MapView>
        </>
      )}
      <ISSInfoModal
        visible={visible}
        setVisible={setVisible}
        issData={issData}
      />
    </>
  );
};
