"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("./cli");
const calculation_service_1 = require("./services/calculation.service");
const http_services_1 = require("./services/http.services");
const date_specification_1 = require("./specification/dateSpec/date.specification");
const multiCretia_specification_1 = require("./specification/multiSpec/multiCretia.specification");
const token_specification_1 = require("./specification/tokenSpec/token.specification");
const readCsv_util_1 = require("./utils/readCsv.util");
const transactionFilter_service_1 = require("./services/transactionFilter.service");
// Config 
const TITLE = "portfolio value";
const SUB_TITLE = "Traded token volume and it's prices";
function mainController() {
    return __awaiter(this, void 0, void 0, function* () {
        var cli = new cli_1.CLI(TITLE, SUB_TITLE);
        var { token, date, filepath } = yield cli.initCommander();
        cli.validateDateFormat(date);
        // Start the main logic
        // Create MultiCretia spec
        // If there is new information is here, just register it here.
        let multiSpec = new multiCretia_specification_1.MultiCretiaSpecification(new token_specification_1.TokenSpecification(token), // If token filter is applied, create token spec
        new date_specification_1.DateSpecification(date) // If date filter is applied, create date filter
        );
        var tfService = new transactionFilter_service_1.TransactionFilterService(multiSpec);
        var filter_result = yield tfService.filter((spec) => {
            return new readCsv_util_1.ReadCSVUtil(filepath).readCSV(spec); // <-- Can replace any data source from here.
        });
        // Calcluate the Total amount (Total_Deposit - Total_Withdraw = Total_Remain)
        const calculationService = new calculation_service_1.CalculateService(new http_services_1.HTTPCryptoService() // <- We can change any crpyto provider api in here.
        );
        var tokenDetailList = yield calculationService.getRemainAmount(filter_result);
        tokenDetailList.outputTokenList();
    });
}
mainController();
