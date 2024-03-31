#!/usr/bin/env node
import { program } from 'commander';
import main from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format (default: "stylish")', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(main(filepath1, filepath2, options.format));
  })
  .parse(process.argv);
