import { Text } from '../../../components/typography/text.component';
import {
  PlanetCard,
  PlanetCardCover,
  Info,
} from '../styles/planet-info-card.styles';

export const PlanetInfoCard = ({ planet }) => {
  const { name, photo, type } = planet;

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <PlanetCard elevation={5}>
      <PlanetCardCover key={name} source={{ uri: photo }} />
      <Info>
        <Text variant='title'>{capitalizeFirstLetter(name)}</Text>
        <Text variant='body'>{capitalizeFirstLetter(type)}</Text>
      </Info>
    </PlanetCard>
  );
};
