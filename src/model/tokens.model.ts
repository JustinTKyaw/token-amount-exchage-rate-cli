import { TokenDetail } from "./tokenDetail.model";
var Table = require('cli-table');

export class TokenList {
    private tokenList: TokenDetail[];

    constructor(tokenList: TokenDetail[] = [])
    {
        this.tokenList = tokenList;
    }

    setTokenList(tokenList: TokenDetail[])
    {
        this.tokenList = tokenList;
    }

    outputTokenList(){
        // instantiate
        var table = new Table({
            head: ['Coins Name', 'Porfolio Amount', 'Porfolio Value In USD'],
            colWidths: [20, 20, 30]
        });

        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        for(const token of this.tokenList){
            table.push(
                [
                    token.getTokenUnit(),
                    token.getTotalTokenAmount(),
                    token.getTotalPrices()
                ]
            )
        }
        console.log(table.toString());
    }
}