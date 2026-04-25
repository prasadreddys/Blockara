import Image from 'next/image';
import { CryptoCoin } from '@/types';

interface CryptoCardProps {
  coin: CryptoCoin;
}

export default function CryptoCard({ coin }: CryptoCardProps) {
  const priceChangeColor = coin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600';
  const priceChangeSymbol = coin.price_change_percentage_24h >= 0 ? '+' : '';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-3">
        <Image
          src={coin.image}
          alt={coin.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{coin.name}</h3>
          <p className="text-gray-500 uppercase text-sm">{coin.symbol}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">${coin.current_price.toLocaleString()}</p>
          <p className={`text-sm ${priceChangeColor}`}>
            {priceChangeSymbol}{coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}