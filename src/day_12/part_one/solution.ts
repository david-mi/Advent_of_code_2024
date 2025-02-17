import { setInputLinesToArray } from "../../helpers";
import { input } from "./inputs/input";
import { inputExample, inputExample2, inputExample3 } from "./inputs/input_example";

type Region = {
  perimeter: number;
  plotsCount: number;
};

interface Coordinates {
  x: number;
  y: number;
}

type CoordinatesToString = `${number}-${number}`;

function setGarden(input: string[]) {
  return [...input].map((line) => line.split(""));
}

function stringifyCoordinates({ y, x }: Coordinates): CoordinatesToString {
  return `${y}-${x}`;
}

function isPlantNotClassified(classifiedPlants: Set<CoordinatesToString>, plantCoordinates: Coordinates) {
  return classifiedPlants.has(stringifyCoordinates(plantCoordinates)) === false;
}

function setRegion(
  { garden, region, coordinates: { x, y }, classifiedPlants }:
    { garden: string[][], region: Region, coordinates: Coordinates, classifiedPlants: Set<CoordinatesToString>; }
) {
  classifiedPlants.add(stringifyCoordinates({ y, x }));
  region.plotsCount++;
  const currentPlant = garden[y]![x]!;

  const north = { y: y - 1, x };
  const east = { y, x: x + 1 };
  const south = { y: y + 1, x };
  const west = { y, x: x - 1 };

  if (garden[north.y]?.[north.x] !== currentPlant) {
    region.perimeter++;
  } else if (isPlantNotClassified(classifiedPlants, north)) {
    setRegion({ garden, region, coordinates: north, classifiedPlants });
  }

  if (garden[east.y]?.[east.x] !== currentPlant) {
    region.perimeter++;
  } else if (isPlantNotClassified(classifiedPlants, east)) {
    setRegion({ garden, region, coordinates: east, classifiedPlants });
  }

  if (garden[south.y]?.[south.x] !== currentPlant) {
    region.perimeter++;
  } else if (isPlantNotClassified(classifiedPlants, south)) {
    setRegion({ garden, region, coordinates: south, classifiedPlants });
  }

  if (garden[west.y]?.[west.x] !== currentPlant) {
    region.perimeter++;
  } else if (isPlantNotClassified(classifiedPlants, west)) {
    setRegion({ garden, region, coordinates: west, classifiedPlants });
  }

  return region;
}

function findUnclassifiedPlants(garden: string[][], classifiedPlants: Set<CoordinatesToString>): Coordinates | null {
  for (let y = 0; y < garden.length; y++) {
    for (let x = 0; x < garden[y]!.length; x++) {
      if (classifiedPlants.has(stringifyCoordinates({ y, x })) === false) {
        return { y, x };
      }
    }
  }

  return null;
}

function setRegions(garden: string[][], classifiedPlants: Set<CoordinatesToString>) {
  const regions: Region[] = [];
  let unsetPlantCoordinates: Coordinates | null = null;

  while ((unsetPlantCoordinates = findUnclassifiedPlants(garden, classifiedPlants)) !== null) {
    regions.push(
      setRegion({
        garden,
        region: {
          perimeter: 0,
          plotsCount: 0
        },
        coordinates: unsetPlantCoordinates,
        classifiedPlants
      })
    );
  }

  return regions;
}

function getTotalPrice(regions: Region[]) {
  return regions.reduce((totalPrice, { perimeter, plotsCount }) => {
    return totalPrice += perimeter * plotsCount;
  }, 0);
};

const garden = setGarden(setInputLinesToArray(input));
const classifiedPlants = new Set<CoordinatesToString>();
const regions = setRegions(garden, classifiedPlants);
export const day12PartOneSolution = getTotalPrice(regions);