import { Transaction } from "../../model/transaction.model";
import { ISpecification } from "../ISpecification.interface";
import moment from 'moment';

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
            var momentTime = moment.unix(parseInt(tnx.timestamp)).format("DD-MM-YYYY");
            var timestampCred = moment(this.timestamp, "DD-MM-YYYY").format("DD-MM-YYYY");

            return momentTime == timestampCred
        }
        catch(error){throw error}
    }

}