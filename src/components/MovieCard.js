import Link from 'next/link';
import Image from 'next/image';

const MovieCard = ({ movie }) => {
  return (
    <div className='bg-gray-800 rounded-lg overflow-hidden shadow-lg'>
      <Link href={`/movie/${movie.id}`}>
        <Image
          className='w-full h-72 object-cover'
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className='p-4'>
          <h2 className='text-lg font-semibold text-white truncate'>
            {movie.title}
          </h2>
          <p className='text-gray-400 mt-2'>{movie.release_date}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
