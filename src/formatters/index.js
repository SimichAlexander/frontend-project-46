import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const mapping = {
  plain,
  json,
  stylish,
};

const formatter = (object, type) => {
  const format = mapping[type];
  if (!format) {
    throw new Error(`Unknown format '${type}'`);
  }
  return format(object);
};

export default formatter;
