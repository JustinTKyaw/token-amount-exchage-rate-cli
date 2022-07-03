import path from "path";
import { CLI } from "./cli";
import { TransactionFilter } from "./filter/transaction.filter";
import { TokenList } from "./model/tokens.model";
import { CalculateService } from "./services/calculation.service";
import { HTTPCryptoService } from "./services/http.services";
import { DateSpecification } from "./specification/dateSpec/date.specification";
import { ISpecification } from "./specification/ISpecification.interface";
import { MultiCretiaSpecification } from "./specification/multiSpec/multiCretia.specification";
import { TokenSpecification } from "./specification/tokenSpec/token.specification";
import { ReadCSVUtil } from "./utils/readCsv.util";

// Config 
const TITLE = "portfolio value";
const SUB_TITLE = "Traded token volume and it's prices";

async function main() {
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
    // Create Transaction filter 
    var tf: TransactionFilter = new TransactionFilter(multiSpec);
    
    var filter_result = await tf.filter(
        (spec: ISpecification)=>{
            return new ReadCSVUtil(path.join(__dirname, `../${filepath}`)).readCSV(spec) // <-- Can replace any data source from here.
        },
    );
    
    // Calcluate the Total amount (Total_Deposit - Total_Withdraw = Total_Remain)
    const calculationService = new CalculateService(
        new HTTPCryptoService() // <- We can change any crpyto provider api in here.
    );
    
    var tokenDetailList : TokenList = await calculationService.getRemainAmount(filter_result);
    tokenDetailList.outputTokenList();
}


main();