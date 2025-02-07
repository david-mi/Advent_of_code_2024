import { setInputLinesToArray } from "../../helpers";
import { input } from "./inputs/input";
import { inputExample } from "./inputs/input_example";

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

function getTrailHeadRating(
  topographicMap: TopographicMap,
  { x, y }: Coordinates,
  trailHeadRating = 0
) {
  let reachedHeight = topographicMap[y]![x]!;
  if (reachedHeight === 9) return 1;

  const nextHeight = reachedHeight + 1;

  const { nY, nX } = { nY: y - 1, nX: x };
  const { eY, eX } = { eX: x + 1, eY: y };
  const { sY, sX } = { sX: x, sY: y + 1 };
  const { wY, wX } = { wX: x - 1, wY: y };

  if (topographicMap[nY]?.[nX] === nextHeight) {
    trailHeadRating += getTrailHeadRating(topographicMap, { y: nY, x: nX });
  }

  if (topographicMap[eY]?.[eX] === nextHeight) {
    trailHeadRating += getTrailHeadRating(topographicMap, { y: eY, x: eX });
  }

  if (topographicMap[sY]?.[sX] === nextHeight) {
    trailHeadRating += getTrailHeadRating(topographicMap, { y: sY, x: sX });
  }

  if (topographicMap[wY]?.[wX] === nextHeight) {
    trailHeadRating += getTrailHeadRating(topographicMap, { y: wY, x: wX });
  }

  return trailHeadRating;
}

function getTotalTrailHeadsRating(hikingTrailsStartingCoordinates: Coordinates[], counterCallback: (...args: any) => number) {
  return hikingTrailsStartingCoordinates.reduce((totalTrailHeadsRating, startingCoordinates) => {
    return totalTrailHeadsRating += counterCallback(topographicMap, startingCoordinates);
  }, 0);
};

const topographicMap = setTopographicMap(setInputLinesToArray(input));
const hikingTrailsStartingCoordinates = getHikingTrailsStartingCoordinates(topographicMap);
export const day10PartOneSolution = getTotalTrailHeadsRating(hikingTrailsStartingCoordinates, getTrailHeadRating);