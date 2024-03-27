import _ from 'lodash';

const json = (object) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return data;
    }
    const lines = Object.entries(data).map(([key, val]) => `${' '.repeat(depth * 4)}${key}: ${iter(val, depth + 1)}`);

    return ['{', ...lines, `${' '.repeat(depth * 4 - 4)}}`].join('\n');
  };
  return iter(object, 1);
};

export default json;
