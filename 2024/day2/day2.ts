const file = Deno.readTextFileSync("input.txt");

const MIN_DIFF = 1;
const MAX_DIFF = 3;

function check1(report: number[]): boolean {
  let left = report[0];
  let decreasing = false;
  let increasing = false;

  for (const cell in report) {
    if (cell === "0") continue;

    if (report[cell] > left) {
      increasing = true;
    } else {
      decreasing = true;
    }

    if (report[cell] === left) {
      return false;
    }

    left = report[cell];
  }

  return !(decreasing && increasing);
}

function check2(report: number[]) {
  for (let i = 1; i < report.length - 1; i++) {
    const left = Math.abs(report[i] - report[i - 1]) || 0;
    const right = Math.abs(report[i] - report[i + 1]) || 0;

    if (
      left < MIN_DIFF ||
      left > MAX_DIFF ||
      right < MIN_DIFF ||
      right > MAX_DIFF
    )
      return false;
  }

  return true;
}

function check3(report: number[]): boolean {
  for (let i = 0; i <= report.length; i++) {
    if (isSafe(report.filter((_, idx) => i !== idx))) {
      return true;
    }
  }

  return false;
}

function isSafe(report: number[]): boolean {
  return check1(report) && check2(report);
}

function main() {
  const lines = file.split("\n");
  const reports: number[][] = [];

  for (const report of lines) {
    reports.push(report.split(" ").map((v) => Number(v)));
  }

  let safe = 0;
  let safe2 = 0;
  for (const report of reports) {
    if (isSafe(report)) safe++;
    else check3(report) ? safe2++ : void 0;
  }

  console.log(safe, safe2, safe + safe2);
}

main();
