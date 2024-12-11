import { inputExample } from "./inputs/input_example";
import { input } from "./inputs/input";
import { setInputLinesToArray } from "../../helpers";

function parseReports(reports: string[]) {
  return reports.map((report) => {
    return report
      .split(/\s/)
      .map(Number);
  });
}

const reports = parseReports(setInputLinesToArray(input));

function validateReport(report: number[]) {
  let levelsProgressionType: null | "increase" | "decrease" = null;

  for (let i = 0; i < report.length - 1; i++) {
    const currentLevel = report[i] as number;
    const nextLevel = report[i + 1] as number;
    const delta = nextLevel - currentLevel;
    const absoluteDelta = Math.abs(delta);
    let isSafe = absoluteDelta >= 1 && absoluteDelta <= 3;

    if (isSafe === false) {
      return false;
    }

    if (delta > 0) {
      if (levelsProgressionType === "decrease") {
        return false;
      };
      levelsProgressionType = "increase";
    } else {
      if (levelsProgressionType === "increase") {
        return false;
      };
      levelsProgressionType = "decrease";
    }
  }

  return true;
}

function countSafeReports(reports: number[][]) {
  return reports.reduce((safeReportsCount, report) => {
    const validation = validateReport(report);
    return safeReportsCount += Number(validation);
  }, 0);
}

export const day02PartOneSolution = countSafeReports(reports);