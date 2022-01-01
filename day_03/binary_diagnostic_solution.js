const fs = require("fs");

const data = fs.readFileSync("./binary_diagnostic_data.txt", {
  encoding: "utf8",
  flag: "r",
});

const inputs = data.split("\n");

function flipbit(binary) {
  return binary
    .split("")
    .map((b) => (1 - b).toString())
    .join("");
}

function extractBinary(binary) {
  return parseInt(binary, 2);
}

function extract(numbers, index, binary) {
  return numbers.reduce(
    ([left, right], x) =>
      x[index] === binary ? [[...left, x], right] : [left, [...right, x]],
    [[], []]
  );
}

function compare(minArr, maxArr, compareCase = "min") {
  if (minArr.length === maxArr.length) {
    return compareCase === "min" ? minArr : maxArr;
  }

  if (compareCase === "min") {
    return minArr.length < maxArr.length ? minArr : maxArr;
  }

  if (compareCase === "max") {
    return minArr.length < maxArr.length ? maxArr : minArr;
  }

  throw new Error("Unexpected error occurred");
}

function solution1(data) {
  if (data.length < 1) return 0;

  let gamma = [];
  let index = 0;
  while (index <= data[0].length - 1) {
    const { zeros, ones } = data.reduce(
      (p, x) =>
        x[index] === "0"
          ? { ...p, zeros: p.zeros + 1 }
          : { ...p, ones: p.ones + 1 },
      { zeros: 0, ones: 0 }
    );
    gamma += zeros > ones ? "0" : "1";
    index += 1;
  }

  const epsilon = flipbit(gamma);

  return extractBinary(epsilon) * extractBinary(gamma);
}

function solution2(data) {
  if (data.length < 0) return 0;

  const binaryPlaces = data[0].length;
  let index = 1;
  let [zeros, ones] = extract(data, index - 1, "0");

  while (index <= binaryPlaces - 1) {
    if (ones.length > 1) {
      const [o, z] = extract(ones, index, "1");
      ones = compare(z, o, "max");
    }

    if (zeros.length > 1) {
      const [z, o] = extract(zeros, index, "0");
      zeros = compare(z, o, "min");
    }

    index += 1;
  }

  return parseInt(zeros[0], 2) * parseInt(ones[0], 2);
}

console.log(solution1(inputs));
console.log(solution2(inputs));
