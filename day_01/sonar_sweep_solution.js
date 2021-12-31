const fs = require('fs');

const data = fs.readFileSync('./sonar_sweep_input.txt', {
  encoding: 'utf8',
  flag: 'r',
});

const inputs = data.split('\n').map((n) => parseInt(n));

function sumAll(numbers) {
  return numbers.reduce((previous, accumulator) => previous + accumulator, 0);
}

function solution1(numbers) {
  let last = null,
    count = 0;

  numbers.forEach(function (number) {
    if (last && number > last) {
      count += 1;
    }
    last = number;
  });

  return count;
}

function solution2(numbers) {
  const range = 3;
  let last = null,
    count = 0;

  for (let i = 0; i < numbers.length; i++) {
    const current = numbers.slice(i, i + range);
    if (last && sumAll(current) > sumAll(last)) {
      count += 1;
    }
    last = current;
  }

  return count;
}

console.log(solution1(inputs));
console.log(solution2(inputs));
