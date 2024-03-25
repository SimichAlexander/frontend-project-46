#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/gendiff.js';
import stylish from "../formatters/stylish.js";
import plain from "../formatters/plain.js";
import json from "../formatters/json.js";

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format (default: "stylish")')
  .action((filepath1, filepath2, options) => {
    let formatter;
    if (options.format === 'plain') {
      formatter = plain;
    } else if (options.format === 'json') {
      formatter = json;
    } else {
      formatter = stylish;
    }
    console.log(genDiff(filepath1, filepath2, formatter));
  });

program.parse();
