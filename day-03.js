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

TreesEncountered()
  .then(console.log);
