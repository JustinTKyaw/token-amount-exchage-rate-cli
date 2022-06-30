import { Transaction } from "../model/csv.model";

export interface ISpecification {
    getTransaction(tnx: Transaction)
}