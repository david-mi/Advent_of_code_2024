import { inputExample as instructionsExample } from "./inputs/input_example";
import { input as instructions } from "./inputs/input";

const cleanupDontRegex = /(?:don't\(\).*?(?=do\(\)))|don't\(\).+/gsm;
const mulRegex = /mul\((?<leftNumber>\d{1,3}),(?<rightNumber>\d{1,3})\)/g;

const matcher = instructions
  .replace(cleanupDontRegex, "")
  .matchAll(mulRegex) || [];

export const day03PartOneSolution = Array
  .from(matcher)
  .reduce((sumOfMultiplications, { groups }) => {
    return sumOfMultiplications += Number(groups!.leftNumber) * Number(groups!.rightNumber);
  }, 0);