'use client';

import { useState, useEffect } from 'react';
import NewsCard from '@/components/NewsCard';
import CryptoCard from '@/components/CryptoCard';
import { NewsArticle, CryptoCoin } from '@/types';

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [crypto, setCrypto] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, cryptoRes] = await Promise.all([
          fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN'),
          fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1')
        ]);

        const newsData = await newsRes.json();
        const cryptoData = await cryptoRes.json();

        setNews(newsData.Data.slice(0, 12)); // Get first 12 articles
        setCrypto(cryptoData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Crypto Live News
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Stay updated with the latest cryptocurrency news and market data
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Crypto Prices Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Top Cryptocurrencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crypto.map((coin) => (
              <CryptoCard key={coin.id} coin={coin} />
            ))}
          </div>
        </section>

        {/* News Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Latest News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
