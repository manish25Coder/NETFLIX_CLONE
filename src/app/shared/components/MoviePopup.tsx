import { useUser } from "@/stores/user.store";
import { IMovie } from "@/types/movie.types";
import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const MoviePopu = ({
  movie,
  handleOpenInfoModal,
}: {
  movie: IMovie;
  handleOpenInfoModal: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setVideoPlaying] = useState(false);
  const {user,updateUser,updateFavourites}=useUser()

  const isFavourite=useMemo(()=>{
    return user?.favourites.includes(movie._id);
  },[user,movie])

  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      setVideoPlaying(true);
      videoRef.current.play();
      videoRef.current.requestFullscreen();
    }
  };

  const toggleFavourites=async(movieId:string)=>{
    try {
      if(isFavourite){
        await axios.delete("/api/favourite",{data:{movieId}})
      }else{
        await axios.post("/api/favourite",{movieId})
      }
      updateUser();
      updateFavourites();
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setVideoPlaying(false);
        videoRef.current?.pause()
        videoRef.current=null
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div
      className="
        absolute
        left-1/2
        -translate-x-1/2
        -top-28
        w-[320px]
        z-50
        rounded-lg
        bg-[#181818]
        shadow-2xl
        transform
        origin-bottom
        scale-95
        group-hover:scale-100
        group-hover:translate-y-2
        transition-all
        duration-300
        ease-out
        popupShadow
        pointer-events-auto
      "
    >
      {/* Preview */}
      <div className="relative w-full h-[180px] rounded-t-lg overflow-hidden">
        <video
          ref={videoRef}
          src={movie.videoUrl}
          poster={movie.thumbnailUrl}
          className={clsx("absolute inset-0 w-full h-full object-cover", {
            hidden: !isVideoPlaying,
          })}
        />
        {!isVideoPlaying && (
          <Image
            src={movie.thumbnailUrl}
            alt={movie.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        {/* Controls */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-2 items-center">
            <button
              className="bg-white rounded-full p-2"
              onClick={handlePlayButtonClick}
            >
              <Image src="/assets/play.svg" width={18} height={18} alt="play" />
            </button>

            <button className="bg-[#2a2a2a] rounded-full p-2"
              onClick={()=>toggleFavourites(movie._id)}>
              <Image src={`/assets/${isFavourite?"white-tick":"plus"}.svg`}width={18} height={18} alt="add" />
            </button>
          </div>
 
          <button
            onClick={handleOpenInfoModal}
            className="bg-[#2a2a2a] rounded-full p-2 hover:bg-[#3a3a3a]"
          >
            <Image
              src="/assets/down-arrow.svg"
              width={20}
              height={20}
              alt="info"
            />
          </button>
        </div>

        {/* Meta */}
        <div className="flex gap-2 items-center text-sm text-[#bcbcbc] mb-2">
          <span className="border border-[#fff6] px-2 rounded whitespace-nowrap">
            U/A 13+
          </span>
          <span>{movie.duration}</span>
          <span className="border border-[#fff6] rounded px-1 text-xs">HD</span>
        </div>

        <p className="text-white text-sm">{movie.genre}</p>
      </div>
    </div>
  );
};

export default MoviePopu;
