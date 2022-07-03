const FLOAT_PRECISION = 2;

export class TokenDetail {
    private totalTokenAmount: number;
    private price: number;
    private tokenUnit: string;

    constructor(
        totalTokenAmount: number = 0,
        tokenUnit: string = "",
        price: number = 0
    ){
        this.totalTokenAmount = totalTokenAmount;
        this.price = price;
        this.tokenUnit = tokenUnit;
    }

    getTotalTokenAmount() {return (this.totalTokenAmount).toFixed(FLOAT_PRECISION)};
    getTokenUnit() {return this.tokenUnit};
    getTotalPrices() { return (this.totalTokenAmount * this.price).toFixed(FLOAT_PRECISION)}

    setTotalTokenAmount(total: number){this.totalTokenAmount = total};
    setPrice(price: number) {this.price = price};
    setTokenUnit(unit: string) { this.tokenUnit = unit };
}