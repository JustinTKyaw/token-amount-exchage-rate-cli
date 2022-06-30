enum TRANSACTION_TYPE { DEPOSIT, WITHDRAWL }
export class Transaction {
    timestamp: string;
    transaction_type: TRANSACTION_TYPE;
    token: string;
    amount: number;
}