#!/usr/bin/env node

import { ReadCSVUtil } from "./utils/readCsv.util";
import * as path from 'path'

var Table = require('cli-table');



const commander = require('commander');
const showBanner = require('node-banner');
const TITLE = "portfolio value";
const SUB_TITLE = "Traded token volume and it's prices";


// Prepare CLI
(async () => {
  await showBanner(TITLE, SUB_TITLE);

  commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-t, --token <value>', 'Given a token, return the latest portfolio value for that token in USD')
  .option('-d, --date <value>', 'Given a date, return the portfolio value per token in USD on that date')
  .parse(process.argv);

  const options = commander.opts();
  ReadCSVUtil.ReadCSV(path.join(__dirname, '../data/transactions.csv'));
  // If token filter is applied, create token spec
  console.log('Token:', `${options.token}`);

  // If date filter is applied, create date filter
  console.log('Date:', `${options.date}`);
})();






function table_output() {
  // instantiate
  var table = new Table({
    head: ['TH 1 label', 'TH 2 label']
  , colWidths: [50, 50]
  });

  // table is an Array, so you can `push`, `unshift`, `splice` and friends
  table.push(
    ['First value', 'Second value']
  , ['First value', 'Second value']
  );

  console.log(table.toString());
}