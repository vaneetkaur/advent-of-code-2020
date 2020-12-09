// --- Day 3: Toboggan Trajectory ---
// Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?


const { readFile } = require('fs').promises

const getData = (fileName) => 
  readFile(fileName, { encoding: 'utf8' }).then((fileContent) => fileContent.toString().trim().split('\n'));

const TreesEncountered = () => {
  return getData('./day-03-data.txt')
    .then((data) => {
      let currentX = -3;
      let treeCount = 0;

      for (let i = 0; i < data.length; ++i) {
        currentX = currentX + 3;
        if (currentX >= data[i].length) currentX = currentX - data[i].length;
        if (data[i][currentX] === '#') ++treeCount;
      }

      return treeCount;
    })
}
// 278

// TreesEncountered()
//   .then(console.log);

// What do you get if you multiply together the number of trees encountered on each of the listed slopes?

const TreesEncounteredOnSlope = (data, x, y) => {
  let currentX = -x;
  let treeCount = 0;

  for (let i = 0; i < data.length; i = i + y) {
    currentX = currentX + x;
    if (currentX >= data[i].length) currentX = currentX - data[i].length;
    if (data[i][currentX] === '#') ++treeCount;
  }
  return treeCount;
}

const MultiplyTreesEncountered = async () => {
  const data = await getData('./day-03-data.txt');

  const slope1 = TreesEncounteredOnSlope(data, 1, 1);
  const slope2 = TreesEncounteredOnSlope(data, 3, 1);
  const slope3 = TreesEncounteredOnSlope(data, 5, 1);
  const slope4 = TreesEncounteredOnSlope(data, 7, 1);
  const slope5 = TreesEncounteredOnSlope(data, 1, 2);

  return slope1 * slope2 * slope3 * slope4 * slope5;
}

MultiplyTreesEncountered().then(console.log);

// 9709761600