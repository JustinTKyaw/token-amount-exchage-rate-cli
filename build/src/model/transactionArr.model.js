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
exports.TransactionArray = void 0;
class TransactionArray {
    constructor(transactions = []) {
        this.transactions = [];
        this.transactions = transactions;
    }
    getTransactionsByTnxType(tnxType, tokenType) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transactions.filter((tnx) => {
                if (tnx.transaction_type == tnxType && tnx.token == tokenType)
                    return tnx;
            });
        });
    }
    getTransactions() { return this.transactions; }
    getTotalCoinUnit() {
        return __awaiter(this, void 0, void 0, function* () {
            return Array.from(new Set(yield this.transactions.map((tnx) => { return tnx.token; })));
        });
    }
    setTransactions(transactions) {
        this.transactions = transactions;
    }
}
exports.TransactionArray = TransactionArray;
