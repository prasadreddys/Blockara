import Image from 'next/image';
import { NewsArticle } from '@/types';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const publishedDate = new Date(article.published_on * 1000).toLocaleDateString();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {article.imageurl && (
        <div className="relative h-48">
          <Image
            src={article.imageurl}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            {article.title}
          </a>
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-3">
          {article.body}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{article.source}</span>
          <span>{publishedDate}</span>
        </div>
        {article.tags && (
          <div className="mt-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {article.tags.split('|')[0]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}