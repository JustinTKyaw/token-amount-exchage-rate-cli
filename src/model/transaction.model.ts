export enum TRANSACTION_TYPE { DEPOSIT, WITHDRAWL, NULL }

export class Transaction {
    timestamp: string;
    transaction_type: TRANSACTION_TYPE;
    token: string;
    amount: number;

    constructor(
            timestamp: string = "",
            transaction_type: TRANSACTION_TYPE = TRANSACTION_TYPE.NULL,
            token: string = "",
            amount: number = 0
        )
    {
        this.timestamp = timestamp;
        this.transaction_type = transaction_type;
        this.token = token;
        this.amount = amount;        
    }
}