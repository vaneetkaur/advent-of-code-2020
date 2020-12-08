// --- Day 2: Password Philosophy ---
// How many passwords are valid according to their policies?

const { readFile } = require('fs').promises

const getData = (fileName) => 
  readFile(fileName, { encoding: 'utf8' }).then((fileContent) => fileContent.toString().trim().split('\n'));

const CountValidPasswordsMinMax = () => {
  return getData('./day-02-data.txt')
    .then((data) => {
      let valid = 0;

      data.forEach((e) => {
        [ rule, char, password ] = e.split(' ');
        [ min, max ] = rule.split('-');
        [ letter ] = char.split(':');
        const occurance = password.length - password.split(letter).join('').length;
        (occurance >= min && occurance <= max) ? ++valid : null;
      });

      return valid;
    });
}
// Answer 572

const CountValidPasswords = () => {
  return getData('./day-02-data.txt')
    .then((data) => {
      let valid = 0;

      data.forEach((e) => {
        [ rule, char, password ] = e.split(' ');
        [ first, last ] = rule.split('-');
        [ letter ] = char.split(':');
        const checkFirst = password[first - 1];
        const checkLast = password[last - 1];
        if ((checkFirst === letter && checkLast !== letter) || (checkFirst != letter && checkLast === letter)) {
          ++valid;
        }
      });

      return valid;
    });
}
// Answer 306

CountValidPasswords()
  .then(console.log);