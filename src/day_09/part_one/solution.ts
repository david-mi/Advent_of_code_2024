import { input as diskMap } from "./inputs/input";
import { inputExample, inputExample2 } from "./inputs/input_example";

type EmptySpace = ".";
type File = number;
type Block = EmptySpace | File;

function decode(diskMap: string) {
  let decodedDiskMap: Block[] = [];
  let currentFileBlockId = 0;

  for (let i = 0; i < diskMap.length; i += 2) {
    const fileBlockSize = Number(diskMap[i]);

    for (let j = 0; j < fileBlockSize; j++) {
      decodedDiskMap.push(currentFileBlockId);
    }

    if (i < diskMap.length - 1) {
      const spaceBlockSize = Number(diskMap[i + 1]);

      for (let k = 0; k < spaceBlockSize; k++) {
        decodedDiskMap.push(".");
      }
    }

    currentFileBlockId++;
  }

  return decodedDiskMap;
}

function compact(decodedDiskMap: Block[]) {
  const decodedDiskMapClone = [...decodedDiskMap];
  let latestEmptySpaceIndex: undefined | number = undefined;

  for (let i = decodedDiskMapClone.length - 1; i >= 0; i--) {
    if (decodedDiskMapClone[i] === ".") continue;

    latestEmptySpaceIndex = decodedDiskMapClone.indexOf(".", latestEmptySpaceIndex || undefined);
    if (latestEmptySpaceIndex === -1) break;

    decodedDiskMapClone[latestEmptySpaceIndex] = decodedDiskMapClone.pop() as number;
  }

  return decodedDiskMapClone as number[];
}

function getCheckSum(compactedDiskMap: Block[]) {
  return compactedDiskMap.reduce<number>((checkSum, block, index) => block === "."
    ? checkSum
    : checkSum += index * block, 0);
}

const decodedDiskMap = decode(diskMap);
const compactedDiskMap = compact(decodedDiskMap);
export const day09PartOneSolution = getCheckSum(compactedDiskMap);