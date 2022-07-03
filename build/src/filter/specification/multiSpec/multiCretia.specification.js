"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiCretiaSpecification = void 0;
class MultiCretiaSpecification {
    constructor(...specs) {
        this.specs = specs;
    }
    isUsed() {
        try {
            return this.specs.length == 0 ? false : true;
        }
        catch (error) {
            throw new Error("Method not implemented.");
        }
        ;
    }
    isSatisfied(tnx) {
        try {
            // Loop the cretia specifications
            for (const eachSpec of this.specs) {
                if (eachSpec.isUsed()) {
                    if (eachSpec.isSatisfied(tnx) == false)
                        return false;
                }
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.MultiCretiaSpecification = MultiCretiaSpecification;
