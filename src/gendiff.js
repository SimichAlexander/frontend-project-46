import _ from 'lodash';
import * as path from 'node:path';
import parsers from './parsers.js';

const fileToObject = (filepath) => {
  if (!filepath.startsWith('/')) {
    return parsers(path.resolve(process.cwd(), './__fixtures__/', filepath));
  }
  return parsers(filepath);
};

const genDiff = (filepath1, filepath2) => {
  const dataObj1 = fileToObject(filepath1);
  const dataObj2 = fileToObject(filepath2);

  const iter = (data1, data2) => {
    const keys = _.union(Object.keys(data1), Object.keys(data2));
    const sortedKeys = _.sortBy(keys);

    const arr = sortedKeys.map((key) => {
      if (!Object.hasOwn(data1, key)) {
        return {
          key: `${key}`,
          status: 'added',
          value: data2[key],
        };
      }
      if (!Object.hasOwn(data2, key)) {
        return {
          key: `${key}`,
          status: 'removed',
          value: data1[key],
        };
      }
      if (data1[key] === data2[key]) {
        return {
          key: `${key}`,
          status: 'unchanged',
          value: data1[key],
        };
      }
      if (data1[key] !== data2[key] && _.isObject(data1[key]) && _.isObject(data2[key])) {
        return {
          key: `${key}`,
          status: 'nested',
          children: iter(data1[key], data2[key]),
        };
      }
      return {
        key: `${key}`,
        status: 'updated',
        value1: data1[key],
        value2: data2[key],
      };
    });

    return arr;
  };
  const result = iter(dataObj1, dataObj2);

  const diffObj = {
    status: 'root',
    children: result,
  };

  return diffObj;
};

export default genDiff;
