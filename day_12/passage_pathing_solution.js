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

function solution2(data) {
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
      visited[path] = (visited[path] || 0) + 1;
      visitedOnce = 0;

      const keys = Object.keys(visited);
      for (let i = 0; i < keys.length; i++) {
        visitedOnce += visited[keys[i]] > 1;

        if (visited[keys[i]] > 2) {
          return (visited[path] -= 1);
        }
      }

      if (visitedOnce > 1) {
        visited[path] -= 1;
        return;
      }
    }

    for (let i = 0, innerPath = routes[path]; i < innerPath.length; i++) {
      if (innerPath[i] !== "start") {
        walk(innerPath[i]);
      }
    }

    if (checkLowerCase(path)) {
      visited[path] -= 1;
    }
  }

  walk("start");

  return result;
}

console.log(solution1(inputs));
console.log(solution2(inputs));
