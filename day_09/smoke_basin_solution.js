const fs = require("fs");
const path = require("path");

const inputs = fs.readFileSync(path.join(__dirname, "./smoke_basin_data.txt"), {
  encoding: "utf8",
  flag: "r",
});

function solution1(inputs) {
  let idx = 0,
    riskLevel = 0;

  const heightmap = inputs.split("\n");

  const row = heightmap.length;
  const rowCount = heightmap[0].length;

  while (idx < row) {
    let locations = heightmap[idx];

    const startLoation = idx > 0 ? 1 : 0;

    if (idx > 0) {
      locations = heightmap[idx - 1] + locations;
    }

    if (idx < row - 1) {
      locations += heightmap[idx + 1];
    }

    for (let k = 0; k < rowCount; k++) {
      const xx = k + startLoation * rowCount,
        left = k > 0 ? locations[xx - 1] : null,
        right = k < rowCount - 1 ? locations[xx + 1] : null,
        top = idx > 0 ? locations[k] : null,
        bottom =
          idx < row - 1 ? locations[k + (startLoation + 1) * rowCount] : null;
      if (
        [left, right, top, bottom]
          .filter(Boolean)
          .every((x) => x > locations[xx])
      ) {
        riskLevel += parseInt(locations[xx]) + 1;
      }
    }

    idx += 1;
  }

  return riskLevel;
}

console.log(solution1(inputs));
