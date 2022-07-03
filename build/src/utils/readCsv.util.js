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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadCSVUtil = void 0;
const fs = __importStar(require("fs"));
const transaction_model_1 = require("../model/transaction.model");
const transactionArr_model_1 = require("../model/transactionArr.model");
const csv = require('csv-parser');
const CHUNK_SIZE = 10000000; // 10MB
class ReadCSVUtil {
    constructor(filepath) {
        this.filepath = filepath;
    }
    readCSV(spec) {
        return __awaiter(this, void 0, void 0, function* () {
            var tnxs = [];
            let readStream = fs.createReadStream(this.filepath, { highWaterMark: CHUNK_SIZE })
                .pipe(csv());
            const readPromise = new Promise((resolve, reject) => {
                readStream.on('data', (row) => {
                    var tnx = new transaction_model_1.Transaction(row.timestamp, row.transaction_type == "DEPOSIT" ? transaction_model_1.TRANSACTION_TYPE.DEPOSIT : transaction_model_1.TRANSACTION_TYPE.WITHDRAWL, row.token, row.amount);
                    if (spec.isSatisfied(tnx))
                        tnxs.push(tnx);
                });
                readStream.on('end', (row) => {
                    var tnxArray = new transactionArr_model_1.TransactionArray(tnxs);
                    tnxs = [];
                    resolve(tnxArray);
                });
            });
            return readPromise;
        });
    }
}
exports.ReadCSVUtil = ReadCSVUtil;
