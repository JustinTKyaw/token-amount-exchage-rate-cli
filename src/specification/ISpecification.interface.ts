import { Transaction } from "../model/transaction.model";

export interface ISpecification {
    isSatisfied(tnx: Transaction) : boolean;
    isUsed(): boolean;
}