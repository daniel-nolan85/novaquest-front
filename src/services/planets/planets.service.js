import planets from './planets.data.json';

export const planetsRequest = (input) => {
  return new Promise((resolve, reject) => {
    const lowerInput = input.toLowerCase();
    if (!lowerInput) {
      resolve(planets);
      return;
    }
    const filteredPlanets = planets.filter(
      (planet) =>
        planet.name.includes(lowerInput) || planet.type.includes(lowerInput)
    );
    if (filteredPlanets.length === 0) {
      reject('No matching planets found');
      return;
    }
    resolve(filteredPlanets);
  });
};
