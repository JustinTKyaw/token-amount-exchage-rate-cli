"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateSpecification = void 0;
const moment_1 = __importDefault(require("moment"));
class DateSpecification {
    constructor(timestamp) {
        this.timestamp = timestamp;
    }
    isUsed() {
        try {
            return this.timestamp == undefined ? false : true;
        }
        catch (error) {
            throw new Error("Method not implemented.");
        }
        ;
    }
    isSatisfied(tnx) {
        try {
            var momentTime = moment_1.default.unix(parseInt(tnx.timestamp)).format("DD-MM-YYYY");
            var timestampCred = (0, moment_1.default)(this.timestamp, "DD-MM-YYYY").format("DD-MM-YYYY");
            return momentTime == timestampCred;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.DateSpecification = DateSpecification;
