import _ from 'lodash';

const iter = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const arr = sortedKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key: `${key}`,
        status: 'nested',
        children: iter(data1[key], data2[key]),
      };
    }
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
    if (data1[key] !== data2[key]) {
      return {
        key: `${key}`,
        status: 'updated',
        value1: data1[key],
        value2: data2[key],
      };
    }
    return {
      key: `${key}`,
      status: 'unchanged',
      value: data1[key],
    };
  });

  return arr;
};

const treeBuilder = (dataObject1, dataObject2) => {
  const result = iter(dataObject1, dataObject2);
  return {
    status: 'root',
    children: result,
  };
};

export default treeBuilder;
