import { View } from 'react-native';
import Matter from 'matter-js';

const Ground = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return (
    <View
      style={{
        backgroundColor: 'green',
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    />
  );
};

export const Floor = (world, pos, size) => {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: 'Ground', isStatic: true }
  );
  Matter.World.add(world, initialFloor);

  return {
    body: initialFloor,
    pos,
    renderer: <Ground />,
  };
};
