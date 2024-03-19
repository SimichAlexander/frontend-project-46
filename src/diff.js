import _ from 'lodash';
import * as path from 'node:path';
import parsers from './parsers.js';

const filesToObjects = (filepath1, filepath2) => {
  if (!filepath1.startsWith('/')) {
    filepath1 = path.resolve(process.cwd(), filepath1);
  }
  if (!filepath2.startsWith('/')) {
    filepath2 = path.resolve(process.cwd(), filepath2);
  }

  let [dataObj1, dataObj2] = parsers(filepath1, filepath2);

  return [dataObj1, dataObj2];
};

const deepEqual = (obj1, obj2) => {
  if (_.isObject(obj1) && _.isObject(obj2)) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  } else if (!_.isObject(obj1) && !_.isObject(obj2)) {
    return obj1 === obj2;
  } else {
    return false;
  }
}

const diff = (filepath1, filepath2) => {
  const [dataObj1, dataObj2] = filesToObjects(filepath1, filepath2);
  let result = '';

  const innerFunc = (obj1, obj2, depth) => {
    const sortedObj1 = obj1;
    const sortedObj2 = obj2;
    // const sortedObj1 = Object.keys(obj1).sort().reduce((acc, key) => {
    //   acc[key] = obj1[key];
    //   return acc;
    // }, {});
  
    // const sortedObj2 = Object.keys(obj2).sort().reduce((acc, key) => {
    //   acc[key] = obj2[key];
    //   return acc;
    // }, {});
  
    const keys1 = Object.keys(sortedObj1);
    const keys2 = Object.keys(sortedObj2);

    const tempKeys = _.union(keys1, keys2);
    const keys = tempKeys.sort();
  
    result += `{\n`;

    for (const key of keys) {
      if (!Object.hasOwn(sortedObj1, key)) {
        result += `${' '.repeat(depth*4-2)}+ ${key}: ${printObject(sortedObj2[key], depth + 1)}\n`;
      } else if (!Object.hasOwn(sortedObj2, key)) {
        result += `${' '.repeat(depth*4-2)}- ${key}: ${printObject(sortedObj1[key], depth + 1)}\n`;
      } else if (_.isObject(sortedObj1[key]) && _.isObject(sortedObj2[key])) {
        if (deepEqual(sortedObj1[key], sortedObj2[key])) {
          result += `${' '.repeat(depth*4)}${key}: ${printObject(sortedObj1[key], depth + 1)}\n`;
        } else {
          result += `${' '.repeat(depth*4)}${key}: `;
          innerFunc(sortedObj1[key], sortedObj2[key], depth + 1);
        }
      } else if (sortedObj1[key] === sortedObj2[key]) {
        result += `${' '.repeat(depth*4)}${key}: ${printObject(sortedObj1[key], depth + 1)}\n`;
      } else {
        result += `${' '.repeat(depth*4-2)}- ${key}: ${printObject(sortedObj1[key], depth + 1)}\n`;
        result += `${' '.repeat(depth*4-2)}+ ${key}: ${printObject(sortedObj2[key], depth + 1)}\n`;
      }
    }
    result += `${' '.repeat(depth*4-4)}}\n`;
    return result;
  };
  return innerFunc(dataObj1, dataObj2, 1);
};

const printObject = (value, depth) => {
  const replacer = ' ';
  const spacesCount = 4;

  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, depth);
};

export default diff;
