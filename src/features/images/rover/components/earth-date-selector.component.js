import { ScrollView, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

export const EarthDateSelector = ({ maxEarth, landingDate, setDate }) => {
  const handleDateChange = (d) => {
    const selectedDate = d.replace(/\//g, '-');
    setDate(selectedDate);
  };

  return (
    <DatePicker
      mode='calendar'
      selected={maxEarth}
      onDateChange={handleDateChange}
      minimumDate={landingDate}
      maximumDate={maxEarth}
      style={{ alignSelf: 'center', borderRadius: 12, width: '95%' }}
    />
  );
};
