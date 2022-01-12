const fs = require("fs");
const path = require("path");

const inputs = fs.readFileSync(
  path.join(__dirname, "./passage_pathing_data.txt"),
  {
    encoding: "utf8",
    flag: "r",
  }
);

function checkLowerCase(c) {
  if (c === c.toLowerCase()) {
    return true;
  }
  return false;
}

function solution1(data) {
  const inputs = data.split("\n");
  const routes = inputs.reduce((p, a) => {
    const [l, r] = a.split("-");
    p[l] = p[l] ? [...p[l], r] : [r];
    p[r] = p[r] ? [...p[r], l] : [l];
    return p;
  }, {});
  let result = 0,
    visited = {};

  function walk(path) {
    if (path == "end") {
      return (result += 1);
    }

    if (checkLowerCase(path)) {
      if (visited[path]) {
        return;
      }
      visited[path] = true;
    }

    for (let i = 0, innerPath = routes[path]; i < innerPath.length; i++) {
      if (innerPath[i] !== "start") {
        walk(innerPath[i]);
      }
    }

    if (checkLowerCase(path)) {
      delete visited[path];
    }
  }

  walk("start");

  result;

  return result;
}

console.log(solution1(inputs));
