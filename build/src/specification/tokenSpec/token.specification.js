"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSpecification = void 0;
class TokenSpecification {
    constructor(token_symbol) {
        this.token_symbol = token_symbol;
    }
    isUsed() {
        try {
            return this.token_symbol == undefined ? false : true;
        }
        catch (error) {
            throw new Error("Method not implemented.");
        }
        ;
    }
    isSatisfied(tnx) {
        try {
            return tnx.token == this.token_symbol;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.TokenSpecification = TokenSpecification;
