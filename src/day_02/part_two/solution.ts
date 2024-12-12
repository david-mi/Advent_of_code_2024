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

function validateReport(report: number[], errors = 0): boolean {
  let previousLevelProgressionType: null | LevelProgressionType = null;
  let isReportValid = true;

  mainLoop: for (let i = 0; i < report.length - 1; i++) {
    const nextLevelDelta = report[i + 1]! - report[i]!;

    try {
      validateNextLevelDelta(nextLevelDelta);
      previousLevelProgressionType = validateLevelProgressionType(previousLevelProgressionType, nextLevelDelta);
    } catch (error) {
      if (errors === 1) return false;

      for (let k = 0; k < report.length; k++) {
        isReportValid = validateReport(report.toSpliced(k, 1), errors = 1);
        if (isReportValid) break mainLoop;
      }
    }
  }

  return isReportValid;
}

function validateLevelProgressionType(previousLevelProgressionType: null | LevelProgressionType, nextLevelDelta: number) {
  const currentLevelProgressionType = nextLevelDelta > 0
    ? "increase"
    : "decrease";

  if (previousLevelProgressionType !== null && currentLevelProgressionType !== previousLevelProgressionType) {
    throw new Error("Current level progression type differs from previous one");
  }

  return currentLevelProgressionType;
}

function validateNextLevelDelta(nextLevelDelta: number) {
  const reportAbsoluteDelta = Math.abs(nextLevelDelta);

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

export const day02PartTwoSolutionRefacto = countSafeReports(reports);