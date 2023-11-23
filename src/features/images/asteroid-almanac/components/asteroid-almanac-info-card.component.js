import { Text } from '../../../../components/typography/text.component';
import { LinearGradient } from 'expo-linear-gradient';
import { AsteroidCard } from '../styles/asteroid-almanac-info-card.styles';

export const AsteroidAlmanacInfoCard = ({ date }) => {
  return (
    <AsteroidCard elevation={5}>
      <LinearGradient
        colors={['#009999', '#00cccc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ borderRadius: 8, padding: 20 }}
      >
        <Text variant='title' style={{ color: '#fff', fontSize: 18 }}>
          {date}
        </Text>
      </LinearGradient>
    </AsteroidCard>
  );
};
