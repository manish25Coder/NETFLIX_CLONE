// import Image from "next/image";
'use client'
import Navbar from "./shared/components/Navbar";
import Billboard from "./shared/components/Billboard";
import MovieList from "./shared/components/MovieList";
import { useEffect } from "react";
import { useUser } from "@/stores/user.store";
import { FavouritesList } from "./shared/components/FavouritesList";

export default function Home() {
  const {updateUser}=useUser()
  useEffect(()=>{
    updateUser();
  },[updateUser])
  return (
    <div>
      
      <Navbar/>
      <Billboard/>
      <MovieList/>
      <FavouritesList/>
    </div>
  );
}
