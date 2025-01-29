import { inputExample } from "./inputs/input_example";
import { input } from "./inputs/input";
import { setInputLinesToArray } from "../../helpers";

type Coordinates = {
  x: number;
  y: number;
};
type GuardEntity = "^" | "v" | "<" | ">";
type Guard = Coordinates & {
  directionSymbol: GuardEntity;
  hasFinishedPatrol: boolean;
  patrolPlaces: Set<`${number}-${number}`>;
};
type LabEntity = "." | "#" | GuardEntity;

const lab = setInputLinesToArray(input) as LabEntity[];

function findGuard(lab: string[]): Guard | null {
  for (let y = 0; y < lab.length; y++) {
    for (let x = 0; x < lab[y]!.length; x++) {
      const currentlabEntity = lab[y]![x] as LabEntity;

      if (currentlabEntity !== "." && currentlabEntity !== "#") {
        return {
          directionSymbol: currentlabEntity,
          x,
          y,
          hasFinishedPatrol: false,
          patrolPlaces: new Set<`${number}-${number}`>()
        };
      }
    }
  }

  return null;
}

function moveGuard({ guard, lab }: { guard: Guard, lab: string[]; }): Guard {
  const guardClone = { ...guard };

  switch (guard.directionSymbol) {
    case "^": guardClone.y--; break;
    case "v": guardClone.y++; break;
    case "<": guardClone.x--; break;
    case ">": guardClone.x++;
  }

  const upcominglabEntity = lab[guardClone.y]?.[guardClone.x] as Exclude<LabEntity, GuardEntity> | undefined;

  if (!upcominglabEntity) {
    guardClone.patrolPlaces.add(`${guardClone.y}-${guardClone.x}`);
    return { ...guard, hasFinishedPatrol: true };
  }

  if (upcominglabEntity === "#") {
    const NEXT_GUARD_SYMBOL_FROM_OBSTACLE: Record<GuardEntity, GuardEntity> = {
      "^": ">",
      "v": "<",
      "<": "^",
      ">": "v"
    };

    return moveGuard({
      guard: {
        ...guard,
        directionSymbol: NEXT_GUARD_SYMBOL_FROM_OBSTACLE[guard.directionSymbol]
      },
      lab
    });
  }

  guardClone.patrolPlaces.add(`${guardClone.y}-${guardClone.x}`);

  return guardClone;
}

function startPatrol({ guard, lab }: { guard: Guard, lab: string[]; }) {
  let guardClone = { ...guard };

  while (guardClone.hasFinishedPatrol === false) {
    guardClone = moveGuard({ guard: guardClone, lab });
  }

  return guardClone;
}

const guard = findGuard(lab);
if (!guard) throw new Error("Guard not found in the lab map");

export const day06PartOneSolution = startPatrol({ guard, lab }).patrolPlaces.size;