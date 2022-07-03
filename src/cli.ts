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

export class CLI {

    private title: string;
    private subtitle: string;

    constructor(title: string, subtitle: string){
        // Prepare CLI
        this.title = title;
        this.subtitle = subtitle;
    }

    async initCommander(){
        // Show banner
        await showBanner(this.title, this.subtitle);

        // Setup the commands
        commander
        .version('1.0.0', '-v, --version')
        .usage('[OPTIONS]...')
        .requiredOption('-f, --filepath <value>', 'Source of data file path')
        .option('-t, --token <value>', 'Given a token, return the latest portfolio value for that token in USD')
        .option('-d, --date <value>', 'Given a date DD-MM-YYYY format, return the portfolio value per token in USD on that date')
        .parse(process.argv);
        const options = commander.opts();

        return {
            token: options.token, 
            date: options.date,
            filepath: options.filepath
        }
    }

    validateDateFormat(date: string){
        var timestamp = moment(date, "DD-MM-YYYY")

        if(date != undefined && !timestamp.isValid())
        {
            console.error('Date format should be DD-MM-YYYY');
            process.exit(1);
        }
    }    
}