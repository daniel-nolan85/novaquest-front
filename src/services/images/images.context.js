import { useState, createContext } from 'react';

export const ImagesContext = createContext();

export const ImagesContextProvider = ({ children }) => {
  const [renderDays, setRenderDays] = useState(false);
  const [selectedRover, setSelectedRover] = useState('');
  const [camera, setCamera] = useState('');
  const [dateType, setDateType] = useState(0);
  const [date, setDate] = useState(1);
  const [launchDate, setLaunchDate] = useState(null);
  const [cameraFullName, setCameraFullName] = useState('');

  return (
    <ImagesContext.Provider
      value={{
        renderDays,
        setRenderDays,
        selectedRover,
        setSelectedRover,
        camera,
        setCamera,
        dateType,
        setDateType,
        date,
        setDate,
        launchDate,
        setLaunchDate,
        cameraFullName,
        setCameraFullName,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
};
