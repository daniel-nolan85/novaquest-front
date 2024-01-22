import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {
  AlliesWrapper,
  AlliesContainer,
  AllyOption,
  AllyImage,
} from '../styles/allies-scroll.styles';
import { Text } from '../../../components/typography/text.component';
import { getAllies } from '../../../requests/user';
import defaultProfile from '../../../../assets/img/defaultProfile.png';

export const AlliesScroll = ({ navigate }) => {
  const [allies, setAllies] = useState([]);

  const { token, _id, role } = useSelector((state) => state.user);

  useFocusEffect(
    useCallback(() => {
      fetchAllies();
    }, [])
  );

  const fetchAllies = async () => {
    await getAllies(token, _id, role)
      .then((res) => {
        setAllies(res.data.allies);
      })
      .catch((err) => console.error(err));
  };

  const maxItemsToShow = 10;
  const shuffledAllies = allies
    .slice(0, maxItemsToShow)
    .sort(() => Math.random() - 0.5);

  return (
    <AlliesWrapper>
      <Text variant='title'>Allies</Text>
      <FlatList
        horizontal={true}
        data={shuffledAllies}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          return (
            <AlliesContainer key={item._id}>
              <AllyOption
                onPress={() => navigate('UserProfile', { userId: item._id })}
              >
                <AllyImage
                  source={
                    item.profileImage ? item.profileImage : defaultProfile
                  }
                  resizeMode='contain'
                />
              </AllyOption>
            </AlliesContainer>
          );
        }}
      />
    </AlliesWrapper>
  );
};
