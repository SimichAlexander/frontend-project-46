import genDiff from '../src/gendiff.js';
import formatter from '../formatters/index.js';
import * as fs from "node:fs";
import * as path from "node:path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const expectedStylishFormat = fs.readFileSync(getFixturePath('expected-stylish-format.txt'), { encoding: 'utf8' });
const expectedPlainFormat = fs.readFileSync(getFixturePath('expected-plain-format.txt'), { encoding: 'utf8' });

console.log(expectedPlainFormat);
test('diff-json', () => {
  expect(formatter(genDiff('./file1.json', './file2.json'), 'plain')).toBe(expectedPlainFormat);
});

test('diff-yaml', () => {
  expect(formatter(genDiff('./file1.yml', './file2.yml'), 'plain')).toBe(expectedPlainFormat);
});

// test('diff-json', () => {
//   expect(formatter(genDiff('./file1.json', './file2.json'), 'stylish')).toBe(expectedStylishFormat);
// });

// test('diff-yaml', () => {
//   expect(formatter(genDiff('./file1.yml', './file2.yml'), 'stylish')).toBe(expectedStylishFormat);
// });
