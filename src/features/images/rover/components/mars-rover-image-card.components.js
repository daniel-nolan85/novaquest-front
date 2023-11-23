import {
  RoverImageCard,
  RoverImageCardCover,
} from '../styles/mars-rover-image-card.styles';

export const MarsRoverImage = ({ image }) => {
  console.log('image => ', image);
  return (
    <RoverImageCard elevation={5}>
      <RoverImageCardCover key={image} source={{ uri: image.img_src }} />
    </RoverImageCard>
  );
};
