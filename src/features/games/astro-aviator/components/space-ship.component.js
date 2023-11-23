import { View } from 'react-native';
import Matter from 'matter-js';
import LottieView from 'lottie-react-native';

const Rocket = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;
  const animationScale = 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
        transform: [{ rotate: '90deg' }],
      }}
    >
      <LottieView
        source={require('../../../../../assets/rocket.json')}
        autoPlay
        loop
        style={{
          width: '100%',
          height: '100%',
          transform: [{ scale: animationScale }],
        }}
      />
    </View>
  );
};

export const SpaceShip = (world, pos, size) => {
  const initialSpaceShip = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: 'Rocket' }
  );
  Matter.World.add(world, initialSpaceShip);

  return {
    body: initialSpaceShip,
    pos,
    renderer: <Rocket />,
  };
};
