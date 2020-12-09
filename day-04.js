const { SSL_OP_TLS_BLOCK_PADDING_BUG } = require('constants');

const { readFile } = require('fs').promises

const getData = (fileName) => 
  readFile(fileName, { encoding: 'utf8' }).then((fileContent) => fileContent.toString().trim().split('\n'));

const splitDataToPassports = (data) => {
  const passports = [];
  let passport = {};
  data.forEach((row) => {
    if (row !== '') {
      row.split(' ').filter((r) => r != '').forEach((item) => {
        [ key, val] = item.split(':');
        passport[key] = val;
      });
    } else{
        passports.push(passport);
        passport = Object.assign({});
    }
  });
  passports.push(passport); // push the last object too
  return passports;
}

const IsPassportValid = (passport) => {
  const validPassportKeys = [ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'].sort();
  const currentPassportKeys = Object.keys(passport).sort();

  const validKeyCount = validPassportKeys.reduce((acc, key) => {
    return (passport[key] !== undefined || key === 'cid') ? ++acc : acc;
  }, 0);

  return validKeyCount === validPassportKeys.length;
}

const findValidPassports = async () => {
  const data = await getData('./day-04-data.txt');

  const passports = splitDataToPassports(data);

  const validPassportCount = passports.reduce((a, p) => IsPassportValid(p) ? ++a : a , 0)
  
  console.log(validPassportCount);
}

findValidPassports();
// 260