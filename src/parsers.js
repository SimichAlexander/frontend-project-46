import * as fs from 'node:fs';
import yaml from 'js-yaml';

const parsers = (filepath) => {
  if (filepath.endsWith('.json')) {
    return JSON.parse(fs.readFileSync(filepath, { encoding: 'utf8' }));
  }
  if (filepath.endsWith('.yml') || filepath.endsWith('.yaml')) {
    return yaml.load(fs.readFileSync(filepath, 'utf8'));
  }
  return 'Error';
};

export default parsers;
