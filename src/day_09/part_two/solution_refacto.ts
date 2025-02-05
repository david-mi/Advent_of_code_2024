import { input as diskMap } from "./inputs/input";
import { inputExample, inputExample2, inputExample3, inputExample4 } from "./inputs/input_example";

type FreeSpace = ".";
type File = number;
type Block = FreeSpace | File;

function isEven(number: number) {
  return number % 2 === 0;
}

function unformat(diskMap: string) {
  let unformattedDiskMap: Block[] = [];

  for (let i = 0; i < diskMap.length; i++) {
    const blockId = Number(diskMap[i]);
    const blocks = new Array(blockId).fill(isEven(i) ? i / 2 : ".");

    unformattedDiskMap.push(...blocks);
  }

  return unformattedDiskMap;
}

function isFreeSpace(block: Block) {
  return block === ".";
}

function findFreeSpace(
  { layout, freeSpaceNeeded, startIndex = 0, endIndex }
    : { layout: Block[], freeSpaceNeeded: number, startIndex?: number, endIndex?: number; }
) {
  let currentAvailableSpace = 0;

  for (let i = startIndex; i <= (endIndex || layout.length); i++) {
    if (isFreeSpace(layout[i] as Block) === false) {
      currentAvailableSpace = 0;
      continue;
    }

    currentAvailableSpace++;

    if (currentAvailableSpace === freeSpaceNeeded) {
      return i + 1 - currentAvailableSpace;
    }
  }

  return -1;
}

function compact([...layout]: Block[]) {
  let firstFreeSpaceIndex = 0;

  for (let i = layout.length - 1; i >= 0; i--) {
    if (isFreeSpace(layout[i] as Block)) continue;

    firstFreeSpaceIndex = layout.indexOf(".", firstFreeSpaceIndex);
    if (firstFreeSpaceIndex === -1) break;

    const fileBlocksToMove: number[] = [layout[i] as number];

    while (layout[i] === layout[i - 1]) {
      fileBlocksToMove.push(layout[i - 1] as number);
      i--;
    }

    const freeSpaceIndex = findFreeSpace({
      layout,
      freeSpaceNeeded: fileBlocksToMove.length,
      startIndex: firstFreeSpaceIndex,
      endIndex: i
    });
    if (freeSpaceIndex === -1) continue;

    layout.splice(i, fileBlocksToMove.length, ...fileBlocksToMove.map((_) => ".") as Block[]);
    layout.splice(freeSpaceIndex, fileBlocksToMove.length, ...fileBlocksToMove);
  }

  return layout;
}

function getCheckSum(rearrangedDiskMap: Block[]) {
  return rearrangedDiskMap.reduce<number>((checkSum, block, index) => isFreeSpace(block)
    ? checkSum
    : checkSum += index * block, 0);
}

const layout = unformat(diskMap);
const compactedLayout = compact(layout);
export const day09PartOneSolutionRefacto = getCheckSum(compactedLayout);