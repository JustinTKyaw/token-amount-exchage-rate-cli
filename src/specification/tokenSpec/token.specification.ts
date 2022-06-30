import { Transaction } from "../../model/transaction.model";
import { ISpecification } from "../ISpecification.interface";

export class TokenSpecification implements ISpecification {
    private token_symbol: string;

    constructor(token_symbol: string)
    {
        this.token_symbol = token_symbol
    }

    isUsed(): boolean {
        try{
            return this.token_symbol == undefined ? false : true;
        }
        catch(error){throw new Error("Method not implemented.")};
    }

    isSatisfied(tnx: Transaction) {
        try{
            return tnx.token == this.token_symbol
        }
        catch(error) {throw error}
    }
}