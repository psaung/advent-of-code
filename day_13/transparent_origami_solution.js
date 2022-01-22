const fs = require("fs");
const path = require("path");

const inputs = fs.readFileSync(
  path.join(__dirname, "./transparent_origami_data.txt"),
  {
    encoding: "utf8",
    flag: "r",
  }
);

const [d, f] = inputs.split("\n\n");

let dots = d.split("\n").map((x) => x.split(",").map((y) => parseInt(y)));
const folds = f
  .split("\n")
  .map((x) =>
    x.includes("x=")
      ? [parseInt(x.replace(/[^0-9]/g, "")), 0]
      : [0, parseInt(x.replace(/[^0-9]/g, ""))]
  );

function reflect(point, line) {
  if (line[0] !== 0) {
    return [2 * line[0] - point[0], point[1]];
  }

  return [point[0], 2 * line[1] - point[1]];
}

function solution1(dots) {
  const fold = folds[0];
  const newDots = {};
  dots.forEach((dot) => {
    if (fold[0] !== 0) {
      if (dot[0] > fold[0]) {
        newDots[reflect(dot, fold)] = true;
      } else {
        newDots[dot] = true;
      }
    } else {
      if (dot[1] > fold[1]) {
        newDots[reflect(dot, fold)] = true;
      } else {
        newDots[dot] = true;
      }
    }
  });

  return Object.entries(newDots).length;
}

function solution2(dots) {
  let newDots = {};
  folds.forEach((fold) => {
    newDots = {};
    dots.forEach((dot) => {
      if (fold[0] !== 0) {
        if (dot[0] > fold[0]) {
          newDots[reflect(dot, fold)] = true;
        } else {
          newDots[dot] = true;
        }
      } else {
        if (dot[1] > fold[1]) {
          newDots[reflect(dot, fold)] = true;
        } else {
          newDots[dot] = true;
        }
      }
    });

    dots = Object.entries(newDots).map(([value]) =>
      value.split(",").map((x) => parseInt(x))
    );
  });

  console.log(dots);

  for (let i = 0; i < 6; i++) {
    let bb = "";
    for (let j = 0; j < 50; j++) {
      if (newDots[[j, i]]) {
        bb += "##";
      } else {
        bb += "..";
      }
    }
    console.log(bb);
  }
  return Object.entries(newDots).length;
}

solution1(dots);
console.log(solution2(dots));
