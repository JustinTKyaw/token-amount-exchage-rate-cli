#!/usr/bin/env node

import { ReadCSVUtil } from "./utils/readCsv.util";
import * as path from 'path'
import { TransactionFilter } from "./filter/transaction.filter";
import { TokenSpecification } from "./specification/tokenSpec/token.specification";
import { DateSpecification } from "./specification/dateSpec/date.specification";
import { MultiCretiaSpecification } from "./specification/multiSpec/multiCretia.specification";
import { CalculateService } from "./services/calculation.service";
import { HTTPCryptoService } from "./services/http.services";
import { TransactionArray } from "./model/transactionArr.model";
import { TokenList } from "./model/tokens.model";
import moment from 'moment';
import { ISpecification } from "./specification/ISpecification.interface";

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
  .option('-d, --date <value>', 'Given a date DD-MM-YYYY format, return the portfolio value per token in USD on that date')
  .parse(process.argv);
  const options = commander.opts();

  var timestamp = moment(options.date, "DD-MM-YYYY")

  if(options.date != undefined && !timestamp.isValid())
  {
    console.error('Date format should be DD-MM-YYYY');
    process.exit(1);
  }

  // Create MultiCretia spec
  // If there is new information is here, just register it here.
  let multiSpec = new MultiCretiaSpecification (
    new TokenSpecification(options.token), // If token filter is applied, create token spec
    new DateSpecification(options.date) // If date filter is applied, create date filter
  )
  // Create Transaction filter 
  var tf: TransactionFilter = new TransactionFilter(multiSpec);

  var filter_result = await tf.filter(
    (spec: ISpecification)=>{
      return new ReadCSVUtil(path.join(__dirname, `../${options.filepath}`)).readCSV(spec) // <-- Can replace any data source from here.
    },
    
  );

  // Calcluate the Total amount (Total_Deposit - Total_Withdraw = Total_Remain)
  const calculationService = new CalculateService(
    new HTTPCryptoService() // <- We can change any crpyto provider api in here.
  );
  var tokenDetailList : TokenList = await calculationService.getRemainAmount(filter_result);
  tokenDetailList.outputTokenList();
})();