const initailState =
  "1,2,5,1,1,4,1,5,5,5,3,4,1,2,2,5,3,5,1,3,4,1,5,2,5,1,4,1,2,2,1,5,1,1,1,2,4,3,4,2,2,4,5,4,1,2,3,5,3,4,1,1,2,2,1,3,3,2,3,2,1,2,2,3,1,1,2,5,1,2,1,1,3,1,1,5,5,4,1,1,5,1,4,3,5,1,3,3,1,1,5,2,1,2,4,4,5,5,4,4,5,4,3,5,5,1,3,5,2,4,1,1,2,2,2,4,1,2,1,5,1,3,1,1,1,2,1,2,2,1,3,3,5,3,4,2,1,5,2,1,4,1,1,5,1,1,5,4,4,1,4,2,3,5,2,5,5,2,2,4,4,1,1,1,4,4,1,3,5,4,2,5,5,4,4,2,2,3,2,1,3,4,1,5,1,4,5,2,4,5,1,3,4,1,4,3,3,1,1,3,2,1,5,5,3,1,1,2,4,5,3,1,1,1,2,5,2,4,5,1,3,2,4,5,5,1,2,3,4,4,1,4,1,1,3,3,5,1,2,5,1,2,5,4,1,1,3,2,1,1,1,3,5,1,3,2,4,3,5,4,1,1,5,3,4,2,3,1,1,4,2,1,2,2,1,1,4,3,1,1,3,5,2,1,3,2,1,1,1,2,1,1,5,1,1,2,5,1,1,4";
const numbersOfDays = 256;

let arr = initailState.split(",").map((x) => parseInt(x)),
  defaultS = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };

const internalTimer = 6,
  internalTimerForNew = 8;

function solution(numbersOfDays) {
  let dict = { ...defaultS };
  arr.forEach((a) => {
    dict[a] += 1;
  });

  let indx = 0;
  while (indx < numbersOfDays) {
    let newDict = { ...defaultS };
    Object.keys(dict).forEach((key) => {
      if (key === "0") {
        newDict["" + internalTimer] += dict[key];
        newDict["" + internalTimerForNew] = dict[key];
      } else {
        newDict[key - 1] += dict[key];
      }
    });
    dict = newDict;
    indx += 1;
  }

  return Object.keys(dict).reduce((p, v) => p + dict[v], 0);
}

// solution 1
console.log(solution(80));

// solution 2
console.log(solution(256));
