import { Transaction } from "../../model/csv.model";
import { ISpecification } from "../ISpecification.interface";

class TokenSpecification implements ISpecification {
    private token_symbol: string;

    constructor(token_symbol: string)
    {
        this.token_symbol = token_symbol
    }

    getTransaction(tnx: Transaction) {
        try{
            return tnx.token == this.token_symbol
        }
        catch(error) {throw error}
    }
}