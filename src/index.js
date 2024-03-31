import fs from 'fs';
import path from 'path';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';
import treeBuilder from './treeBuilder.js';
import parsers from './parsers.js';

const formatter = (object, format) => {
  const mapping = {
    plain: plain(object),
    json: json(object),
    stylish: stylish(object),
  };
  return mapping[format];
};

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);

const fileToString = (filepath) => {
  const data = fs.readFileSync(filepath, { encoding: 'utf8' });
  if (filepath.endsWith('.json')) {
    return parsers(data, 'json');
  }
  if (filepath.endsWith('.yml') || filepath.endsWith('.yaml')) {
    return parsers(data, 'yaml');
  }
  throw new Error('Error extension');
};

const main = (filepath1, filepath2, format = 'stylish') => {
  const data1 = fileToString(getFilePath(filepath1));
  const data2 = fileToString(getFilePath(filepath2));
  return formatter(treeBuilder(data1, data2), format);
};

export default main;
