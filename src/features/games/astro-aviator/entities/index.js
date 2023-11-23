import { Dimensions } from 'react-native';
import Matter from 'matter-js';
import { SpaceShip } from '../components/space-ship.component';
import { Floor } from '../components/floor.component';
import { Obstacle } from '../components/obstacle.component';
import { Ceiling } from '../components/ceiling.component';
import { getAsteroidData } from '../utils/random';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const restart = () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  engine.gravity.y = 0.4;

  // Function to check collisions between asteroids
  const checkAsteroidCollisions = (obstacle1, obstacle2) => {
    return Matter.Query.collides([obstacle1, obstacle2], world).length > 0;
  };

  // Create the first asteroid
  const asteroid1 = Obstacle(
    world,
    'Obstacle1',
    windowWidth + Math.random() * windowWidth,
    getAsteroidData()
  );

  // Create the second asteroid
  let asteroid2 = Obstacle(
    world,
    'Obstacle2',
    windowWidth + Math.random() * windowWidth,
    getAsteroidData()
  );

  // Check for collisions and reposition the second asteroid if needed
  while (checkAsteroidCollisions(asteroid1.body, asteroid2.body)) {
    asteroid2 = Obstacle(
      world,
      'Obstacle2',
      windowWidth + Math.random() * windowWidth,
      getAsteroidData()
    );
  }

  return {
    physics: { engine, world },
    SpaceShip: SpaceShip(world, { x: 50, y: 300 }, { height: 30, width: 40 }),
    Obstacle1: asteroid1,
    Obstacle2: asteroid2,
    Floor: Floor(
      world,
      { x: windowWidth / 2, y: windowHeight + 100 },
      { height: 200, width: windowWidth }
    ),
    Ceiling: Ceiling(
      world,
      { x: windowWidth / 2, y: 0 },
      { height: 10, width: windowWidth }
    ),
  };
};
