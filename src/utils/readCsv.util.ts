import * as fs from 'fs';
import { Transaction, TRANSACTION_TYPE } from '../model/transaction.model';
import { TransactionArray } from '../model/transactionArr.model';
import { ISpecification } from '../specification/ISpecification.interface';
const csv = require('csv-parser')

const CHUNK_SIZE = 10000000; // 10MB

export class ReadCSVUtil {
    private filepath: string;

    constructor(filepath: string) {
        this.filepath = filepath;
    }

    async readCSV(spec: ISpecification) {
        var tnxs: Transaction[] = [];
            
        let readStream = fs.createReadStream(this.filepath, {highWaterMark: CHUNK_SIZE})   
        .pipe(csv());

        const readPromise = new Promise((resolve, reject)=>{
            readStream.on('data', (row: any) => {

                var tnx: Transaction = new Transaction(
                    row.timestamp,
                    row.transaction_type == "DEPOSIT" ? TRANSACTION_TYPE.DEPOSIT : TRANSACTION_TYPE.WITHDRAWL,
                    row.token,
                    row.amount
                )

                if(spec.isSatisfied(tnx)) tnxs.push(tnx);                
            })
            readStream.on('end', (row: any) => {
                var tnxArray = new TransactionArray(tnxs)
                tnxs = []
                resolve(tnxArray);
            })
        })

        return readPromise;
    }
}

