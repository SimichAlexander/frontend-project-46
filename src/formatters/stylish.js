import _ from 'lodash';

const getCurrentIndent = (depth, spacesCount = 2) => `${' '.repeat(depth * 4 - spacesCount)}`;

const getValue = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const lines = Object.entries(data).map(([key, val]) => `${getCurrentIndent(depth, 0)}${key}: ${getValue(val, depth + 1)}`);
  return ['{', ...lines, `${getCurrentIndent(depth, 4)}}`].join('\n');
};

const stylish = (object) => {
  const iter = (data, depth) => {
    const mapping = {
      root: (obj) => obj.children.map((item) => iter(item, depth + 1)),
      nested: (obj) => `${getCurrentIndent(depth)}  ${obj.key}: ${['{', ...obj.children.map((item) => iter(item, depth + 1)), `${getCurrentIndent(depth + 1, 4)}}`].join('\n')}`,
      added: (obj) => `${getCurrentIndent(depth)}+ ${obj.key}: ${getValue(obj.value, depth + 1)}`,
      removed: (obj) => `${getCurrentIndent(depth)}- ${obj.key}: ${getValue(obj.value, depth + 1)}`,
      updated: (obj) => `${getCurrentIndent(depth)}- ${obj.key}: ${getValue(obj.value1, depth + 1)}\n${getCurrentIndent(depth)}+ ${obj.key}: ${getValue(obj.value2, depth + 1)}`,
      unchanged: (obj) => `${getCurrentIndent(depth)}  ${obj.key}: ${getValue(obj.value, depth + 1)}`,
    };
    return mapping[data.status](data);
  };
  return ['{', ...iter(object, 0), '}'].join('\n');
};

export default stylish;
