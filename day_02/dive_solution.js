const fs = require('fs');

const data = fs.readFileSync('./dive_input.txt', {
  encoding: 'utf8',
  flag: 'r',
});

const inputs = data.split('\n');

function solution1(data) {
  let y = 0,
    x = 0;
  data.forEach((a) => {
    const [position, val] = a.split(' ');
    const value = parseInt(val);
    switch (position) {
      case 'forward':
        x += value;
        break;
      case 'down':
        y += value;
        break;
      case 'up':
        y -= value;
        break;
      default:
        throw new Error('Unknown command');
    }
  });
  return x * y;
}

function solution2(data) {
  let y = 0,
    x = 0,
    aim = 0;
  data.forEach((a) => {
    const [position, val] = a.split(' ');
    const value = parseInt(val);
    switch (position) {
      case 'forward':
        x += value;
        y += aim * value;
        break;
      case 'down':
        aim += value;
        break;
      case 'up':
        aim -= value;
        break;
      default:
        throw new Error('Unknown command');
    }
  });

  return x * y;
}

console.log(solution1(inputs));
console.log(solution2(inputs));
