const fs = require("fs");
const path = require("path");

const inputs = fs.readFileSync(
  path.join(__dirname, "./hydrothermal_venture_data.txt"),
  {
    encoding: "utf8",
    flag: "r",
  }
);

function solution1(inputs) {
  let result = inputs.split("\n").map((v) => v.split(" -> "));

  const splitGridData = result.map((x) =>
    x.map((v) => v.split(",").map((v) => parseInt(v)))
  );

  const gridData = splitGridData.filter((x) => {
    return x[0][1] === x[1][1] || x[1][0] === x[0][0];
  });

  function drawRange(start, end, plane, val) {
    const [s, e] = [start, end].sort((a, b) => a - b);
    return Array.from(new Array(e - s + 1)).map((_, k) => {
      if (plane === "x") {
        return `${val},${s + k}`;
      }
      return `${s + k},${val}`;
    });
  }

  const data = gridData.reduce((p, v) => {
    const [[x1, y1], [x2, y2]] = v;
    if (x1 === x2) {
      return [...p, drawRange(y1, y2, "x", x1)];
    }
    return [...p, drawRange(x1, x2, "y", y1)];
  }, []);

  let count = {};
  let r = [];

  data.forEach((v) => {
    v.forEach((vv) => {
      count[vv] = (count[vv] || 0) + 1;
      if (count[vv] > 1 && r.indexOf(vv) < 0) {
        r.push(vv);
      }
    });
  });
  console.log(r.length);
}

solution1(inputs);
