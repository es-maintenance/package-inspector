#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import debug from 'debug';
import ora from 'ora';
import yargs from 'yargs';
import { performance } from 'perf_hooks';

import { generateReport, formatDuration } from '@package-inspector/core';

const argv = yargs
  .usage('See how your dependencies are affecting your project.')
  .options({
    path: {
      describe: 'The path to run package-inspector against',
      default: process.cwd(),
      type: 'string',
    },
    output: {
      describe: 'The path to output report to',
      default: path.resolve(process.cwd(), 'report'),
      type: 'string',
    },
    plugins: {
      describe: 'A comma separated list of plugins to include',
      type: 'array',
      default: [],
    },
    help: {
      describe: 'Shows the help menu',
    },
  })
  .strict()
  .parseSync();

const start = performance.now();
const progress = ora('Identifying your node_modules').start();
const changeStatus = (text: string) =>
  (progress.text = `(${formatDuration(performance.now() - start)}) - ${text}`);

const cwd = path.resolve(process.cwd(), argv.path);
const reportPath = argv.output.indexOf('.json')
  ? path.resolve(argv.output)
  : path.resolve(argv.output, 'report.json');

(async function main() {
  try {
    const report = await generateReport(cwd, {
      plugins: argv.plugins,
    });

    try {
      fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    } catch (ex: any) {
      debug(ex.message);
    }

    fs.writeFileSync(reportPath, JSON.stringify(report));

    changeStatus(`JSON Report was built to ${reportPath}`);
    progress.succeed();
  } catch (error: any) {
    changeStatus(
      `Failed with the following message - \n ${error.stack.toString('utf8')}`
    );
    progress.fail();
  }

  process.exit();
})();
