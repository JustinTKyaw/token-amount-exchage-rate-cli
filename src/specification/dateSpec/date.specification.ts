import { Transaction } from "../../model/csv.model";
import { ISpecification } from "../ISpecification.interface";

class DateSpecification implements ISpecification {

    private timestamp: string;

    constructor(timestamp: string){
        this.timestamp = timestamp;
    }

    getTransaction(tnx: Transaction) {
        try{
            return tnx.timestamp == this.timestamp
        }
        catch(error){throw error}
    }

}