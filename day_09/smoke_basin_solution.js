const fs = require("fs");
const path = require("path");

const inputs = fs.readFileSync(path.join(__dirname, "./smoke_basin_data.txt"), {
  encoding: "utf8",
  flag: "r",
});

function lowPoint(inputs) {
  let idx = 0,
    riskLevel = 0;

  const heightmap = inputs.split("\n");

  const row = heightmap.length;
  const rowCount = heightmap[0].length;
  let lowPoints = [];

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
        lowPoints = [...lowPoints, (xx % rowCount) + rowCount * idx];
        riskLevel += parseInt(locations[xx]) + 1;
      }
    }

    idx += 1;
  }

  return {
    riskLevel,
    lowPoints,
  };
}

console.log(lowPoint(inputs).riskLevel);

function solution2(inputs) {
  const heightmap = inputs.split("\n");
  const ignorePoint = 9;

  const row = heightmap.length;
  const rowCount = heightmap[0].length;

  const str = heightmap.join("");

  let dum = {},
    visited = [];

  function walkHorizontal(v, start, end, key, stop = "9") {
    const arr = [];

    if (start !== null) {
      for (let i = v - 1; i >= start; i--) {
        if (stop === str[i]) {
          break;
        }
        if (visited.indexOf(i) < 0) {
          arr.push(i);
          visited.push(i);
        }
      }
    }

    if (end !== null) {
      for (let i = v + 1; i <= end; i++) {
        if (stop === str[i]) {
          break;
        }
        if (visited.indexOf(i) < 0) {
          arr.push(i);
          visited.push(i);
        }
      }
    }

    arr.forEach((a) => {
      const [top, bottom] = getPosition(a, row, rowCount);
      walkVertical(a, top, bottom, rowCount, key);
    });

    dum[key] = [...new Set([...dum[key], ...arr])];
    return arr;
  }

  function walkVertical(v, start, end, inc, key, stop = "9") {
    const arr = [];

    if (start !== null) {
      for (let i = v - inc; i >= start; i -= inc) {
        if (stop === str[i]) {
          break;
        }
        if (visited.indexOf(i) < 0) {
          arr.push(i);
          visited.push(i);
        }
      }
    }

    if (end !== null) {
      for (let i = v + inc; i <= end; i += inc) {
        if (stop === str[i]) {
          break;
        }
        if (visited.indexOf(i) < 0) {
          arr.push(i);
          visited.push(i);
        }
      }
    }

    arr.forEach((a) => {
      const [_, dd, left, right] = getPosition(a, row, rowCount);
      walkHorizontal(a, left, right, key);
    });

    dum[key] = [...new Set([...dum[key], ...arr])];

    return arr;
  }

  function getPosition(v, row, rowCount) {
    let vv = v % rowCount;
    let top = vv;
    let bottom = vv + (row - 1) * rowCount;

    let left = parseInt(v / rowCount) * rowCount;
    let right = (parseInt(v / rowCount) + 1) * rowCount - 1;

    return [
      top === v ? null : top,
      bottom === v ? null : bottom,
      left === v ? null : left,
      right === v ? null : right,
    ];
  }

  const { lowPoints } = lowPoint(inputs);

  lowPoints.forEach((v) => {
    dum[v] = [v];
    visited.push(v);

    const [top, bottom, left, right] = getPosition(v, row, rowCount);

    walkVertical(v, top, bottom, rowCount, v);
    walkHorizontal(v, left, right, v);
  });

  return Object.keys(dum)
    .map((v) => dum[v])
    .sort((a, b) => b.length - a.length)
    .slice(0, 3)
    .reduce((p, v) => p * v.length, 1);
}

console.log(solution2(inputs));
