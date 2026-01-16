"use client";

import { Film } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { Slider } from "../ui/Slider";
import { useEffect, useState } from "react";
import { GENRES, MOODS } from "@/constants";
import { Badge } from "../ui/Badge";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { IMovie, IRecommendedMovie } from "@/types/movie.types";
import RecommendedMovieModal from "./RecommendedMovieModal";

interface INetflixGPTModalProps {
  isNetflixGPTModalOpen: boolean;
  setIsNetflixGPTModalOpen: (isOpen: boolean) => void;
}

interface GeminiAIResponse {
  recommendation: {
    _id: string;
  }[];
  Reason?: string;
  reason?: string;
}



export const NetflixGPTModal = ({
  isNetflixGPTModalOpen,
  setIsNetflixGPTModalOpen,
}: INetflixGPTModalProps) => {
  const [duration, setDuration] = useState<number[]>([10]);
  const [rating, setRating] = useState<number[]>([6]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [movies, setMovies] = useState<IMovie[]>([]);

  const [recommendedMovie, setRecommendedMovie] =
    useState<IRecommendedMovie | null>(null);

  const [matchedMovies, setMatchedMovies] = useState<IMovie[]>([]);
  const [isRecommendedMovieModalOpen, setIsRecommendedMovieModalOpen] =
    useState(false);

  const toggleMood = (mood: string) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };
  const fetchMovies = async () => {
    try {
      const { data } = await axios.get("/api/movies");

      const normalized: IMovie[] = data.map((movie: IMovie) => ({
  ...movie,
  _id: String(movie._id),
}));


      setMovies(normalized);

      console.log(
        "🎬 Movie IDs loaded:",
        normalized.map((m: IMovie) => m._id)
      );
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

 
  const handleRecommendMovie = async () => {
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
      });

      const preferences = {
        genre: selectedGenres,
        minDuration: duration[0],
        minRating: rating[0],
        mood: selectedMoods,
      };

      const contents = [
        {
          role: "user",
          parts: [
            {
              text: `
You are a movie recommendation assistant.

Movies:
${JSON.stringify(movies, null, 2)}

Preferences:
${JSON.stringify(preferences, null, 2)}

Return ONLY JSON in this format:
{
  "recommendation": [{ "_id": "movie_id" }],
  "Reason": "short explanation"
}
              `,
            },
          ],
        },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents,
      });

      const text =
        response?.candidates?.[0]?.content?.parts
          ?.map((p) => p.text)
          .join("") || "";

      const cleaned = text.replace(/```json|```/g, "");
      const output: GeminiAIResponse = JSON.parse(cleaned);

const recommendedIds = output.recommendation.map((r) =>
  String(r._id)
);

const matched = movies.filter((movie) =>
  recommendedIds.includes(String(movie._id))
);

setRecommendedMovie({
  reason: output.Reason || output.reason || "Recommended for you",
  recommendation: recommendedIds,
});

setMatchedMovies(matched);


      setIsNetflixGPTModalOpen(false);
      setTimeout(() => {
        setIsRecommendedMovieModalOpen(true);
      }, 100);
    } catch (error) {
      console.error("Recommendation error:", error);
      alert("Failed to generate recommendations");
    }
  };

  return (
    <>
      <Dialog
        open={isNetflixGPTModalOpen}
        onOpenChange={() => setIsNetflixGPTModalOpen(false)}
      >
        <DialogContent className="bg-[#1a1a1a] max-w-2xl w-full text-white border-[#333]">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center text-2xl font-bold">
              <Film className="text-red-500" />
              Find Your Perfect Movie
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Adjust preferences to get recommendations
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span>{duration[0]} min</span>
              </div>
              <Slider value={duration} onValueChange={setDuration} max={15} />
            </div>

            <div>
              <div className="flex justify-between">
                <span>Minimum Rating</span>
                <span>{rating[0]}/10</span>
              </div>
              <Slider value={rating} onValueChange={setRating} max={10} />
            </div>

            <div>
              <p className="mb-2">Mood</p>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((mood) => (
                  <Badge
                    key={mood}
                    variant={
                      selectedMoods.includes(mood) ? "default" : "outline"
                    }
                    onClick={() => toggleMood(mood)}
                  >
                    {mood}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2">Genres</p>
              <div className="flex flex-wrap gap-2">
                {GENRES.map((genre) => (
                  <Badge
                    key={genre}
                    variant={
                      selectedGenres.includes(genre) ? "default" : "outline"
                    }
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <button
              disabled={!movies.length}
              onClick={handleRecommendMovie}
              className="bg-red-600 px-4 py-2 rounded text-white disabled:opacity-50"
            >
              Generate recommendations
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <RecommendedMovieModal
        isRecommendedMovieModalOpen={isRecommendedMovieModalOpen}
        setIsRecommendedMovieModalOpen={setIsRecommendedMovieModalOpen}
        recommendedMovie={recommendedMovie}
        movies={matchedMovies}
      />
    </>
  );
};
