#!/usr/bin/env node

import { ReadCSVUtil } from "./utils/readCsv.util";
import * as path from 'path'
import { TransactionFilter } from "./filter/transaction.filter";
import { TokenSpecification } from "./specification/tokenSpec/token.specification";
import { DateSpecification } from "./specification/dateSpec/date.specification";
import { MultiCretiaSpecification } from "./specification/multiSpec/multiCretia.specification";
import { CalculateService } from "./services/calculation.service";
import { HTTPService } from "./services/http.services";

var Table = require('cli-table');

const commander = require('commander');
const showBanner = require('node-banner');

// Config 
const TITLE = "portfolio value";
const SUB_TITLE = "Traded token volume and it's prices";

(async () => {

  // Prepare CLI
  await showBanner(TITLE, SUB_TITLE);

  // Setup the commands
  commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .requiredOption('-f, --filepath <value>', 'Source of data file path')
  .option('-t, --token <value>', 'Given a token, return the latest portfolio value for that token in USD')
  .option('-d, --date <value>', 'Given a date, return the portfolio value per token in USD on that date')
  .parse(process.argv);
  const options = commander.opts();

  // Create MultiCretia spec
  // If there is new information is here, just register it here.
  let multiSpec = new MultiCretiaSpecification(
    new TokenSpecification(options.token), // If token filter is applied, create token spec
    new DateSpecification(options.date) // If date filter is applied, create date filter
  )

  // Create Transaction filter 
  var tf: TransactionFilter = new TransactionFilter();
  var filter_result = await tf.testfilter(
    multiSpec, 
    await ReadCSVUtil.ReadCSV(path.join(__dirname, `../${options.filepath}`))
  ); // <-- Can replace any reader module here

  console.log(`[+] Selected Transaction Count => ${filter_result.length}`)  

  // Calcluate the Total amount (Total_Deposit - Total_Withdraw = Total_Remain)
  const calculationService = new CalculateService();
  var remainAmmount = await calculationService.getRemainAmount(filter_result);
  var coinUnitList = await calculationService.getTotalCoinUnit(filter_result);
  if(remainAmmount < 0) {
    console.error("DATA IS INVALID");
    process.exit(1);
  }

  console.log(`Remain Amount => ${remainAmmount}`)
  console.log(`coinUnitList => ${coinUnitList}`)
  

  // Request the prices of total remain prices.
  const httpService = new HTTPService()
  httpService.getPricesRequest(coinUnitList);

})();






function table_output() {
  // instantiate
  var table = new Table({
    head: ['TH 1 label', 'TH 2 label']
  , colWidths: [20, 20]
  });

  // table is an Array, so you can `push`, `unshift`, `splice` and friends
  table.push(
    ['First value', 'Second value']
  , ['First value', 'Second value']
  );

  console.log(table.toString());
}