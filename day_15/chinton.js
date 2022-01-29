const fs = require("fs");
const path = require("path");

const inputs = fs.readFileSync(path.join(__dirname, "./data.txt"), {
  encoding: "utf8",
  flag: "r",
});

// const inputs = `1163751742
// 1381373672
// 2136511328
// 3694931569
// 7463417111
// 1319128137
// 1359912421
// 3125421639
// 1293138521
// 2311944581`;

const i = inputs.split("\n");

const maps = i.map((x) => x.split("").map((x) => parseInt(x)));
const N = maps.length;
const M = maps[0].length;

const cost = {};

class FlatQueue {
  constructor() {
    this.ids = [];
    this.values = [];
    this.length = 0;
  }

  clear() {
    this.length = 0;
  }

  push(id, value) {
    let pos = this.length++;
    this.ids[pos] = id;
    this.values[pos] = value;

    while (pos > 0) {
      const parent = (pos - 1) >> 1;
      const parentValue = this.values[parent];
      if (value >= parentValue) break;
      this.ids[pos] = this.ids[parent];
      this.values[pos] = parentValue;
      pos = parent;
    }

    this.ids[pos] = id;
    this.values[pos] = value;
  }

  pop() {
    if (this.length === 0) return undefined;

    const top = this.ids[0];
    this.length--;

    if (this.length > 0) {
      const id = (this.ids[0] = this.ids[this.length]);
      const value = (this.values[0] = this.values[this.length]);
      const halfLength = this.length >> 1;
      let pos = 0;

      while (pos < halfLength) {
        let left = (pos << 1) + 1;
        const right = left + 1;
        let bestIndex = this.ids[left];
        let bestValue = this.values[left];
        const rightValue = this.values[right];

        if (right < this.length && rightValue < bestValue) {
          left = right;
          bestIndex = this.ids[right];
          bestValue = rightValue;
        }
        if (bestValue >= value) break;

        this.ids[pos] = bestIndex;
        this.values[pos] = bestValue;
        pos = left;
      }

      this.ids[pos] = id;
      this.values[pos] = value;
    }

    return top;
  }

  peek() {
    if (this.length === 0) return undefined;
    return this.ids[0];
  }

  peekValue() {
    if (this.length === 0) return undefined;
    return this.values[0];
  }

  shrink() {
    this.ids.length = this.values.length = this.length;
  }

  size() {
    return this.ids.length;
  }
}

function solution1() {
  let visited = {};
  const priorityQueue = new FlatQueue();
  priorityQueue.push([0, 0], 0);

  while (priorityQueue.size() > 0) {
    const c = priorityQueue.peekValue();
    const [row, col] = priorityQueue.peek();
    priorityQueue.pop();

    if (visited[`${row},${col}`]) {
      continue;
    }

    visited[`${row},${col}`] = true;
    cost[`${row},${col}`] = c;

    if (row === N - 1 && col === M - 1) {
      break;
    }

    for (
      let i = 0,
        list = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
        ];
      i < list.length;
      i++
    ) {
      const [dr, dc] = list[i];
      // console.log(row, col);
      const rr = row + dr;
      const cc = col + dc;
      if (0 > rr || rr > N - 1 || 0 > cc || cc > M - 1) {
        continue;
      }

      priorityQueue.push([rr, cc], c + maps[rr][cc]);
    }
  }

  return cost[`${N - 1},${M - 1}`];
}

function get(r, c) {
  const x = maps[r % N][c % M] + ((r / N) >> 0) + ((c / M) >> 0);
  return ((x - 1) % 9) + 1;
}

function solution2() {
  let visited = {};
  const priorityQueue = new FlatQueue();
  priorityQueue.push([0, 0], 0);

  const rows = N * 5;
  const cols = M * 5;

  while (priorityQueue.size() > 0) {
    const c = priorityQueue.peekValue();
    const [row, col] = priorityQueue.peek();
    priorityQueue.pop();

    if (visited[`${row},${col}`]) {
      continue;
    }

    visited[`${row},${col}`] = true;
    cost[`${row},${col}`] = c;

    if (row === rows - 1 && col === cols - 1) {
      break;
    }

    for (
      let i = 0,
        list = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
        ];
      i < list.length;
      i++
    ) {
      const [dr, dc] = list[i];
      // console.log(row, col);
      const rr = row + dr;
      const cc = col + dc;
      if (0 > rr || rr > rows - 1 || 0 > cc || cc > cols - 1) {
        continue;
      }

      priorityQueue.push([rr, cc], c + get(rr, cc));
    }
  }

  return cost[`${cols - 1},${rows - 1}`];
}

console.log(solution1());
console.log(solution2());
