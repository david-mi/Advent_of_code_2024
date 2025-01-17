import { inputExample } from "./inputs/input_example";
import { input } from "./inputs/input";
import { setInputLinesToArray } from "../../helpers";

const linesOfLetters = setInputLinesToArray(input);

function isX_masMatch(
  tL: string,
  tR: string,
  mid: string,
  bL: string,
  bR: string
) {
  return (
    /MAS|SAM/.test(tL + mid + bR) &&
    /MAS|SAM/.test(bL + mid + tR)
  );
}

function countX_masMatches(linesOfLetters: string[]) {
  let x_masMatchesCount = 0;

  for (let i = 0; i < linesOfLetters.length - 2; i++) {
    const topLine = linesOfLetters[i] as string;
    const middleLine = linesOfLetters[i + 1] as string;
    const bottomLine = linesOfLetters[i + 2] as string;

    for (let k = 0; k < topLine.length - 2; k++) {
      const tL = topLine[k] as string;
      const tR = topLine[k + 2] as string;
      const mid = middleLine[k + 1] as string;
      const bL = bottomLine[k] as string;
      const bR = bottomLine[k + 2] as string;

      x_masMatchesCount += Number(isX_masMatch(tL, tR, mid, bL, bR));
    }
  }

  return x_masMatchesCount;
}

export const day04PartTwoSolution = countX_masMatches(linesOfLetters);