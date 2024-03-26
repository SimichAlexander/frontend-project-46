#!/usr/bin/env node
import { program } from "commander";
import genDiff from "../src/gendiff.js";
import formatter from "../formatters/index.js";

program
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .arguments("<filepath1> <filepath2>")
  .option("-f, --format [type]", 'output format (default: "stylish")')
  .action((filepath1, filepath2, options) => {
    console.log(formatter(genDiff(filepath1, filepath2)), options.format);
  });

program.parse();
