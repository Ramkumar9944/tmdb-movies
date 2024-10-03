import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
          );
          setMovie(response.data);
          setLoading(false);
        } catch (err) {
          setError("Failed to load movie details");
          setLoading(false);
        }
      };

      fetchMovieDetails();
    }
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {movie && (
        <>
          {/* Backdrop Image */}
          <div
            className="w-full h-96 bg-cover bg-center rounded-lg shadow-lg mb-6"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          ></div>

          {/* Movie Title and Tagline */}
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="italic text-gray-500 mb-6">"{movie.tagline}"</p>

          {/* Movie Info */}
          <div className="flex flex-wrap">
            <Image
              className="w-64 h-auto rounded-lg shadow-lg mr-8 mb-6"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="flex-1">
              <p className="text-lg mb-4">
                <strong>Overview:</strong> {movie.overview}
              </p>

              <p className="mb-4">
                <strong>Release Date:</strong> {movie.release_date}
              </p>

              <p className="mb-4">
                <strong>Runtime:</strong> {movie.runtime} minutes
              </p>

              <p className="mb-4">
                <strong>Genres:</strong>{" "}
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>

              <p className="mb-4">
                <strong>Vote Average:</strong> {movie.vote_average}/10 (
                {movie.vote_count} votes)
              </p>

              <p className="mb-4">
                <strong>Budget:</strong> ${movie.budget.toLocaleString()}
              </p>

              <p className="mb-4">
                <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
              </p>

              {movie.belongs_to_collection && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold">
                    Belongs to Collection:
                  </h3>
                  <div className="flex items-center">
                    <Image
                      className="w-24 h-auto rounded-lg shadow-md mr-4"
                      src={`https://image.tmdb.org/t/p/w500${movie.belongs_to_collection.poster_path}`}
                      alt={movie.belongs_to_collection.name}
                    />
                    <p className="text-lg">
                      {movie.belongs_to_collection.name}
                    </p>
                  </div>
                </div>
              )}

              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Visit Official Website
                </a>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Additional Information</h2>

            {/* Production Companies */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Production Companies:
              </h3>
              <div className="flex space-x-4">
                {movie.production_companies.map((company) => (
                  <div key={company.id} className="text-center">
                    {company.logo_path && (
                      <Image
                        className="w-16 h-auto mx-auto mb-2"
                        src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                        alt={company.name}
                      />
                    )}
                    <p>{company.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Countries */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Production Countries:
              </h3>
              <p>
                {movie.production_countries
                  .map((country) => country.name)
                  .join(", ")}
              </p>
            </div>

            {/* Spoken Languages */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Spoken Languages:</h3>
              <p>
                {movie.spoken_languages
                  .map((lang) => lang.english_name)
                  .join(", ")}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
