import * as fs from 'node:fs';
import * as path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import main from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedStylishFormat = fs.readFileSync(getFixturePath('expected-stylish-format.txt'), { encoding: 'utf8' });
const expectedPlainFormat = fs.readFileSync(getFixturePath('expected-plain-format.txt'), { encoding: 'utf8' });

test('plain-format-diff-json', () => {
  expect(main('./file1.json', './file2.json', 'plain')).toBe(expectedPlainFormat);
});

test('plain-format-diff-yaml', () => {
  expect(main('./file1.yml', './file2.yml', 'plain')).toBe(expectedPlainFormat);
});

test('stylish-format-diff-json', () => {
  expect(main('./file1.json', './file2.json', 'stylish')).toBe(expectedStylishFormat);
});

test('stylish-format-diff-yaml', () => {
  expect(main('./file1.yml', './file2.yml', 'stylish')).toBe(expectedStylishFormat);
});
