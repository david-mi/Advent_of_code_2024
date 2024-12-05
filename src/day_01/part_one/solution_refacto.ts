import { input } from "./inputs/input";
import { setInputLinesToArray } from "../../helpers";

const inputLines = setInputLinesToArray(input);

function getNumbersLists(inputLines: string[]) {
  return inputLines.reduce<[number[], number[]]>(([leftNumbersList, rightNumbersList], inputLine) => {
    const [leftNumberToString, rightNumberToString] = inputLine.match(/\d+/g)!;

    leftNumbersList.push(Number(leftNumberToString));
    rightNumbersList.push(Number(rightNumberToString));

    return [leftNumbersList, rightNumbersList];
  }, [[], []]);
}

const [leftNumbersList, rightNumbersList] = getNumbersLists(inputLines);

const leftNumbersListInAscendingOrder = leftNumbersList.sort((nextNumber, previousNumber) => nextNumber - previousNumber);
const rightNumbersListInAscendingOrder = rightNumbersList.sort((nextNumber, previousNumber) => nextNumber - previousNumber);

function getTotalDistanceBetweenLists(leftNumbersList: number[], rightNumbersList: number[]): number {
  return rightNumbersList.reduce((totalDistanceBetweenLists, rightNumber, index) => {
    return totalDistanceBetweenLists += Math.abs(rightNumber - leftNumbersList[index]!);
  }, 0);
}

export const day01PartOneSolutionRefacto = getTotalDistanceBetweenLists(
  leftNumbersListInAscendingOrder,
  rightNumbersListInAscendingOrder
);