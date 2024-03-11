import * as fs from 'node:fs';
import * as path from 'node:path';
import _ from 'lodash';

const diff = (filepath1, filepath2) => {
  if (!filepath1.startsWith('/')) {
    filepath1 = path.resolve(process.cwd(), filepath1);
  }
  if (!filepath2.startsWith('/')) {
    filepath2 = path.resolve(process.cwd(), filepath2);
  }
  const data1 = fs.readFileSync(filepath1, {encoding: 'utf8'});
  const data2 = fs.readFileSync(filepath2, {encoding: 'utf8'});

  const dataObj1 = JSON.parse(data1);
  const dataObj2 = JSON.parse(data2);
  
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

  const keys1 = Object.keys(sortedObj1);
  const keys2 = Object.keys(sortedObj2);
  const keys = _.union(keys1, keys2);

  let result = '{\n';

  for (const key of keys) {
    if (!Object.hasOwn(sortedObj1, key)) {
      result += `  + ${key}: ${sortedObj2[key]}\n`;
    } else if (!Object.hasOwn(sortedObj2, key)) {
      result += `  - ${key}: ${sortedObj1[key]}\n`;
    } else if (sortedObj1[key] !== sortedObj2[key]) {
      result += `  - ${key}: ${sortedObj1[key]}\n`;
      result += `  + ${key}: ${sortedObj2[key]}\n`;
    } else {
      result += `    ${key}: ${sortedObj1[key]}\n`;
    }
  }
  result += '}';
  return result;
};

export default diff;