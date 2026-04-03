import { useEffect, useState } from 'react';
import { mangaService } from '../services/api';
import type { HomeData } from '../types';
import { MangaCard } from '../components/MangaCard';
import { Loader2, TrendingUp, Clock } from 'lucide-react';

export const Home = () => {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const homeData = await mangaService.getHome();
        setData(homeData);
      } catch (err) {
        setError('Failed to fetch manga data. Please make sure the API is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <p className="text-red-400 text-lg mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Popular Slider */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="h-6 w-6 text-indigo-500" />
          <h2 className="text-2xl font-bold text-gray-100">Popular Manga</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data?.popularManga.mangas.slice(0, 10).map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      </section>

      {/* Latest Updates */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <Clock className="h-6 w-6 text-indigo-500" />
          <h2 className="text-2xl font-bold text-gray-100">{data?.latestUpdates.title || 'Latest Updates'}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {data?.latestUpdates.mangas.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      </section>
    </div>
  );
};
