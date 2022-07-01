import * as fs from 'fs';
import { Transaction, TRANSACTION_TYPE } from '../model/transaction.model';
const csv = require('csv-parser')

const CHUNK_SIZE = 10000000; // 10MB

export class ReadCSVUtil {
    private rows: string[][];

    constructor() {
        this.rows = [];
    }

    async readCSV(filename: string) {

        var rowss: string[][] = []
            
        let readStream = fs.createReadStream(filename, {highWaterMark: CHUNK_SIZE})   
        .pipe(csv());

        const readPromise = new Promise((resolve, reject)=>{
            readStream.on('data', (row: any) => {
                rowss.push(row);
            })
            readStream.on('end', (row: any) => {
                resolve(rowss)
            })
        })

        return readPromise;
    }
}

