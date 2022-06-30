import * as fs from 'fs';
const { parse } = require("csv-parse");

export class ReadCSVUtil {
    static ReadCSV = async (filename: string) => {
            
        let readStream = fs.createReadStream(filename)
        .pipe(parse({ delimiter: ",", from_line: 2 }))

        var rows: string[] = [];
        const readPromise = new Promise((resolve, reject)=>{
            readStream.on('data', (row: any) => rows.push(row))
            readStream.on('end', (row: any) => resolve(rows))
        })

        return readPromise;
    }
}

