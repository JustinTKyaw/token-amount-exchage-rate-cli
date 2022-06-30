import { Transaction, TRANSACTION_TYPE } from "../model/transaction.model";
import { ISpecification } from "../specification/ISpecification.interface";

export class TransactionFilter
{
    filter(tnxs: Transaction[], spec: ISpecification){
        return tnxs.filter(tnx => spec.isSatisfied(tnx))
    }

    async testfilter(spec: ISpecification, data: any){
        var tnxs: Transaction[] = [];
        for(const raw of data){
            var tnx: Transaction = new Transaction(
                raw[0],
                raw[1] == "DEPOSIT" ? TRANSACTION_TYPE.DEPOSIT : TRANSACTION_TYPE.WITHDRAWL,
                raw[2],
                raw[3]
            )

            tnxs.push(tnx);
        }
        console.log(`[+] Total Transaction Count => ${tnxs.length}`)
        
        return tnxs.filter(x => spec.isSatisfied(x));
    }
}