"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.TRANSACTION_TYPE = void 0;
var TRANSACTION_TYPE;
(function (TRANSACTION_TYPE) {
    TRANSACTION_TYPE[TRANSACTION_TYPE["DEPOSIT"] = 0] = "DEPOSIT";
    TRANSACTION_TYPE[TRANSACTION_TYPE["WITHDRAWL"] = 1] = "WITHDRAWL";
    TRANSACTION_TYPE[TRANSACTION_TYPE["NULL"] = 2] = "NULL";
})(TRANSACTION_TYPE = exports.TRANSACTION_TYPE || (exports.TRANSACTION_TYPE = {}));
class Transaction {
    constructor(timestamp = "", transaction_type = TRANSACTION_TYPE.NULL, token = "", amount = 0) {
        this.timestamp = timestamp;
        this.transaction_type = transaction_type;
        this.token = token;
        this.amount = amount;
    }
}
exports.Transaction = Transaction;
