import { View } from 'react-native';
import DatePicker, { getToday } from 'react-native-modern-datepicker';

export const DateSelector = ({ setDate }) => {
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
        selected={getToday()}
        onDateChange={handleDateChange}
        maximumDate={getToday()}
      />
    </View>
  );
};
