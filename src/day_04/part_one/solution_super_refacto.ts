import { inputExample } from "./inputs/input_example";
import { input } from "./inputs/input";
import { setInputLinesToArray } from "../../helpers";

const linesOfLetters = setInputLinesToArray(input);

function countXmasMatchesFromLetters(lettersGroups: string[]) {
  return lettersGroups.reduce((xmasMatchesCount, lettersGroup) => xmasMatchesCount += (
    (lettersGroup.match(/XMAS/g)?.length || 0) +
    (lettersGroup.match(/SAMX/g)?.length || 0)
  ), 0);
}

function countXmasMatches(linesOfLetters: string[]) {
  return linesOfLetters.reduce((xmasMatchesCount, _, i) => {
    return xmasMatchesCount += countXmasMatchesFromLetters(
      linesOfLetters.reduce<[string, string, string, string, string, string]>(([__, vert, tLRD, tRLD, bLRD, bRLD], lineOfLetters, k) => {
        return [
          linesOfLetters[i]!,
          vert += lineOfLetters[i],
          tLRD += lineOfLetters[k + i] || "",
          tRLD += lineOfLetters[linesOfLetters.length - 1 - i - k] || "",
          bLRD += linesOfLetters[linesOfLetters.length - 1 - k]![k + i + 1] || "",
          bRLD += linesOfLetters[linesOfLetters.length - 1 - k]![linesOfLetters.length - 2 - i - k] || ""
        ];
      }, ["", "", "", "", "", ""])
    );
  }, 0);
}

export const day04PartOneSolutionSuperRefacto = countXmasMatches(linesOfLetters);