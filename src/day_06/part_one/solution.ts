import { inputExample } from "./inputs/input_example";
import { input } from "./inputs/input";
import { setInputLinesToArray } from "../../helpers";

type Coordinates = {
  x: number;
  y: number;
};
type GuardDirection = "^" | "v" | "<" | ">";
type Guard = Coordinates & {
  direction: GuardDirection;
};
type MapElement = "." | "#" | GuardDirection;

const labMap = setInputLinesToArray(input) as MapElement[];

function getGuard(labMap: string[]): Guard | null {
  for (let y = 0; y < labMap.length; y++) {
    const currentLine = labMap[y]!;

    for (let x = 0; x < currentLine.length; x++) {
      const currentMapElement = currentLine[x] as MapElement;

      if (currentMapElement !== "." && currentMapElement !== "#") {
        return {
          direction: currentMapElement,
          x,
          y
        };
      }
    }
  }

  return null;
}

const guard = getGuard(labMap);
if (!guard) throw new Error("Guard not found in the lab map");

function moveGuard({ guard, labMap }: { guard: Guard, labMap: string[]; }) {
  const guardClone = { ...guard };

  switch (guard.direction) {
    case "^": guardClone.y--; break;
    case "v": guardClone.y++; break;
    case "<": guardClone.x--; break;
    case ">": guardClone.x++;
  }

  const mapElementFromNextGuardPosition = labMap[guardClone.y]?.[guardClone.x] as Exclude<MapElement, GuardDirection> | undefined;

  if (mapElementFromNextGuardPosition === undefined) {
    return true;
  }

  if (mapElementFromNextGuardPosition === "#") {
    switch (guard.direction) {
      case "^": guard.direction = ">"; break;
      case "v": guard.direction = "<"; break;
      case "<": guard.direction = "^"; break;
      case ">": guard.direction = "v"; break;
    }

    return moveGuard({ guard, labMap });
  }

  guard.x = guardClone.x;
  guard.y = guardClone.y;

  return false;
}

function makePatrol({ guard, labMap }: { guard: Guard, labMap: string[]; }) {
  const patrolPlaces: Set<`${number}-${number}`> = new Set();
  patrolPlaces.add(`${guard.y}-${guard.x}`);
  let hasFinishedPatrol = false;

  while (hasFinishedPatrol === false) {
    patrolPlaces.add(`${guard.y}-${guard.x}`);
    hasFinishedPatrol = moveGuard({ guard, labMap });
  }

  return patrolPlaces.size;
}

export const day06PartOneSolution = makePatrol({ guard, labMap });