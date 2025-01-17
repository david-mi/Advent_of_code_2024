import { inputExample } from "./inputs/input_example";
import { input } from "./inputs/input";
import { setInputLinesToArray } from "../../helpers";

function getPagesOrderingRules(lines: string[]) {
  return lines.map((line) => {
    return line.split("|").map(Number) as [number, number];
  });
}

function getPageNumbers(lines: string[]) {
  return lines.map((line) => {
    return line.split(",").map(Number);
  });
}

const pageOrderingRules = getPagesOrderingRules(setInputLinesToArray(input[0]!));
const pagesNumbers = getPageNumbers(setInputLinesToArray(input[1]!));

function getSumOfValidMiddlePages(pageOrderingRules: [number, number][], pagesNumbers: number[][]) {
  let sumOfValidMiddlePages = 0;

  pagesNumbersLoop: for (const pageNumbers of pagesNumbers) {
    const filteredPageOrderingRules = pageOrderingRules.filter(([leftOrder, rightOrder]) => {
      return pageNumbers.includes(leftOrder) && pageNumbers.includes(rightOrder);
    });

    for (const [leftOrder, rightOrder] of filteredPageOrderingRules) {
      if (pageNumbers.indexOf(leftOrder) > pageNumbers.indexOf(rightOrder)) {
        continue pagesNumbersLoop;
      };
    }

    sumOfValidMiddlePages += pageNumbers[Math.floor(pageNumbers.length / 2)]!;
  }

  return sumOfValidMiddlePages;
}

export const day05PartOneSolution = getSumOfValidMiddlePages(pageOrderingRules, pagesNumbers);