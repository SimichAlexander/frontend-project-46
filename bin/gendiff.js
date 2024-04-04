#!/usr/bin/env node
import { program } from 'commander';
import main from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(main(filepath1, filepath2, program.opts().format));
  })
  .parse(process.argv);
