import { Transaction, TRANSACTION_TYPE } from "../model/transaction.model";

export class CalculateService {

    async getRemainAmount(tnxs: Transaction[])
    {
        // Get the total withdraw amount
        var totalWithdrawAmountArr = await ((await this.filterByTnxType(tnxs, TRANSACTION_TYPE.WITHDRAWL)).map((wdTypeTnx) => { return parseFloat(wdTypeTnx.amount.toString()) }));
        var totalWithdrawAmount = totalWithdrawAmountArr.reduce((a, b) => a + b, 0);

        // Get the total deposit amount
        var totalDepositAmountArr = await ((await this.filterByTnxType(tnxs, TRANSACTION_TYPE.DEPOSIT)).map((dpTypeTnx) => { return parseFloat(dpTypeTnx.amount.toString()) }));
        var totalDepositAmount = totalDepositAmountArr.reduce((a, b) => a + b, 0);

        // Calcluate the Total amount (Total_Deposit - Total_Withdraw = Total_Remain)
        return totalDepositAmount - totalWithdrawAmount
    }

    async getTotalCoinUnit(tnxs: Transaction[]){
        return Array.from(new Set(await tnxs.map((tnx) =>{ return tnx.token })))
    }

    private async filterByTnxType(tnxs: Transaction[], TNXTYPE: TRANSACTION_TYPE){
        return await tnxs.filter((tnx) => {
            if(tnx.transaction_type == TNXTYPE) {
                return tnx.amount
            };
        })
    }
}