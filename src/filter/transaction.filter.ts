import { Transaction, TRANSACTION_TYPE } from "../model/transaction.model";
import { TransactionArray } from "../model/transactionArr.model";
import { ISpecification } from "../specification/ISpecification.interface";

export class TransactionFilter
{
    private spec: ISpecification;

    constructor(spec: ISpecification)
    {
        this.spec = spec;
    }

    async filter(tnxArray: TransactionArray, data: any){
        var tnxs: Transaction[] = [];
        
        for(const raw of data){
            var tnx: Transaction = new Transaction(
                raw.timestamp,
                raw.transaction_type == "DEPOSIT" ? TRANSACTION_TYPE.DEPOSIT : TRANSACTION_TYPE.WITHDRAWL,
                raw.token,
                raw.amount
            )

            tnxs.push(tnx);
        }
        console.log(`[+] Total Transaction Count => ${tnxs.length}`)
        
        tnxArray.setTransactions(await tnxs.filter(x => this.spec.isSatisfied(x)));
        return tnxArray;
    }
}