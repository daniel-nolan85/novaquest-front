import { Dimensions } from 'react-native';
import Matter from 'matter-js';
import { getAsteroidData } from './utils/random';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const createAsteroid = (world, label, xPos) => {
  const asteroidData = getAsteroidData();
  const obstacle = Obstacle(world, label, xPos, asteroidData);

  return {
    body: obstacle.body,
    point: false,
    renderer: obstacle.renderer,
  };
};

export const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  touches
    .filter((t) => t.type === 'press')
    .forEach((t) => {
      Matter.Body.setVelocity(entities.SpaceShip.body, {
        x: 0,
        y: -6,
      });
    });

  Matter.Engine.update(engine, time.delta);

  for (let i = 1; i <= 2; i++) {
    const obstacle = entities[`Obstacle${i}`].body;

    if (
      obstacle.position.x + obstacle.bounds.max.x < 0 &&
      !entities[`Obstacle${i}`].point
    ) {
      entities[`Obstacle${i}`].point = true;
      dispatch({ type: 'new_point' });
    }

    if (obstacle.position.x + obstacle.bounds.max.x < 0) {
      Matter.Body.setPosition(obstacle, {
        x: windowWidth,
        y: Math.random() * windowHeight,
      });
      entities[`Obstacle${i}`].point = false;
    }

    Matter.Body.translate(obstacle, {
      x: -5,
      y: 0,
    });
  }

  Matter.Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs;

    for (let i = 1; i <= 2; i++) {
      const pair = pairs.find(
        (p) =>
          (p.bodyA.label === 'Rocket' && p.bodyB.label === `Obstacle${i}`) ||
          (p.bodyB.label === 'Rocket' && p.bodyA.label === `Obstacle${i}`)
      );

      if (pair) {
        dispatch({ type: 'game_over' });
        return;
      }
    }

    for (let i = 1; i <= 2; i++) {
      const pair = pairs.find(
        (p) =>
          (p.bodyA.label === 'Rocket' && p.bodyB.label === 'Ground') ||
          (p.bodyB.label === 'Rocket' && p.bodyA.label === 'Ground')
      );

      if (pair) {
        dispatch({ type: 'game_over' });
        return;
      }
    }
  });

  return entities;
};
