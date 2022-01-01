const fs = require("fs");
const path = require("path");
const { sumAll, deepClone } = require("../utils");

const data = fs.readFileSync(path.join(__dirname, "./giant_squid_data.txt"), {
  encoding: "utf8",
  flag: "r",
});

let bingo,
  last,
  foundIdx = [];
let inputs = data.split("\n\n");
let str = inputs.shift().split(",");

const bingoBoard = inputs
  .map((x) => x.split("\n"))
  .map((x) => {
    return x.map((y) => y.split(" ").filter(Boolean));
  });

function checkHorizontal(arr) {
  return arr.every((x) => x === 0);
}

function checkVertical(Arr, y) {
  let found = 0;
  for (let i = 0; i < 5; i++) {
    if (Arr[i][y] === 0) {
      found += 1;
    }
  }
  return found === 5;
}

function traverseArray(arr, key, noBreak) {
  arr.forEach((x, k) => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (x[i][j] === key) {
          arr[k][i][j] = 0;
          if (checkHorizontal(x[i]) || checkVertical(x, j)) {
            bingo = x;
            last = key;
            foundIdx = [...foundIdx, k];
          }
          if (!noBreak) {
            break;
          }
        }
      }
    }
  });
}

function solution1(board) {
  let idx = 0;
  let bingoBoardClone = deepClone(board);
  while (idx < str.length && !bingo) {
    traverseArray(bingoBoardClone, str[idx]);
    idx += 1;
  }

  console.log(bingo.reduce((p, v) => p + sumAll(v), 0) * last);
}

function solution2(board) {
  let idx = 0;
  let bingoBoardClone = deepClone(board);
  let winBoard;

  bingo = null;
  last = null;
  foundIdx = [];
  bingoBoardClone = deepClone(bingoBoard);
  while (idx < str.length && bingoBoardClone.length > 0 && !winBoard) {
    traverseArray(bingoBoardClone, str[idx], true);

    if (foundIdx.length > 0 && bingoBoardClone.length === 1) {
      winBoard = bingoBoardClone;
    }
    bingoBoardClone = bingoBoardClone.filter((_, k) => !foundIdx.includes(k));
    foundIdx = [];
    idx += 1;
  }

  console.log(winBoard[0].reduce((p, v) => p + sumAll(v), 0) * last);
}

solution1(bingoBoard);
solution2(bingoBoard);
