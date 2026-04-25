export interface NewsArticle {
  id: string;
  title: string;
  url: string;
  imageurl: string;
  body: string;
  tags: string;
  published_on: number;
  source: string;
}

export interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}