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
exports.CalculateService = void 0;
const tokenDetail_model_1 = require("../model/tokenDetail.model");
const tokens_model_1 = require("../model/tokens.model");
const transaction_model_1 = require("../model/transaction.model");
class CalculateService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getRemainAmount(tnxs) {
        return __awaiter(this, void 0, void 0, function* () {
            var tokenList = new tokens_model_1.TokenList();
            var coinList = yield tnxs.getTotalCoinUnit();
            var tokenDetailList = [];
            //Request prices information
            var httpResponse = yield this.httpService.getCryptocomparePrices(coinList);
            // Construct the token detail
            for (const coin of coinList) {
                // Get the total withdraw amount on each coin
                var totalWithdrawAmountArr = yield ((yield tnxs.getTransactionsByTnxType(transaction_model_1.TRANSACTION_TYPE.WITHDRAWL, coin)).map((wdTypeTnx) => { return parseFloat(wdTypeTnx.amount.toString()); }));
                // // Get the total deposit amount on each coin
                var totalDepositAmountArr = yield ((yield tnxs.getTransactionsByTnxType(transaction_model_1.TRANSACTION_TYPE.DEPOSIT, coin)).map((dpTypeTnx) => { return parseFloat(dpTypeTnx.amount.toString()); }));
                var totalWithdrawAmount = totalWithdrawAmountArr.reduce((a, b) => a + b, 0);
                var totalDepositAmount = totalDepositAmountArr.reduce((a, b) => a + b, 0);
                var tokenDetail = new tokenDetail_model_1.TokenDetail(totalDepositAmount - totalWithdrawAmount, // Calcluate the Total amount (Total_Deposit - Total_Withdraw = Total_Remain)
                coin, httpResponse[coin].USD);
                tokenDetailList.push(tokenDetail);
            }
            tokenList.setTokenList(tokenDetailList);
            return tokenList;
        });
    }
}
exports.CalculateService = CalculateService;
