import { inputExample } from "./inputs/input_example";
import { input } from "./inputs/input";
import { setInputLinesToArray } from "../../helpers";

const linesOfLetters = setInputLinesToArray(input);

let xmasMatchesCount = 0;
const XMAS_WORD_LENGTH = 4;

function countXmasMatchesFromLetters(letters: string) {
  const xmasRegex = /XMAS/g;
  const reverseXmasRegex = /SAMX/g;

  const xmasMatchesInOrderCount = letters.match(xmasRegex)?.length || 0;
  const xmasMatchesInReverseCount = letters.match(reverseXmasRegex)?.length || 0;

  return xmasMatchesInOrderCount + xmasMatchesInReverseCount;
}

function getHorizontalXmasWordOccurences(linesOfLetters: string[], word = "XMAS") {
  let horizontalXmasWordOccurences = 0;

  for (const lineOfLetter of linesOfLetters) {
    horizontalXmasWordOccurences += countXmasMatchesFromLetters(lineOfLetter);
  }

  return horizontalXmasWordOccurences;
};

function getVerticalXmasWordOccurences(linesOfLetters: string[]) {
  let verticalXmasWordOccurences = 0;

  for (let i = 0; i < linesOfLetters.length; i++) {
    let verticalLineOfLetters = "";

    for (let k = 0; k < linesOfLetters.length; k++) {
      verticalLineOfLetters += linesOfLetters[k]![i];
    }

    verticalXmasWordOccurences += countXmasMatchesFromLetters(verticalLineOfLetters);
  }

  return verticalXmasWordOccurences;
}

function getTopLeftToTopRightDiagonalXmasWordOccurences(linesOfLetters: string[]) {
  let topLeftToTopRightDiagonalXmasWordOccurences = 0;

  for (let i = 0; i <= linesOfLetters.length - XMAS_WORD_LENGTH; i++) {
    let diagonalLineOfLetters = "";

    for (let k = 0; k < linesOfLetters.length; k++) {
      const letter = linesOfLetters[k]![k + i];
      if (letter === undefined) break;

      diagonalLineOfLetters += letter;
    }

    topLeftToTopRightDiagonalXmasWordOccurences += countXmasMatchesFromLetters(diagonalLineOfLetters);
  }

  return topLeftToTopRightDiagonalXmasWordOccurences;
}

function getTopRightToTopLeftDiagonalXmasWordOccurences(linesOfLetters: string[]) {
  let topRightToTopLeftDiagonalXmasWordOccurences = 0;

  for (let i = linesOfLetters.length - 1; i >= XMAS_WORD_LENGTH - 1; i--) {
    let diagonalLineOfLetters = "";

    for (let k = 0; k < linesOfLetters.length; k++) {
      const letter = linesOfLetters[k]![i - k];
      if (letter === undefined) break;

      diagonalLineOfLetters += letter;
    }

    topRightToTopLeftDiagonalXmasWordOccurences += countXmasMatchesFromLetters(diagonalLineOfLetters);
  }

  return topRightToTopLeftDiagonalXmasWordOccurences;
}

function getBottomLeftToBottomRightDiagonalXmasWordOccurences(linesOfLetters: string[]) {
  let bottomLeftToBottomRightDiagonalXmasWordOccurences = 0;

  for (let i = 1; i <= linesOfLetters.length - XMAS_WORD_LENGTH; i++) {
    let diagonalLineOfLetters = "";

    for (let k = 0; k < linesOfLetters.length; k++) {
      const letter = linesOfLetters[linesOfLetters.length - 1 - k]![k + i];
      if (letter === undefined) break;

      diagonalLineOfLetters += letter;
    }

    bottomLeftToBottomRightDiagonalXmasWordOccurences += countXmasMatchesFromLetters(diagonalLineOfLetters);
  }

  return bottomLeftToBottomRightDiagonalXmasWordOccurences;
}

function getBottomRightToBottomLeftDiagonalXmasWordOccurences(linesOfLetters: string[]) {
  let bottomRightToBottomLeftDiagonalXmasWordOccurences = 0;

  for (let i = 1; i <= linesOfLetters.length - XMAS_WORD_LENGTH; i++) {
    let diagonalLineOfLetters = "";

    for (let k = linesOfLetters.length - 1; k >= 0; k--) {
      const letter = linesOfLetters[k]![k - i];
      if (letter === undefined) break;

      diagonalLineOfLetters += letter;
    }

    bottomRightToBottomLeftDiagonalXmasWordOccurences += countXmasMatchesFromLetters(diagonalLineOfLetters);
  }

  return bottomRightToBottomLeftDiagonalXmasWordOccurences;
}

xmasMatchesCount = (
  getHorizontalXmasWordOccurences(linesOfLetters) +
  getVerticalXmasWordOccurences(linesOfLetters) +
  getTopLeftToTopRightDiagonalXmasWordOccurences(linesOfLetters) +
  getTopRightToTopLeftDiagonalXmasWordOccurences(linesOfLetters) +
  getBottomLeftToBottomRightDiagonalXmasWordOccurences(linesOfLetters) +
  getBottomRightToBottomLeftDiagonalXmasWordOccurences(linesOfLetters)
);

export const day04PartOneSolution = xmasMatchesCount;
