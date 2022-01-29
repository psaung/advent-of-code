const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(
  path.join(__dirname, "./extended_polymerization_data.txt"),
  // path.join(__dirname, "./test_data.txt"),
  {
    encoding: "utf8",
    flag: "r",
  }
);

const [templateData, inputs] = data.split("\n\n");

const pairs = inputs
  .split("\n")
  .map((x) => x.split(" -> "))
  .reduce((p, [v1, v2]) => ({ ...p, [v1]: v1[0] + v2 + v1[1] }), {});

function getMinMax(obj) {
  let min, max;
  Object.entries(obj).forEach(([k, v]) => {
    if (!min || v < min) {
      min = v;
    }
    if (!max || v > max) {
      max = v;
    }
  });

  return [min, max];
}

let template = templateData;

let results = "",
  last = "",
  hash = {},
  times = 30;

for (let i = 0; i < times; i++) {
  for (let j = 0; j < template.length - 1; j++) {
    const [v1, v2, v3] = pairs[template[j] + template[j + 1]];
    const identical = last === v1;
    if (i === times - 1) {
      if (!identical) {
        hash[v1] = hash[v1] ? hash[v1] + 1 : 1;
      }
      hash[v2] = hash[v2] ? hash[v2] + 1 : 1;
      hash[v3] = hash[v3] ? hash[v3] + 1 : 1;
    }

    results += identical ? v2 + v3 : v1 + v2 + v3;
    last = v3;
  }

  last = "";
  template = results;
  results = "";
}

console.log(template);

const [min, max] = getMinMax(hash);

console.log(max - min);
