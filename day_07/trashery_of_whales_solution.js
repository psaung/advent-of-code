const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(
  path.join(__dirname, "./trashery_of_whales_data.txt"),
  {
    encoding: "utf8",
    flag: "r",
  }
);

const inputs = data.split(",").map((x) => parseInt(x, 10));

function findMedian(arr, len) {
  arr.sort((a, b) => a - b);

  if (len % 2 !== 0) return arr[Math.floor(len / 2)];

  return (arr[Math.floor((len - 1) / 2)] + arr[Math.floor(len / 2)]) / 2;
}

function findMean(arr, len) {
  return Math.floor(arr.reduce((p, v) => p + v, 0) / len);
}

function solution1(inputs) {
  let fuel = 0;
  const least = findMedian(inputs, inputs.length);

  inputs.forEach((d) => {
    fuel += Math.abs(d - least);
  });

  return fuel;
}

function solution2(inputs) {
  let fuel = 0;
  const least = findMean(inputs, inputs.length);

  inputs.forEach((d) => {
    const count = Math.abs(d - least);
    fuel += (count * (count + 1)) / 2;
  });

  return fuel;
}

console.log(solution1(inputs));
console.log(solution2(inputs));
