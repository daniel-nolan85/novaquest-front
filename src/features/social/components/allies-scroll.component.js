import { FlatList } from 'react-native';
import {
  AlliesWrapper,
  AlliesContainer,
  AllyOption,
  AllyImage,
} from '../styles/allies-scroll.styles';
import { Text } from '../../../components/typography/text.component';

export const AlliesScroll = ({ navigate }) => (
  <AlliesWrapper>
    <Text variant='title'>Allies</Text>
    {/* <FlatList
      horizontal={true}
      data={friends}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <AlliesContainer key={item.id}>
          <AllyOption onPress={() => console.log(`go to ally ${item.name}`)}>
            <AllyImage source={item.image} resizeMode='contain' />
          </AllyOption>
          <Text variant='title'>{item.name}</Text>
        </AlliesContainer>
      )}
    /> */}
  </AlliesWrapper>
);
