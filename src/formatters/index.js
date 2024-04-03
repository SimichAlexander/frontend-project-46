import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (object, format) => {
  const mapping = {
    plain: plain(object),
    json: json(object),
    stylish: stylish(object),
  };
  if (!mapping[format]) {
    throw new Error(`Unknown format '${format}'`);
  }
  return mapping[format];
};

export default formatter;
