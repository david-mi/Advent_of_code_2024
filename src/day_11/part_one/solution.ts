import { setInputLinesToArray } from "../../helpers";
import { input } from "./inputs/input";
import { inputExample, inputExample2 } from "./inputs/input_example";

function parseStones(stones: string): number[] {
  return stones
    .split(" ")
    .map(Number);
}

function isEven(number: number) {
  return number % 2 === 0;
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

function replaceStones(stones: number[]) {
  return stones.reduce<number[]>((replacedStones, stone) => {
    replacedStones.push(...replaceStone(stone));
    return replacedStones;
  }, []);
}

function blink(amount: number, stones: number[]): number[] {
  return amount > 0
    ? blink(amount - 1, replaceStones(stones))
    : stones;
}
const BLINKS_AMOUNT = 25;
const replacedStones = blink(BLINKS_AMOUNT, parseStones(input));
export const day11PartOneSolution = replacedStones.length;