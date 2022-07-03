import { CLI } from "./cli";
import { TokenList } from "./model/tokens.model";
import { CalculateService } from "./services/calculation.service";
import { HTTPCryptoService } from "./services/http.services";
import { DateSpecification } from "./specification/dateSpec/date.specification";
import { ISpecification } from "./specification/ISpecification.interface";
import { MultiCretiaSpecification } from "./specification/multiSpec/multiCretia.specification";
import { TokenSpecification } from "./specification/tokenSpec/token.specification";
import { ReadCSVUtil } from "./utils/readCsv.util";
import { TransactionFilterService } from "./services/transactionFilter.service";

// Config 
const TITLE = "portfolio value";
const SUB_TITLE = "Traded token volume and it's prices";

async function mainController() {

    var cli = new CLI(TITLE, SUB_TITLE);
    var {token, date, filepath} = await cli.initCommander();
    cli.validateDateFormat(date);

    // Start the main logic
    // Create MultiCretia spec
    // If there is new information is here, just register it here.
    let multiSpec = new MultiCretiaSpecification (
        new TokenSpecification(token), // If token filter is applied, create token spec
        new DateSpecification(date) // If date filter is applied, create date filter
    )
    
    var tfService = new TransactionFilterService(multiSpec);
    var filter_result = await tfService.filter(
        (spec: ISpecification)=>{
            return new ReadCSVUtil(filepath).readCSV(spec) // <-- Can replace any data source from here.
        }
    );

    // Calcluate the Total amount (Total_Deposit - Total_Withdraw = Total_Remain)
    const calculationService = new CalculateService(
        new HTTPCryptoService() // <- We can change any crpyto provider api in here.
    );
    
    var tokenDetailList : TokenList = await calculationService.getRemainAmount(filter_result);
    tokenDetailList.outputTokenList();
}


mainController();