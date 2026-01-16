"use client";

import { IMovie } from "@/types/movie.types";
import Image from "next/image";
import { useState } from "react";
import MoviePopu from "./MoviePopup";
import MovieInfoModal from "./MovieInfiModal";

const Movies = ({ movies, label }: { movies: IMovie[]; label: string }) => {
  const [movieData, setMovieData] = useState<IMovie | null>(null);
  const [movieId, setMovieId] = useState<string | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  let hoverTimeout: NodeJS.Timeout;

  const handleMouseEnter = (movie: IMovie, movieId: string) => {
      setMovieData(movie);
      setMovieId(movieId);
    };

  const handleMouseLeave = () => {
    setMovieId(null);
  };

  const handleOpenInfoModal = () => {
    setMovieId(null);
    setShowInfoModal(true);
  };

  return (
    <>
      <div className="relative my-[3vw] px-[4%]">
        {movies.length > 0 && (
          <h2 className="text-white text-xl font-semibold mb-3">{label}</h2>
        )}

        <div
          className="
            flex gap-4
            overflow-x-auto
            hide-scrollbar
            pb-32
          "
        >
          {movies.map((movie) => (
            <div
              key={movie._id}
              onMouseEnter={() => handleMouseEnter(movie, movie._id)}
              onMouseLeave={handleMouseLeave}
              className="
                relative
                min-w-[250px]
                h-[140px]
                cursor-pointer
                overflow-visible
                group
              "
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={movie.thumbnailUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>

              {movie._id === movieId && (
                <div className="absolute inset-0 z-50">
                  <MoviePopu
                    movie={movie}
                    handleOpenInfoModal={handleOpenInfoModal}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showInfoModal && movieData && (
        <MovieInfoModal
          showInfoModal={showInfoModal}
          setShowInfoModal={setShowInfoModal}
          movieData={movieData}
        />
      )}
    </>
  );
};

export default Movies;
