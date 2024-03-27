import genDiff from './gendiff.js';
import formatter from '../formatters/index.js';

const main = (filepath1, filepath2, format) => formatter(genDiff(filepath1, filepath2), format);

export default main;
