import { setInputLinesToArray } from "../../helpers";
import { input } from "./inputs/input";
import { inputExample, inputExample2 } from "./inputs/input_example";

function isEven(number: number) {
  return number % 2 === 0;
}

function parseInput(stones: string): number[] {
  return stones.split(" ").map(Number);
}

function splitStone(splittableStone: string): number[] {
  const splitIndex = splittableStone.length / 2;

  return [
    Number(splittableStone.slice(0, splitIndex)),
    Number(splittableStone.slice(splitIndex))
  ];
}

function changeStone(stone: number): number[] {
  if (stone === 0) return [1];

  const splittableStone = String(stone);
  const shouldSplitStone = isEven(splittableStone.length);

  if (shouldSplitStone) {
    return splitStone(splittableStone);
  }

  return [stone * 2024];
}

function changeStones(stonesStorage: number[][]) {
  const changedStonesStorage: number[][] = [[]];
  let counterToLimit = 0;
  const storageBlockLimit = 1_000_000;

  for (let i = 0; i < stonesStorage.length; i++) {
    for (let k = 0; k < stonesStorage[i]!.length; k++) {
      const stone = stonesStorage[i]![k]!;

      if (counterToLimit >= storageBlockLimit) {
        changedStonesStorage.push([]);
        counterToLimit = 0;
      }

      const changedStones = changeStone(stone);
      changedStonesStorage.at(-1)!.push(...changedStones);
      counterToLimit += changedStones.length;
    }
  }

  return changedStonesStorage;
}

function blink(amount: number, stones: number[][]): number[][] {
  console.log(amount, Math.floor(performance.now() / 1000) + " seconds");
  return amount > 0
    ? blink(amount - 1, changeStones(stones))
    : stones;
}

// does not solve the overload issue
function blinkNoRecursion(amount: number, stones: number[][]): number[][] {
  let changedStones = stones;

  while (amount > 0) {
    console.log(amount, Math.floor(performance.now() / 1000) + " seconds");
    changedStones = changeStones(changedStones);
    amount--;
  }

  return changedStones;
}


function countStones(stonesBlocks: number[][]) {
  return stonesBlocks.reduce((stonesCount, stoneBlock) => {
    return stonesCount + stoneBlock.length;
  }, 0);
}

const changedStones = blink(75, [parseInput(input)]);
export const day11PartTwoSolution = countStones(changedStones);
