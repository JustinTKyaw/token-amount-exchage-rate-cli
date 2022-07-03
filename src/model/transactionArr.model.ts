import { Transaction, TRANSACTION_TYPE } from "./transaction.model";

export class TransactionArray {
    private transactions: Transaction[] = [];

    constructor(transactions: Transaction[] = [])
    {
        this.transactions = transactions;
    }

    async getTransactionsByTnxType(tnxType: TRANSACTION_TYPE, tokenType: string){
        return await this.transactions.filter((tnx) => { 
            if(tnx.transaction_type == tnxType && tnx.token == tokenType) return tnx;
        })
    }

    getTransactions() { return this.transactions; }

    async getTotalCoinUnit(){
        return Array.from(new Set(await this.transactions.map((tnx) =>{ return tnx.token })))
    }

    setTransactions(transactions: Transaction[])
    {
        this.transactions = transactions;
    }
    
}