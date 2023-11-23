import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { NASA_API_KEY } from '@env';
import { Text } from '../../../../components/typography/text.component';

export const LandsatHomeScreen = ({ navigation }) => {
  useEffect(() => {
    fetchLandsat();
  }, []);

  //   useEffect(() => {
  //     if (isFirstRun.current) {
  //       isFirstRun.current = false;
  //       return;
  //     } else {
  //       fetchApodByDate();
  //     }
  //   }, [date]);

  //   const isFirstRun = useRef(true);

  const fetchLandsat = async () => {
    console.log('fetching');
    await axios
      .get(
        `https://api.nasa.gov/planetary/earth/imagery?lon=-73.9787965&lat=40.7558228&date=2023-11-16&api_key=${NASA_API_KEY}`
      )
      .then((res) => {
        console.log('fetched landsat');
        console.log(res.data);
      });
  };

  return <Text>Landsat</Text>;
};
