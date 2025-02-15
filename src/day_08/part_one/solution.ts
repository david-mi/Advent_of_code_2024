import { inputExample } from "./inputs/input_example";
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

function calculateAntinodeCoordinates(
  antennasCoordinates: Coordinates[],
  referenceAntennaCoordinates: Coordinates,
  antennaToCompareIndex: number
) {
  const nextAntennaCoordinates = antennasCoordinates[antennaToCompareIndex]!;
  const deltaY = nextAntennaCoordinates.y - referenceAntennaCoordinates.y;
  const deltaX = nextAntennaCoordinates.x - referenceAntennaCoordinates.x;

  return {
    y: nextAntennaCoordinates.y + deltaY,
    x: nextAntennaCoordinates.x + deltaX
  };
}

function setAntinodes(antennasCoordinatesAtFrequencies: AntennasCoordinatesAtFrequencies, city: string[]) {
  const antinodes = new Set<CoordinatesToString>();

  antennasCoordinatesAtFrequencies.forEach((antennasCoordinates) => {

    for (let i = 0; i < antennasCoordinates.length; i++) {
      const { y, x } = antennasCoordinates[i]!;

      for (let xPrev = i - 1; xPrev >= 0; xPrev--) {
        const antinodeCoordinates = calculateAntinodeCoordinates(antennasCoordinates, { y, x }, xPrev);

        if (city[antinodeCoordinates.y]?.[antinodeCoordinates.x] !== undefined) {
          antinodes.add(stringifyCoordinates(antinodeCoordinates));
        }
      }

      for (let xNext = i + 1; xNext < antennasCoordinates.length; xNext++) {
        const antinodeCoordinates = calculateAntinodeCoordinates(antennasCoordinates, { y, x }, xNext);

        if (city[antinodeCoordinates.y]?.[antinodeCoordinates.x] !== undefined) {
          antinodes.add(stringifyCoordinates(antinodeCoordinates));
        }
      }
    }
  });

  return antinodes;
}

const city = setInputLinesToArray(input);
const antennasCoordinatesAtFrequencies = setAntennasCoordinatesAtFrequencies(city);
const antinodes = setAntinodes(antennasCoordinatesAtFrequencies, city);
export const day08PartOneSolution = antinodes.size;