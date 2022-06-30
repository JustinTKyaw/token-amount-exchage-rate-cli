import { Transaction } from "../../model/transaction.model";
import { ISpecification } from "../ISpecification.interface";

export class DateSpecification implements ISpecification {

    private timestamp: string;

    constructor(timestamp: string){
        this.timestamp = timestamp;
    }

    isUsed(): boolean {
        try{
            return this.timestamp == undefined ? false : true;
        }
        catch(error){throw new Error("Method not implemented.")};
    }

    isSatisfied(tnx: Transaction) {
        try{
            console.log('hello')
            return tnx.timestamp == this.timestamp
        }
        catch(error){throw error}
    }

}