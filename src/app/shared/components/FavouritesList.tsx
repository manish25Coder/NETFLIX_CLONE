
import { useUser } from "@/stores/user.store"
import { useEffect } from "react"
import Movies from "./Movies"

export const FavouritesList=()=>{
    const {favourites,updateFavourites}=useUser()
    useEffect(()=>{
        updateFavourites();
    },[updateFavourites])
    return(
       <div className="pb-16">
         {/* <Movies movies={favourites} label="My List" /> */}
         <Movies movies={favourites ?? []} label="My List" />

         

       </div>
    )
}