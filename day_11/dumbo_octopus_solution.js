const fs = require("fs");
const path = require("path");
const { getDirection } = require("../utils");

const inputs = fs.readFileSync(
  path.join(__dirname, "./dumbo_octopus_data.txt"),
  {
    encoding: "utf8",
    flag: "r",
  }
);

let flashes = 0;

function solution1(inputs, rows, cols, times) {
  let dict = {};
  let a9 = {};

  a9 = {};
  dict = {};

  function checkTheNeighbour(index, inputs) {
    getDirection(index, rows, cols)
      .filter((v) => v !== null && !a9[v])
      .forEach((v) => {
        if (!a9[v]) {
          dict[v] = dict[v] || parseInt(inputs[v]);

          dict[v] = parseInt(dict[v]) + 1;

          if (dict[v] > 9) {
            a9[v] = true;
            dict[v] = "0";
            flashes += 1;
            checkTheNeighbour(v, inputs);
          }
        }
      });
  }

  for (let i = 0; i < inputs.length; i++) {
    dict[i] = dict[i] || parseInt(inputs[i]);

    if (dict[i] >= 9 && !a9[i]) {
      a9[i] = true;
      dict[i] = "0";
      flashes += 1;
      checkTheNeighbour(i, inputs);
    } else {
      dict[i] =
        inputs[i] !== "0" && parseInt(dict[i]) === 0
          ? 0
          : parseInt(dict[i]) + 1;
      if (dict[i] > 9) {
        a9[i] = true;
        dict[i] = "0";
        flashes += 1;
        checkTheNeighbour(i, inputs);
      }
    }
  }

  const resultt = Object.keys(dict)
    .map((v) => dict[v])
    .reduce((p, v) => p + "" + v, "");

  if (times > 0) {
    return solution1(resultt, rows, cols, times - 1);
  }

  return flashes;
}

const i = inputs.split("\n").join("");
const cols = inputs.split("\n")[0].length;
const rows = inputs.split("\n").length;

console.log(solution1(i, cols, rows, 99));
