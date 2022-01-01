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

module.exports = {
  compare,
  flipbit,
  extractBinary,
  extract,
};
