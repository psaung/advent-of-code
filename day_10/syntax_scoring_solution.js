const fs = require("fs");
const path = require("path");

const inputs = fs.readFileSync(
  path.join(__dirname, "./syntax_scoring_data.txt"),
  {
    encoding: "utf8",
    flag: "r",
  }
);

function solution1(data) {
  const inputs = data.split("\n");

  const match = {
    "[": "]",
    "<": ">",
    "(": ")",
    "{": "}",
  };
  const closing = Object.keys(match).map((x) => match[x]);

  const value = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  function findCorruptedItems(str) {
    const len = str.length;

    const lane = [];

    if (closing.includes(str[0])) {
      return true;
    }

    for (let start = 0; start < len - 1; start++) {
      if (closing.includes(str[start])) {
        const dd = lane.pop();

        if (match[dd] !== str[start]) {
          return str[start];
        }
      } else {
        lane.push(str[start]);
      }
    }

    return null;
  }

  return inputs.reduce((p, str) => {
    const point = findCorruptedItems(str);
    return p + (point ? value[point] : 0);
  }, 0);
}

console.log(solution1(inputs));
