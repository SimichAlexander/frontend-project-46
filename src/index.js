import fs from 'fs';
import path from 'path';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';
import treeBuilder from './treeBuilder.js';
import parsers from './parsers.js';

const formatter = (object, format) => {
  if (format === 'plain') {
    return plain(object);
  }
  if (format === 'json') {
    return json(object);
  }
  return stylish(object);
};

const getFilePath = (filepath) => {
  if (!filepath.startsWith('/')) {
    return path.resolve(process.cwd(), './__fixtures__/', filepath);
  }
  return filepath;
};

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

const main = (filepath1, filepath2, format) => {
  const data1 = fileToString(getFilePath(filepath1));
  const data2 = fileToString(getFilePath(filepath2));
  return formatter(treeBuilder(data1, data2), format);
};

export default main;
