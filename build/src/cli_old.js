#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readCsv_util_1 = require("./utils/readCsv.util");
const path = __importStar(require("path"));
const transaction_filter_1 = require("./filter/transaction.filter");
const token_specification_1 = require("./specification/tokenSpec/token.specification");
const date_specification_1 = require("./specification/dateSpec/date.specification");
const multiCretia_specification_1 = require("./specification/multiSpec/multiCretia.specification");
const calculation_service_1 = require("./services/calculation.service");
const http_services_1 = require("./services/http.services");
const moment_1 = __importDefault(require("moment"));
const commander = require('commander');
const showBanner = require('node-banner');
// Config 
const TITLE = "portfolio value";
const SUB_TITLE = "Traded token volume and it's prices";
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Prepare CLI
    yield showBanner(TITLE, SUB_TITLE);
    // Setup the commands
    commander
        .version('1.0.0', '-v, --version')
        .usage('[OPTIONS]...')
        .requiredOption('-f, --filepath <value>', 'Source of data file path')
        .option('-t, --token <value>', 'Given a token, return the latest portfolio value for that token in USD')
        .option('-d, --date <value>', 'Given a date DD-MM-YYYY format, return the portfolio value per token in USD on that date')
        .parse(process.argv);
    const options = commander.opts();
    var timestamp = (0, moment_1.default)(options.date, "DD-MM-YYYY");
    if (options.date != undefined && !timestamp.isValid()) {
        console.error('Date format should be DD-MM-YYYY');
        process.exit(1);
    }
    // Create MultiCretia spec
    // If there is new information is here, just register it here.
    let multiSpec = new multiCretia_specification_1.MultiCretiaSpecification(new token_specification_1.TokenSpecification(options.token), // If token filter is applied, create token spec
    new date_specification_1.DateSpecification(options.date) // If date filter is applied, create date filter
    );
    // Create Transaction filter 
    var tf = new transaction_filter_1.TransactionFilter(multiSpec);
    var filter_result = yield tf.filter((spec) => {
        return new readCsv_util_1.ReadCSVUtil(path.join(__dirname, `../${options.filepath}`)).readCSV(spec); // <-- Can replace any data source from here.
    });
    // Calcluate the Total amount (Total_Deposit - Total_Withdraw = Total_Remain)
    const calculationService = new calculation_service_1.CalculateService(new http_services_1.HTTPCryptoService() // <- We can change any crpyto provider api in here.
    );
    var tokenDetailList = yield calculationService.getRemainAmount(filter_result);
    tokenDetailList.outputTokenList();
}))();
