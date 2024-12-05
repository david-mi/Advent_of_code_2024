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


function getRightNumbersListOccurences(rightNumbersList: number[]) {
  return rightNumbersList.reduce((rightListOccurences, rightNumber) => {
    const rightNumberOccurences = rightListOccurences.get(rightNumber);

    return rightListOccurences.set(
      rightNumber,
      rightNumberOccurences !== undefined ? rightNumberOccurences + 1 : 1
    );
  }, new Map<number, number>);
}

function getListsSimilaritiesScore(leftNumbersList: number[], rightListOccurences: Map<number, number>) {
  return leftNumbersList.reduce((listsSimilaritiesScore, leftNumber) => {
    return listsSimilaritiesScore += leftNumber * (rightListOccurences.get(leftNumber) || 0);
  }, 0);
}

export const day01PartTwoSolutionRefacto = getListsSimilaritiesScore(
  leftNumbersList,
  getRightNumbersListOccurences(rightNumbersList)
);