import { View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

export const EarthDateSelector = ({ maxEarth, landingDate, setDate }) => {
  const handleDateChange = (d) => {
    const selectedDate = d.replace(/\//g, '-');
    setDate(selectedDate);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DatePicker
        mode='calendar'
        selected={maxEarth}
        onDateChange={handleDateChange}
        minimumDate={landingDate}
        maximumDate={maxEarth}
      />
    </View>
  );
};
