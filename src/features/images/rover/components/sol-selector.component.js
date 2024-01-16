import { useState } from 'react';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

export const SolSelector = ({ maxSol, date, setDate }) => {
  const [isEditable, setIsEditable] = useState(false);

  const handleTextInputChange = (text) => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= maxSol) {
      setDate(numericValue);
    }
  };

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
      }}
    >
      {isEditable ? (
        <TextInput
          style={{
            fontSize: 20,
            marginTop: 10,
            width: 50,
            textAlign: 'center',
            borderBottomWidth: 1,
          }}
          keyboardType='numeric'
          value={date}
          onChangeText={handleTextInputChange}
          onBlur={toggleEditable}
          autoFocus
        />
      ) : (
        <TouchableOpacity onPress={toggleEditable}>
          <Text
            style={{
              fontSize: 60,
              color: '#fff',
              fontWeight: '400',
            }}
          >
            {date}
          </Text>
        </TouchableOpacity>
      )}
      <Slider
        style={{ width: '90%', height: 15 }}
        minimumValue={1}
        maximumValue={maxSol}
        step={1}
        value={date}
        minimumTrackTintColor='#009999'
        maximumTrackTintColor='#999'
        thumbTintColor='#009999'
        onValueChange={(v) => setDate(v)}
      />
    </View>
  );
};
