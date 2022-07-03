import { TransactionArray } from "../model/transactionArr.model";
import { ISpecification } from "../specification/ISpecification.interface";

export class TransactionFilter
{
    private spec: ISpecification;

    constructor(spec: ISpecification)
    {
        this.spec = spec;
    }

    async filter(datasources: any){

        var data: TransactionArray = await datasources(this.spec);

        console.log(`[+] Selected Transaction Count => ${data.getTransactions().length}`)

        return data;
    }
}