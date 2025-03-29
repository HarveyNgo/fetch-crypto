export interface getMarketsCredentials {}

export interface MarketsState {
  marketsData: GetMarketResponse[] | [];
  marketsSummariesData: MarketSummaries[] | [];
  getMarketsDataSuccess: boolean;
  getMarketsSummariesDataSuccess: boolean;
}

export interface GetMarketResponse {
  title: string;
  list: MarketData[];
}
export type MarketData = {
  id: number;
  marketId: string;
  marketName: string;
  baseCurrency: string;
  marketCurrency: string;
  marketCurrencyLong: string;
  ceiling: string;
  floor: string;
  baseIncrement?: string;
  quoteIncrement?: string;
  baseMinSize: any;
  baseMaxSize: any;
  tradingStatus: string;
  listRoles: any;
  baseCurrencyTruncate: number;
  priceTruncate: number;
  quoteCurrencyTruncate: number;
};

export interface MarketSummaries {
  marketId: number;
  market: string;
  askPrice: string;
  bidPrice: string;
  lastPrice: string;
  openPrice: string;
  prevPrice: string;
  high: string;
  low: string;
  volume: string;
  listRoles: any;
}
