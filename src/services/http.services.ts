import axios from 'axios';

export class HTTPCryptoService {

    private header: any;

    constructor(
        header: any = {
            Accept: 'application/json',
            Authorization: `Apikey a1b0d4cb7bc41399ebeee2c3ca1ef3b35959f4c46cbb603c83153b253ab8e339` 
        }
    ) {
        this.header = header;
    }

    async getCryptocomparePrices(symbols: string[], currencyUnit: string = "USD"){
        var symbolList = symbols.join(',')
        var url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbolList}&tsyms=${currencyUnit}`
        return await this.getRequest(url, this.header);
    }

    private async getRequest(url: string, header: any) {
        try {
            const { data } = await axios.get(url, { headers: { header }});
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log('error message: ', error.message);
              return error.message;
            } else {
              console.log('unexpected error: ', error);
              return 'An unexpected error occurred';
            }
        }
    }
}