import { TokenDetail } from "../model/tokenDetail.model";
import { TokenList } from "../model/tokens.model";
import { Transaction, TRANSACTION_TYPE } from "../model/transaction.model";
import { TransactionArray } from "../model/transactionArr.model";
import { HTTPCryptoService } from "./http.services";

export class CalculateService {

    private httpService: HTTPCryptoService;

    constructor(httpService: HTTPCryptoService)
    {
        this.httpService = httpService;
    }

    async getRemainAmount(tnxs: TransactionArray) : Promise<TokenList>
    {
        var tokenList: TokenList = new TokenList()
        var coinList = await tnxs.getTotalCoinUnit();
        var tokenDetailList: TokenDetail[] = [];

        //Request prices information
        var httpResponse = await this.httpService.getCryptocomparePrices(coinList);
        
        // Construct the token detail
        for(const coin of coinList) {
            // Get the total withdraw amount on each coin
            var totalWithdrawAmountArr = await ((await tnxs.getTransactionsByTnxType(TRANSACTION_TYPE.WITHDRAWL, coin)).map((wdTypeTnx) => { return parseFloat(wdTypeTnx.amount.toString()) }));

            // // Get the total deposit amount on each coin
            var totalDepositAmountArr = await ((await tnxs.getTransactionsByTnxType(TRANSACTION_TYPE.DEPOSIT, coin)).map((dpTypeTnx) => { return parseFloat(dpTypeTnx.amount.toString()) }));

            var totalWithdrawAmount = totalWithdrawAmountArr.reduce((a, b) => a + b, 0);
            var totalDepositAmount = totalDepositAmountArr.reduce((a, b) => a + b, 0);

            var tokenDetail = new TokenDetail(
                totalDepositAmount - totalWithdrawAmount, // Calcluate the Total amount (Total_Deposit - Total_Withdraw = Total_Remain)
                coin,
                httpResponse[coin].USD
            );
            tokenDetailList.push(tokenDetail);
        }

        tokenList.setTokenList(tokenDetailList);
        return tokenList;
    }
}