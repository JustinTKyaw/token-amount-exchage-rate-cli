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

    getTotalTokenAmount() {return this.totalTokenAmount};
    getTokenUnit() {return this.tokenUnit};
    getTotalPrices() {return this.totalTokenAmount * this.price}

    setTotalTokenAmount(total: number){this.totalTokenAmount = total};
    setPrice(price: number) {this.price = price};
    setTokenUnit(unit: string) { this.tokenUnit = unit };
}