import { ScrollView } from 'react-native';
import {
  ApodCard,
  ApodCardCover,
  Info,
  Title,
  Body,
} from '../styles/apod-card.styles';

export const ApodInfoCard = ({ image, title, explanation }) => {
  return (
    <ApodCard elevation={5}>
      <ApodCardCover key={title} source={{ uri: image }} />
      <ScrollView>
        <Info>
          <Title variant='title'>{title}</Title>
          <Body variant='body'>{explanation}</Body>
        </Info>
      </ScrollView>
    </ApodCard>
  );
};
