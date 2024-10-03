'use client'; // Ensures this is a client-side component

import { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const { movies, loading, error } = useContext(MovieContext);

  if (loading) return <div className='text-center py-20'>Loading...</div>;
  if (error)
    return <div className='text-center py-20 text-red-600'>{error}</div>;

  return (
    <div className='max-w-7xl mx-auto py-10'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Popular Movies</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
