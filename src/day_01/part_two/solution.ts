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


function getListsSimilaritiesScore(leftList: number[], rightList: number[]) {
  let listsSimilaritiesScore = 0;
  const rightListOccurences = new Map<number, number>;

  for (const rightNumber of rightList) {
    const rightNumberOccurences = rightListOccurences.get(rightNumber);

    rightListOccurences.set(
      rightNumber,
      rightNumberOccurences !== undefined ? rightNumberOccurences + 1 : 1
    );
  }

  for (const leftNumber of leftList) {
    const rightNumberOccurences = rightListOccurences.get(leftNumber) || 0;

    listsSimilaritiesScore += leftNumber * rightNumberOccurences;
  }

  return listsSimilaritiesScore;
}

export const day01PartTwoSolution = getListsSimilaritiesScore(leftNumbersList, rightNumbersList);