import { inputExample } from "./inputs/input_example";
import { input } from "./inputs/input";
import { setInputLinesToArray } from "../../helpers";

const linesOfLetters = setInputLinesToArray(input);

function countXmasMatchesFromLetters(letters: string) {
  const xmasRegex = /XMAS/g;
  const reverseXmasRegex = /SAMX/g;

  const xmasMatchesInOrderCount = letters.match(xmasRegex)?.length || 0;
  const xmasMatchesInReverseCount = letters.match(reverseXmasRegex)?.length || 0;

  return xmasMatchesInOrderCount + xmasMatchesInReverseCount;
}

function countXmasMatches(linesOfLetters: string[]) {
  let xmasMatchesCount = 0;

  for (let i = 0; i < linesOfLetters.length; i++) {
    let verticalLineOfLetters = "";
    let topLeftToRightDiagonalLineOfLetters = "";
    let topRightToLeftDiagonalLineOfLetters = "";
    let bottomLeftToRightDiagonalLineOfLetters = "";
    let bottomRightToLeftDiagonalLineOfLetters = "";

    for (let k = 0; k < linesOfLetters.length; k++) {
      verticalLineOfLetters += linesOfLetters[k]![i];
      topLeftToRightDiagonalLineOfLetters += linesOfLetters[k]![k + i] || "";
      topRightToLeftDiagonalLineOfLetters += linesOfLetters[k]![linesOfLetters.length - 1 - i - k] || "";
      bottomLeftToRightDiagonalLineOfLetters += linesOfLetters[linesOfLetters.length - 1 - k]![k + i + 1] || "";
      bottomRightToLeftDiagonalLineOfLetters += linesOfLetters[linesOfLetters.length - 1 - k]![linesOfLetters.length - 2 - i - k] || "";
    }

    xmasMatchesCount += (
      countXmasMatchesFromLetters(linesOfLetters[i]!) +
      countXmasMatchesFromLetters(verticalLineOfLetters) +
      countXmasMatchesFromLetters(topLeftToRightDiagonalLineOfLetters) +
      countXmasMatchesFromLetters(topRightToLeftDiagonalLineOfLetters) +
      countXmasMatchesFromLetters(bottomLeftToRightDiagonalLineOfLetters) +
      countXmasMatchesFromLetters(bottomRightToLeftDiagonalLineOfLetters)
    );
  }

  return xmasMatchesCount;
}

export const day04PartOneSolutionRefacto = countXmasMatches(linesOfLetters);
