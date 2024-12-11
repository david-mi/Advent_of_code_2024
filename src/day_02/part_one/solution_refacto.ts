import { inputExample } from "./inputs/input_example";
import { input } from "./inputs/input";
import { setInputLinesToArray } from "../../helpers";

type LevelProgressionType = "increase" | "decrease";

function parseReports(reports: string[]) {
  return reports.map((report) => {
    return report
      .split(/\s/)
      .map(Number);
  });
}

const reports = parseReports(setInputLinesToArray(input));

function validateReport(report: number[]) {
  let previousLevelProgressionType: null | LevelProgressionType = null;

  for (let i = 0; i < report.length - 1; i++) {
    const currentLevel = report[i] as number;
    const nextLevel = report[i + 1] as number;
    const delta = nextLevel - currentLevel;

    try {
      validateLevelAbsoluteDelta(delta);
      previousLevelProgressionType = validateLevelProgressionType(previousLevelProgressionType, delta);
    } catch (error) {
      return false;
    }
  }

  return true;
}

function validateLevelProgressionType(previousLevelProgressionType: null | LevelProgressionType, delta: number) {
  const currentLevelProgressionType = delta > 0
    ? "increase"
    : "decrease";

  if (previousLevelProgressionType !== null && currentLevelProgressionType !== previousLevelProgressionType) {
    throw new Error("Current level progression type differs from previous one");
  }

  return currentLevelProgressionType;
}

function validateLevelAbsoluteDelta(reportDelta: number) {
  const reportAbsoluteDelta = Math.abs(reportDelta);

  if (reportAbsoluteDelta < 1 || reportAbsoluteDelta > 3) {
    throw new Error("Level delta is outside threshold");
  }
}

function countSafeReports(reports: number[][]) {
  return reports.reduce((safeReportsCount, report) => {
    const validation = validateReport(report);
    return safeReportsCount += Number(validation);
  }, 0);
}

export const day02PartOneSolutionRefacto = countSafeReports(reports);