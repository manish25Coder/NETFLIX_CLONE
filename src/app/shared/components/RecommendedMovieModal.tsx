import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/Dialog";
import Image from "next/image";
import { IMovie, IRecommendedMovie } from "@/types/movie.types";

interface Props {
  isRecommendedMovieModalOpen: boolean;
  setIsRecommendedMovieModalOpen: (open: boolean) => void;
  recommendedMovie: IRecommendedMovie | null;
  movies: IMovie[];
}

const RecommendedMovieModal = ({
  isRecommendedMovieModalOpen,
  setIsRecommendedMovieModalOpen,
  recommendedMovie,
  movies,
}: Props) => {
     console.log("Modal received movies:", movies); // ✅ Add this debug log
  console.log("Modal received recommendedMovie:", recommendedMovie);

  return (
    <Dialog
      open={isRecommendedMovieModalOpen}
      onOpenChange={() => setIsRecommendedMovieModalOpen(false)}
    >
      <DialogContent
        className="
        w-[900px]
        h-[80vh]
        bg-[#181818]
        border-none
        text-white
        flex
        flex-col
        overflow-hidden
    "
      >
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            ⭐ Recommended Movies
          </DialogTitle>

          <DialogDescription className="text-[#b3b3b3] mt-2">
            {recommendedMovie?.reason}
          </DialogDescription>
        </DialogHeader>

        {/* MOVIE LIST (SCROLLABLE) */}
        <div className="mt-6 flex-1 overflow-y-auto pr-2">
          {movies.length === 0 ? (
            <p className="text-center text-gray-400">
              No movies matched.
            </p>
          ) : (
            movies.map((movie, index) => (
              <div
                key={movie._id}
                className="flex gap-4 items-center border-b border-[#333] py-5 min-h-[120px]"
              >
                {/* INDEX */}
                <div className="text-[#999] text-xl w-6">
                  {index + 1}
                </div>

                {/* THUMBNAIL */}
                <div className="relative w-[150px] h-[85px] rounded overflow-hidden">
                  <Image
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                {/* INFO */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">
                      {movie.title}
                    </h3>
                    <span className="text-sm text-[#999]">
                      {movie.duration} min
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-[#b3b3b3]">
                    {movie.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendedMovieModal;

