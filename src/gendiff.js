import _ from "lodash";
import * as path from "node:path";
import parsers from "./parsers.js";

const filesToObjects = (filepath1, filepath2) => {
  if (!filepath1.startsWith("/")) {
    filepath1 = path.resolve(process.cwd(), "./__fixtures__/", filepath1);
  }
  if (!filepath2.startsWith("/")) {
    filepath2 = path.resolve(process.cwd(), "./__fixtures__/", filepath2);
  }

  let [dataObj1, dataObj2] = parsers(filepath1, filepath2);

  return [dataObj1, dataObj2];
};

const genDiff = (filepath1, filepath2) => {
  const [dataObj1, dataObj2] = filesToObjects(filepath1, filepath2);
  const result = {
    status: "root",
    children: [],
  };

  const iter = (data1, data2) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const keys = _.union(keys1, keys2).sort();

    const arr = keys.map((key) => {
      if (!Object.hasOwn(data1, key)) {
        return {
          key: `${key}`,
          status: "added",
          value: data2[key],
        };
      }
      if (!Object.hasOwn(data2, key)) {
        return {
          key: `${key}`,
          status: "removed",
          value: data1[key],
        };
      }
      if (data1[key] === data2[key]) {
        return {
          key: `${key}`,
          status: "unchanged",
          value: data1[key],
        };
      }
      if (
        data1[key] !== data2[key] &&
        _.isObject(data1[key]) &&
        _.isObject(data2[key])
      ) {
        return {
          key: `${key}`,
          status: "nested",
          children: iter(data1[key], data2[key]),
        };
      }
      return {
        key: `${key}`,
        status: "updated",
        value1: data1[key],
        value2: data2[key],
      };
    });

    return arr;
  };

  result.children = iter(dataObj1, dataObj2);
  return result;
};

export default genDiff;
