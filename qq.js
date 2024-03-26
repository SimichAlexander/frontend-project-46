import genDiff from './src/gendiff.js';
import formatter from './formatters/index.js';
import * as fs from "node:fs";
import * as path from "node:path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
// const expectedStylishFormat = fs.readFileSync(getFixturePath('expected-stylish-format.txt'), { encoding: 'utf8' });
const expectedPlainFormat = fs.readFileSync(getFixturePath('expected-plain-format.txt'), { encoding: 'utf8' });

// for (let i = 0; i < 623; i++) {
//   console.log(formatter(genDiff('./file1.json', './file2.json'), 'plain')[i] === expectedPlainFormat[i]);
// }
let ind = 54
console.log(formatter(genDiff('./file1.json', './file2.json'), 'plain').length);
console.log(expectedPlainFormat.length);