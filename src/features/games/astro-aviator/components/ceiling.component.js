import { View } from 'react-native';
import Matter from 'matter-js';

const Roof = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    />
  );
};

export const Ceiling = (world, pos, size) => {
  const initialCeiling = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: 'Roof', isStatic: true }
  );
  Matter.World.add(world, initialCeiling);

  return {
    body: initialCeiling,
    pos,
    renderer: <Roof />,
  };
};
