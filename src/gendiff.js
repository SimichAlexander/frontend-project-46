import { program } from 'commander';
import diff from './diff.js';

const genDiff = () => {
  program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(diff(filepath1, filepath2));
  });

  program.parse();
};

export default genDiff;