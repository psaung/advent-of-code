const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(
  path.join(__dirname, "./seven_segment_search_data.txt"),
  {
    encoding: "utf8",
    flag: "r",
  }
);

function sortStr(str) {
  return str.split("").sort().join("");
}

function iterateEachSide(arr) {
  return arr
    .split(" ")
    .map((x) => x.split(" ")) // split
    .reduce((p, x) => [...p, ...x], []);
}

function solution1(data) {
  const inputs = data
    .split("\n")
    .map((x) => x.split(" | ")[1]) // just only need to pick 4 segments
    .map((x) => x.split(" ")) // split
    .reduce((p, x) => [...p, ...x], []); // and reduced them to a single array

  const range = [2, 4, 3, 7];

  return inputs.reduce((p, v) => (range.includes(v.length) ? p + 1 : p), 0);
}

function solution2(data) {
  const inputs = data.split("\n").map((x) => x.split(" | "));

  let sumTotal = 0;

  inputs.forEach((value) => {
    let [left, right] = value;
    left = iterateEachSide(left);
    right = iterateEachSide(right);

    const range = {
      2: 1,
      3: 7,
      4: 4,
      7: 8,
    };

    let dict = {};

    const digit6 = [];
    const digit5 = [];

    left.forEach((x) => {
      if (range[x.length]) {
        dict[range[x.length]] = x;
      }
      if (x.length === 6) digit6.push(x);
      if (x.length === 5) digit5.push(x);
    });

    // digit6
    digit6.forEach((x) => {
      if (
        dict[1].split("").some((y) => sortStr(x).indexOf(y) < 0) &&
        !dict[6]
      ) {
        dict[6] = x;
        return;
      }

      if (
        dict[4].split("").some((y) => sortStr(x).indexOf(y) < 0) &&
        !dict[0]
      ) {
        dict[0] = x;
        return;
      }

      if (!dict[9]) {
        dict[9] = x;
      }
    });

    digit5.forEach((x) => {
      if (x.split("").every((y) => dict[6].indexOf(y) >= 0) && !dict[5]) {
        dict[5] = x;
        return;
      }

      if (x.split("").every((y) => dict[9].indexOf(y) >= 0) && !dict[3]) {
        dict[3] = x;
        return;
      }

      if (!dict[2]) {
        dict[2] = x;
      }
    });
    const flip = Object.keys(dict)
      .map((v) => ({ [sortStr(dict[v])]: v }))
      .reduce((p, v) => ({ ...p, ...v }), {});

    const sum = right.map((v) => flip[sortStr(v)]).reduce((p, v) => p + v, "");

    sumTotal += parseInt(sum);
  });

  return sumTotal;
}

console.log(solution1(data));
console.log(solution2(data));
