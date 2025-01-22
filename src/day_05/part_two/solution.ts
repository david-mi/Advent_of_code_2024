import { inputExample, inputExample2 } from "./inputs/input_example";
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

function filterPageOrderingRules(pageOrderingRules: [number, number][], pageNumbers: number[]) {
  return pageOrderingRules.filter(([leftOrder, rightOrder]) => {
    return pageNumbers.includes(leftOrder) && pageNumbers.includes(rightOrder);
  });
};

type UnorderedPagesNumbersWithRules = {
  orderingRules: [number, number][],
  pageNumbers: number[];
}[];

function getPagesNumbersWithRules(pageOrderingRules: [number, number][], pagesNumbers: number[][]) {
  const unorderedPagesNumbersWithRules: UnorderedPagesNumbersWithRules = [];

  pagesNumbersLoop: for (const pageNumbers of pagesNumbers) {
    const filteredPageOrderingRules = filterPageOrderingRules(pageOrderingRules, pageNumbers);

    for (const [leftOrder, rightOrder] of filteredPageOrderingRules) {
      if (pageNumbers.indexOf(leftOrder) > pageNumbers.indexOf(rightOrder)) {
        unorderedPagesNumbersWithRules.push({ orderingRules: filteredPageOrderingRules, pageNumbers });
        continue pagesNumbersLoop;
      };
    }
  }

  return unorderedPagesNumbersWithRules;
}

function changeArrayElementIndex(
  array: number[],
  elementToMoveIndex: number,
  elementToPlaceAfter: number,
) {
  const arrayCopy = [...array];

  const removedElement = arrayCopy.splice(elementToMoveIndex, 1)[0] as number;

  const elementToPlaceAfterIndex = arrayCopy.indexOf(elementToPlaceAfter);

  arrayCopy.splice(elementToPlaceAfterIndex + 1, 0, removedElement);

  return arrayCopy;
}

function orderPagesNumbers(pagesNumbersWithRules: UnorderedPagesNumbersWithRules) {
  let orderedPagesNumbers: number[][] = [];

  for (let { orderingRules, pageNumbers } of pagesNumbersWithRules) {
    let isPageOrderingDone = false;

    whileloop: while (isPageOrderingDone === false) {
      for (const [leftOrder, rightOrder] of orderingRules) {
        const leftOrderIndex = pageNumbers.indexOf(leftOrder);
        const rightOrderIndex = pageNumbers.indexOf(rightOrder);

        if (leftOrderIndex > rightOrderIndex) {
          pageNumbers = changeArrayElementIndex(pageNumbers, rightOrderIndex, leftOrder);
          continue whileloop;
        };
      }

      isPageOrderingDone = true;
    }


    orderedPagesNumbers.push(pageNumbers);
  }

  return orderedPagesNumbers;
};

function getSumOfMiddlePagesNumbers(pagesNumbers: number[][]) {
  return pagesNumbers.reduce((sumOfMiddlePagesNumbers, pageNumbers) => {
    return sumOfMiddlePagesNumbers += pageNumbers[Math.floor(pageNumbers.length / 2)]!;
  }, 0);
}

const pageOrderingRules = getPagesOrderingRules(setInputLinesToArray(input[0]!));
const pagesNumbers = getPageNumbers(setInputLinesToArray(input[1]!));

const pagesNumbersWithRules = getPagesNumbersWithRules(pageOrderingRules, pagesNumbers);
const orderedPagesNumbers = orderPagesNumbers(pagesNumbersWithRules);
const sumOfMiddlePagesNumbers = getSumOfMiddlePagesNumbers(orderedPagesNumbers);

export const day05PartTwoSolution = sumOfMiddlePagesNumbers;