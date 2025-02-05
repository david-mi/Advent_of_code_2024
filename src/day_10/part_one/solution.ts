import { setInputLinesToArray } from "../../helpers";
import { input } from "./inputs/input";
import { inputExample, inputExample2 } from "./inputs/input_example";

type TopographicMap = number[][];

function setTopographicMap(input: string[]): TopographicMap {
  const topographicMap: number[][] = [];

  for (let y = 0; y < input.length; y++) {
    const currentLine: number[] = [];

    for (let x = 0; x < input[y]!.length; x++) {
      currentLine.push(Number(input[y]![x]));
    }

    topographicMap.push(currentLine);
  }

  return topographicMap;
}

interface Coordinates {
  x: number;
  y: number;
}

function getHikingTrailsStartingCoordinates(topographicMap: TopographicMap): Coordinates[] {
  const hikingTrailsStartingCoordinates: Coordinates[] = [];

  for (let y = 0; y < topographicMap.length; y++) {
    for (let x = 0; x < topographicMap[y]!.length; x++) {
      const height = topographicMap[y]![x];

      if (height === 0) {
        hikingTrailsStartingCoordinates.push({ x, y });
      }
    }
  }

  return hikingTrailsStartingCoordinates;
}

function countTrailheadsFromHikingTrail(
  topographicMap: TopographicMap,
  { x, y }: Coordinates,
  hikingTrailCoordinates: Set<string> = new Set(),
  trailHeadScore = 0
) {
  let reachedHeight = topographicMap[y]![x]!;
  if (reachedHeight === 9) return 1;

  hikingTrailCoordinates.add(`${y}-${x}`);
  const nextHeight = reachedHeight + 1;

  const { nY, nX } = { nY: y - 1, nX: x };
  const { eY, eX } = { eX: x + 1, eY: y };
  const { sY, sX } = { sX: x, sY: y + 1 };
  const { wY, wX } = { wX: x - 1, wY: y };

  if (topographicMap[nY]?.[nX] === nextHeight && !hikingTrailCoordinates.has(`${nY}-${nX}`)) {
    hikingTrailCoordinates.add(`${nY}-${nX}`);

    trailHeadScore += countTrailheadsFromHikingTrail(topographicMap, { y: nY, x: nX }, hikingTrailCoordinates);
  }

  if (topographicMap[eY]?.[eX] === nextHeight && !hikingTrailCoordinates.has(`${eY}-${eX}`)) {
    hikingTrailCoordinates.add(`${eY}-${eX}`);

    trailHeadScore += countTrailheadsFromHikingTrail(topographicMap, { y: eY, x: eX }, hikingTrailCoordinates);
  }

  if (topographicMap[sY]?.[sX] === nextHeight && !hikingTrailCoordinates.has(`${sY}-${sX}`)) {
    hikingTrailCoordinates.add(`${sY}-${sX}`);

    trailHeadScore += countTrailheadsFromHikingTrail(topographicMap, { y: sY, x: sX }, hikingTrailCoordinates);
  }

  if (topographicMap[wY]?.[wX] === nextHeight && !hikingTrailCoordinates.has(`${wY}-${wX}`)) {
    hikingTrailCoordinates.add(`${wY}-${wX}`);

    trailHeadScore += countTrailheadsFromHikingTrail(topographicMap, { y: wY, x: wX }, hikingTrailCoordinates);
  }

  return trailHeadScore;
}

function getTotalTrailHeadsCount(hikingTrailsStartingCoordinates: Coordinates[], counterCallback: (...args: any) => number) {
  return hikingTrailsStartingCoordinates.reduce((totalTrailHeadsCount, startingCoordinates) => {
    return totalTrailHeadsCount += counterCallback(topographicMap, startingCoordinates);
  }, 0);
};

const topographicMap = setTopographicMap(setInputLinesToArray(input));
const hikingTrailsStartingCoordinates = getHikingTrailsStartingCoordinates(topographicMap);
export const day10PartOneSolution = getTotalTrailHeadsCount(hikingTrailsStartingCoordinates, countTrailheadsFromHikingTrail);