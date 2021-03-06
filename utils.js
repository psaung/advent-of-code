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

function sumAll(arr) {
  return arr.reduce((p, v) => p + parseInt(v), 0);
}

function deepClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

function getDirection(v, row, rowCount) {
  return [
    /*left*/ v % rowCount > 0 ? v - 1 : null,
    /*right*/ v < (parseInt(v / rowCount) + 1) * rowCount - 1 ? v + 1 : null,
    /*top*/ v > rowCount - 1 ? v - rowCount : null,
    /*bottom*/ v < (row - 1) * rowCount ? v + rowCount : null,
  ];
}

module.exports = {
  compare,
  flipbit,
  extractBinary,
  extract,
  sumAll,
  deepClone,
};
