const fs = require("fs");
const path = require("path");

const inputs = fs.readFileSync(
  path.join(__dirname, "./hydrothermal_venture_data.txt"),
  {
    encoding: "utf8",
    flag: "r",
  }
);

function drawStraight(start, end, plane, val) {
  const [s, e] = [start, end].sort((a, b) => a - b);
  return Array.from(new Array(e - s + 1)).map((_, k) => {
    if (plane === "x") {
      return `${val},${s + k}`;
    }
    return `${s + k},${val}`;
  });
}

function range(p1, p2) {
  const abss = p1 - p2;
  const [l, s] = [p1, p2].sort((a, b) => a - b);
  return Array.from(new Array(Math.abs(abss) + 1)).map((_, k) => {
    return abss < 0 ? l + k : s - k;
  });
}

function drawDiagonal(x0, y0, x1, y1) {
  const a = range(x0, x1);
  const b = range(y0, y1);
  let result = [];
  a.forEach((x, k) => {
    result.push(`${x},${b[k]}`);
  });
  return result;
}

function solution1(inputs) {
  let result = inputs.split("\n").map((v) => v.split(" -> "));
  let count = {};

  const splitGridData = result.map((x) =>
    x.map((v) => v.split(",").map((v) => parseInt(v)))
  );

  const gridData = splitGridData.filter((x) => {
    return x[0][1] === x[1][1] || x[1][0] === x[0][0];
  });

  gridData.forEach((v) => {
    const [[x1, y1], [x2, y2]] = v;
    let arr = [];
    if (x1 === x2) {
      arr = drawStraight(y1, y2, "x", x1);
    } else {
      arr = drawStraight(x1, x2, "y", y1);
    }
    arr.forEach((a) => {
      count[a] = (count[a] || 0) + 1;
    });
  });

  console.log(Object.keys(count).filter((key) => count[key] > 1).length);
}

function solution2(inputs) {
  let result = inputs.split("\n").map((v) => v.split(" -> "));
  const gridData = result.map((x) =>
    x.map((v) => v.split(",").map((v) => parseInt(v)))
  );

  let count = {};

  gridData.forEach((v) => {
    let arr = [];
    const [[x1, y1], [x2, y2]] = v;
    if (x1 === x2 || y1 === y2) {
      arr =
        x1 === x2
          ? drawStraight(y1, y2, "x", x1)
          : drawStraight(x1, x2, "y", y1);
    } else {
      arr = drawDiagonal(x1, y1, x2, y2);
    }
    arr.forEach((a) => {
      count[a] = (count[a] || 0) + 1;
    });
  });

  console.log(Object.keys(count).filter((key) => count[key] > 1).length);
}

solution1(inputs);
solution2(inputs);
