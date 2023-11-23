import { View, Image } from 'react-native';
import Matter from 'matter-js';
import Meteorite from '../../../../../assets/meteorite.svg';

const Asteroid = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
        transform: [{ rotate: '45deg' }],
      }}
    >
      <Meteorite width='100%' height='100%' />
    </View>
  );
};

export const Obstacle = (world, label, initialX, asteroidData) => {
  const initialObstacle = Matter.Bodies.circle(
    initialX,
    asteroidData.pos.y,
    asteroidData.size.width / 2,
    {
      label,
      isStatic: true,
    }
  );
  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    renderer: <Asteroid />,
  };
};
