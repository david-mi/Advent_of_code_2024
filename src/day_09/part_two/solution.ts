import { input as diskMap } from "./inputs/input";
import { inputExample, inputExample2, inputExample3, inputExample4 } from "./inputs/input_example";

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

function findAvailableDiskMapSpaceIndex(diskMap: Block[], spaceNeeded: number) {
  let currentAvailableSpace = 0;

  for (let i = 0; i < diskMap.length; i++) {
    const currentElement = diskMap[i];

    if (currentElement !== ".") {
      currentAvailableSpace = 0;
      continue;
    }

    currentAvailableSpace++;

    if (currentAvailableSpace === spaceNeeded) {
      return i + 1 - currentAvailableSpace;
    }
  }

  return -1;
}

function compact(decodedDiskMap: Block[]) {
  const decodedDiskMapClone = [...decodedDiskMap];
  let latestEmptySpaceIndex: undefined | number = undefined;

  for (let i = decodedDiskMapClone.length - 1; i >= 0; i--) {
    if (decodedDiskMapClone[i] === ".") {
      continue;
    }

    latestEmptySpaceIndex = decodedDiskMapClone.indexOf(".", latestEmptySpaceIndex || undefined);
    if (latestEmptySpaceIndex === -1) break;

    const storage: number[] = [decodedDiskMapClone[i] as number];

    while (decodedDiskMapClone[i - 1] === storage[0]) {
      storage.push(decodedDiskMapClone[i - 1] as number);
      i--;
    }

    const decodedDiskMapCloneSliced = decodedDiskMapClone.slice(0, i);
    const availableDiskMapSpaceIndex = findAvailableDiskMapSpaceIndex(decodedDiskMapCloneSliced, storage.length);
    if (availableDiskMapSpaceIndex === -1) continue;

    const dots: Block[] = storage.map((_) => ".");
    const blocksToMove = decodedDiskMapClone.splice(i, storage.length, ...dots);
    decodedDiskMapClone.splice(availableDiskMapSpaceIndex, storage.length, ...blocksToMove);
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