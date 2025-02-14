import { setInputLinesToArray } from "../../helpers";
import { input } from "./inputs/input";
import { inputExample, inputExample2 } from "./inputs/input_example";

type Stone = number;
type Amount = number;
type Stones = Map<Stone, Amount>;

function isEven(number: number) {
  return number % 2 === 0;
}

function parseStones(input: string): Stones {
  return input
    .split(" ")
    .reduce<Stones>((stones, stoneToString) => {
      const stone = Number(stoneToString);

      return stones.set(
        stone,
        stones.has(stone)
          ? stones.get(stone)! + 1
          : 1
      );
    }, new Map());
}

function createTwoStonesFromOne(stone: number): number[] {
  const stoneToString = String(stone);
  const sliceIndex = stoneToString.length / 2;

  return [
    Number(stoneToString.slice(0, sliceIndex)),
    Number(stoneToString.slice(sliceIndex))
  ];
}

function replaceStone(stone: number): number[] {
  if (stone === 0) return [1];

  const shouldCreateTwoStones = isEven(String(stone).length);
  if (shouldCreateTwoStones) {
    return createTwoStonesFromOne(stone);
  }


  return [stone * 2024];
}

function replaceStones(stones: Stones): Stones {
  const replacementStones = new Map<number, number>();

  stones.forEach((amount, stone) => {
    replaceStone(stone)
      .forEach((replacementStone) => {
        replacementStones.set(
          replacementStone,
          replacementStones.has(replacementStone)
            ? replacementStones.get(replacementStone)! + amount
            : amount
        );
      });
  });

  return replacementStones;
}

function blink(amount: number, stones: Stones): Stones {
  return amount > 0
    ? blink(amount - 1, replaceStones(stones))
    : stones;
}

function countStones(stones: Stones): number {
  return Array
    .from(stones)
    .reduce((stonesCount, [_, amount]) => stonesCount += amount, 0);
}

const BLINKS_AMOUNT = 75;
const stones = blink(BLINKS_AMOUNT, parseStones(input));
export const stonesCount = countStones(stones);