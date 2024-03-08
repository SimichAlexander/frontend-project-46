import { program } from 'commander';
import * as fs from 'node:fs';
import _ from 'lodash';

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);

  let result = '{\n';

  for (const key of keys) {
    if (!Object.hasOwn(data1, key)) {
      result += `  + ${key}: ${data2[key]}\n`;
    } else if (!Object.hasOwn(data2, key)) {
      result += `  - ${key}: ${data1[key]}\n`;
    } else if (data1[key] !== data2[key]) {
      result += `  - ${key}: ${data1[key]}\n`;
      result += `  + ${key}: ${data2[key]}\n`;
    } else {
      result += `    ${key}: ${data1[key]}\n`;
    }
  }
  result += '}';
  return result;
};


const gendiff = () => {
  program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const data1 = fs.readFileSync(filepath1, {encoding: 'utf8'});
    const data2 = fs.readFileSync(filepath2, {encoding: 'utf8'});

    const dataObj1 = JSON.parse(data1);
    const dataObj2 = JSON.parse(data2);

    // const sortedObj1 = _.sortBy(dataObj1);
    // const sortedObj2 = _.sortBy(dataObj2);

    const sortedObj1 = Object.keys(dataObj1)
    .sort()
    .reduce((acc, key) => {
      acc[key] = dataObj1[key];
      return acc;
    }, {});

    const sortedObj2 = Object.keys(dataObj2)
    .sort()
    .reduce((acc, key) => {
      acc[key] = dataObj2[key];
      return acc;
    }, {});

    console.log(compare(sortedObj1, sortedObj2));
  });

  program.parse();
};

export default gendiff;