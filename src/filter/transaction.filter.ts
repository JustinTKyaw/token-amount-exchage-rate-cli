import { Transaction } from "../model/csv.model";
import { ISpecification } from "../specification/ISpecification.interface";

class TransactionFilter
{
    filter(tnxs: Transaction[], spec: ISpecification){
        return tnxs.filter(tnx => spec.getTransaction(tnx))
    }
}