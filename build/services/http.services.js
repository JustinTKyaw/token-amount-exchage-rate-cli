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
exports.HTTPCryptoService = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
class HTTPCryptoService {
    constructor(header = {
        Accept: 'application/json'
    }) {
        dotenv.config();
        header.Authorization = `Apikey ${process.env.API_KEY}`;
        this.header = header;
    }
    getCryptocomparePrices(symbols, currencyUnit = "USD") {
        return __awaiter(this, void 0, void 0, function* () {
            var symbolList = symbols.join(',');
            var url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbolList}&tsyms=${currencyUnit}`;
            return yield this.getRequest(url, this.header);
        });
    }
    getRequest(url, header) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get(url, { headers: { header } });
                return data;
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    console.log('error message: ', error.message);
                    return error.message;
                }
                else {
                    console.log('unexpected error: ', error);
                    return 'An unexpected error occurred';
                }
            }
        });
    }
}
exports.HTTPCryptoService = HTTPCryptoService;
