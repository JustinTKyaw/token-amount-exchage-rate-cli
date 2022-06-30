import Parser from '@gregoranders/csv';
import * as fs from 'fs-extra';


export class ReadCSVUtil {
    static ReadCSV = (filename: string) => {
        const data = fs.readFileSync(filename, 'utf8');
        console.log(data)
        const parser = new Parser();
        const rows = parser.parse('a,b,c\n1,2,3\n4,5,6');
        console.log(parser.json);
    }
}

