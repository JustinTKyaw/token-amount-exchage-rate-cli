#!/usr/bin/env node

import { ReadCSVUtil } from "./utils/readCsv.util";
import * as path from 'path'
import { TransactionFilter } from "./filter/transaction.filter";
import { TokenSpecification } from "./specification/tokenSpec/token.specification";
import { DateSpecification } from "./specification/dateSpec/date.specification";
import { MultiCretiaSpecification } from "./specification/multiSpec/multiCretia.specification";
import { CalculateService } from "./services/calculation.service";
import { HTTPService } from "./services/http.services";
import { TransactionArray } from "./model/transactionArr.model";
import { TokenList } from "./model/tokens.model";

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
  let multiSpec = new MultiCretiaSpecification (
    new TokenSpecification(options.token), // If token filter is applied, create token spec
    new DateSpecification(options.date) // If date filter is applied, create date filter
  )
  // Create Transaction filter 
  var tf: TransactionFilter = new TransactionFilter(multiSpec);
  var readFromFile = new ReadCSVUtil();

  var filter_result = await tf.filter(
    // Transaction Filter class will filter the transaction from source and return by using this TransactionArray object.
    new TransactionArray(), 
    await readFromFile.readCSV(path.join(__dirname, `../${options.filepath}`)) // <-- Can replace any data source from here.
  );

  console.log(`[+] Selected Transaction Count => ${filter_result.getTransactions().length}`)  

  // Calcluate the Total amount (Total_Deposit - Total_Withdraw = Total_Remain)
  const calculationService = new CalculateService(
    new HTTPService() // <- We can change any crpyto provider api in here.
  );
  var tokenDetailList : TokenList = await calculationService.getRemainAmount(filter_result);
  tokenDetailList.outputTokenList();
})();