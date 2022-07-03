"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenDetail = void 0;
const FLOAT_PRECISION = 2;
class TokenDetail {
    constructor(totalTokenAmount = 0, tokenUnit = "", price = 0) {
        this.totalTokenAmount = totalTokenAmount;
        this.price = price;
        this.tokenUnit = tokenUnit;
    }
    getTotalTokenAmount() { return (this.totalTokenAmount).toFixed(FLOAT_PRECISION); }
    ;
    getTokenUnit() { return this.tokenUnit; }
    ;
    getTotalPrices() { return (this.totalTokenAmount * this.price).toFixed(FLOAT_PRECISION); }
    setTotalTokenAmount(total) { this.totalTokenAmount = total; }
    ;
    setPrice(price) { this.price = price; }
    ;
    setTokenUnit(unit) { this.tokenUnit = unit; }
    ;
}
exports.TokenDetail = TokenDetail;
