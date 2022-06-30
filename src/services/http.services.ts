import axios from 'axios';

enum HTTP_METHOD {GET, POST}

export class HTTPService {
    async getPricesRequest(symbols: string[], currencyUnit: string = "USD"){
        var symbolList = symbols.join(',')
        var headers = {
            Accept: 'application/json',
            Authorization: `Apikey a1b0d4cb7bc41399ebeee2c3ca1ef3b35959f4c46cbb603c83153b253ab8e339` 
        }
        var url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbolList}&tsyms=${currencyUnit}`
        return await this.getRequest(url, headers);
    }

    private async getRequest(url: string, header: any) {
        try {
            const { data } = await axios.get(url, { headers: { header }});
            console.log(data);
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