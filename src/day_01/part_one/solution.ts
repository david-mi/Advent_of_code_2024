import { inputExample } from "./inputs/input_example";
import { input } from "./inputs/input";
import { setInputLinesToArray } from "../../helpers";

const lists = setInputLinesToArray(input);

const parsedLists = lists.map((line) => {
  return line
    .split(/\s+/)
    .map(Number);
});

function getListsInAscendingOrder(lists: number[][]) {
  const leftNumbersList: number[] = [];
  const rightNumbersList: number[] = [];

  lists.forEach(([leftNumber, rightNumber]) => {
    leftNumbersList.push(leftNumber as number);
    rightNumbersList.push(rightNumber as number);
  });

  const leftNumbersListInAscendingOrder = leftNumbersList.sort((nextNumber, previousNumber) => nextNumber - previousNumber);
  const rightNumbersListInAscendingOrder = rightNumbersList.sort((nextNumber, previousNumber) => nextNumber - previousNumber);

  return { leftNumbersListInAscendingOrder, rightNumbersListInAscendingOrder };
}

const { leftNumbersListInAscendingOrder, rightNumbersListInAscendingOrder } = getListsInAscendingOrder(parsedLists);

function getTotalDistanceBetweenLists(leftNumbersList: number[], rightNumbersList: number[]): number {
  return rightNumbersList.reduce((totalDistanceBetweenLists, rightNumber, index) => {
    return totalDistanceBetweenLists += Math.abs(rightNumber - leftNumbersList[index]!);
  }, 0);
}

export const day01PartOneSolution = getTotalDistanceBetweenLists(
  leftNumbersListInAscendingOrder,
  rightNumbersListInAscendingOrder
);