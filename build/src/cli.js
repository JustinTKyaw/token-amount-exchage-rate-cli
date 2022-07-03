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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI = void 0;
const moment_1 = __importDefault(require("moment"));
const commander = require('commander');
const showBanner = require('node-banner');
class CLI {
    constructor(title, subtitle) {
        // Prepare CLI
        this.title = title;
        this.subtitle = subtitle;
    }
    initCommander() {
        return __awaiter(this, void 0, void 0, function* () {
            // Show banner
            yield showBanner(this.title, this.subtitle);
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
            };
        });
    }
    validateDateFormat(date) {
        var timestamp = (0, moment_1.default)(date, "DD-MM-YYYY");
        if (date != undefined && !timestamp.isValid()) {
            console.error('Date format should be DD-MM-YYYY');
            process.exit(1);
        }
    }
}
exports.CLI = CLI;
