import genDiff from '../src/gendiff.js';
import chooseFormatter from '../formatters/index.js';

const main = (filepath1, filepath2, format) => {
  return chooseFormatter(genDiff(filepath1, filepath2), format);
};

export default main;
