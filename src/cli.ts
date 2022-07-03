import moment from 'moment';

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
        .description('CLI tools to check with the exchange rate.')
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