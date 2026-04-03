import { Link } from 'react-router-dom';
import type { Manga } from '../types';
import { getImageUrl } from '../utils/image';

interface MangaCardProps {
  manga: Manga;
}

export const MangaCard = ({ manga }: MangaCardProps) => {
  return (
    <Link 
      to={`/manga/${manga.id}`} 
      className="group bg-gray-900 rounded-lg overflow-hidden border border-gray-800 transition hover:scale-[1.02] hover:shadow-xl hover:border-indigo-500"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={getImageUrl(manga.image)} 
          alt={manga.title} 
          className="object-cover w-full h-full transition group-hover:opacity-75"
          loading="lazy"
        />
        {manga.latestChapter && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <span className="text-sm font-medium text-white">{manga.latestChapter.name}</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-base font-bold text-gray-100 line-clamp-2 leading-tight group-hover:text-indigo-400 transition">
          {manga.title}
        </h3>
        {manga.views && (
          <p className="text-xs text-gray-400 mt-1">{manga.views} views</p>
        )}
      </div>
    </Link>
  );
};
