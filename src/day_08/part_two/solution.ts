import { inputExample, inputExample2 } from "./inputs/input_example";
import { input } from "./inputs/input";
import { setInputLinesToArray } from "../../helpers";

type Coordinates = {
  x: number;
  y: number;
};
type CoordinatesToString = `${number}-${number}`;
type Frequency = string;
type AntennasCoordinatesAtFrequencies = Map<Frequency, Coordinates[]>;

function stringifyCoordinates({ y, x }: Coordinates): CoordinatesToString {
  return `${y}-${x}`;
}

function setAntennasCoordinatesAtFrequencies(city: string[]): AntennasCoordinatesAtFrequencies {
  const antennasCoordinatesAtFrequencies: AntennasCoordinatesAtFrequencies = new Map();

  for (let y = 0; y < city.length; y++) {
    for (let x = 0; x < city[y]!.length; x++) {
      const entity = city[y]![x]!;
      if (entity === ".") continue;

      const coordinates = { y, x };
      const antennasCoordinates = antennasCoordinatesAtFrequencies.get(entity);

      if (Array.isArray(antennasCoordinates)) {
        antennasCoordinates.push(coordinates);
      } else {
        antennasCoordinatesAtFrequencies.set(entity, [coordinates]);
      }
    }
  }

  return antennasCoordinatesAtFrequencies;
}

function calculateAntinodesCoordinates(city: string[], antennaCoordinates: Coordinates, referenceAntennaCoordinates: Coordinates) {
  const antinodesCoordinates: Coordinates[] = [];
  const deltaY = antennaCoordinates.y - referenceAntennaCoordinates.y;
  const deltaX = antennaCoordinates.x - referenceAntennaCoordinates.x;
  let forwardMultiplier = 1;
  let backwardMultiplier = 1;

  while (city[referenceAntennaCoordinates.y + deltaY * forwardMultiplier]?.[referenceAntennaCoordinates.x + deltaX * forwardMultiplier] !== undefined) {
    antinodesCoordinates.push({
      y: referenceAntennaCoordinates.y + deltaY * forwardMultiplier,
      x: referenceAntennaCoordinates.x + deltaX * forwardMultiplier
    });

    forwardMultiplier++;
  }

  while (city[referenceAntennaCoordinates.y - deltaY * backwardMultiplier]?.[referenceAntennaCoordinates.x - deltaX * backwardMultiplier] !== undefined) {
    antinodesCoordinates.push({
      y: referenceAntennaCoordinates.y - deltaY * backwardMultiplier,
      x: referenceAntennaCoordinates.x - deltaX * backwardMultiplier
    });

    backwardMultiplier++;
  }

  return antinodesCoordinates;
}

function setAntinodes(antennasCoordinatesAtFrequencies: AntennasCoordinatesAtFrequencies, city: string[]) {
  const antinodes = new Set<CoordinatesToString>();

  antennasCoordinatesAtFrequencies.forEach((antennasCoordinates) => {

    for (let i = 0; i < antennasCoordinates.length; i++) {
      const referenceAntennaCoordinates = antennasCoordinates[i]!;

      for (let xPrev = i - 1; xPrev >= 0; xPrev--) {
        calculateAntinodesCoordinates(city, antennasCoordinates[xPrev]!, referenceAntennaCoordinates)
          .forEach((antinode) => antinodes.add(stringifyCoordinates(antinode)));
      }

      for (let xNext = i + 1; xNext < antennasCoordinates.length; xNext++) {
        calculateAntinodesCoordinates(city, antennasCoordinates[xNext]!, referenceAntennaCoordinates)
          .forEach((antinode) => antinodes.add(stringifyCoordinates(antinode)));
      }
    }
  });

  return antinodes;
}

const city = setInputLinesToArray(input);
const antennasCoordinatesAtFrequencies = setAntennasCoordinatesAtFrequencies(city);
const antinodes = setAntinodes(antennasCoordinatesAtFrequencies, city);
export const day08PartTwoSolution = antinodes.size;