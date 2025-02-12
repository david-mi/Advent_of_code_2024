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

function changeStones(stones: number[]) {
  return stones.reduce<number[]>((changedStones, stone) => {
    changedStones.push(...changeStone(stone));
    return changedStones;
  }, []);
}

function blink(amount: number, stones: number[]): number[] {
  return amount > 0
    ? blink(amount - 1, changeStones(stones))
    : stones;
}

const changedStones = blink(25, parseInput(input));
export const day11PartOneSolution = changedStones.length;