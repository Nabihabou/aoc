const file = Deno.readTextFileSync("input.txt");

const DIGITS = 5;
const SPACES = 3;

function parseFileText(text: string) {
  let firstCol: string[] = [];
  let secondCol: string[] = [];

  let pointer = 0;

  while (text.length > 0) {
    pointer = 0;

    // read fist column
    const first = text.slice(pointer, DIGITS + pointer);
    firstCol.push(first);
    pointer += first.length;

    // skip 3 spaces
    pointer += SPACES;

    // read second column
    const second = text.slice(pointer, DIGITS + pointer);
    secondCol.push(second);
    pointer += second.length;

    // remove line that was just read
    text = text.slice(pointer, text.length).trim();
  }

  return {
    first: firstCol.sort((a, b) => Number(a) - Number(b)),
    second: secondCol.sort((a, b) => Number(a) - Number(b)),
  };
}

function main() {
  const { first, second } = parseFileText(file);

  let totalDistance = 0;
  let similarityScore = 0;
  for (let i = 0; i < first.length; i++) {
    // first part
    const distance = Math.abs(Number(first[i]) - Number(second[i]));
    totalDistance += distance;

    // second part
    for (let j = 0; j < second.length; j++) {
      if (second[j] === first[i]) {
        similarityScore += Number(first[i]);
      }
    }
  }

  console.log("result 1:", totalDistance); // result 1
  console.log("result 2:", similarityScore); // result 2
}

main();
