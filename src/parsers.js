import yaml from 'js-yaml';

const parsers = (string, extension) => {
  if (extension === 'json') {
    return JSON.parse(string);
  }
  if (extension === 'yaml') {
    return yaml.load(string);
  }
  throw new Error('Error extension');
};

export default parsers;
