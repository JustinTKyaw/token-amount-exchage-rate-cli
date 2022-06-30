import { Transaction } from "../../model/transaction.model";
import { ISpecification } from "../ISpecification.interface";

export class MultiCretiaSpecification implements ISpecification {
    private specs: ISpecification[];

    constructor(...specs: ISpecification[])
    {
        this.specs = specs;
    }

    isUsed(): boolean {
        try{
            return this.specs.length == 0 ? false : true;
        }
        catch(error){throw new Error("Method not implemented.")};
    }

    isSatisfied(tnx: Transaction): boolean {
        try{
            // Loop the cretia specifications
            for(const eachSpec of this.specs)
            {
                if(eachSpec.isUsed()) {
                    if(eachSpec.isSatisfied(tnx) == false) return false;
                }
            }

            return true;
        }
        catch(error) {throw error}
    }
}