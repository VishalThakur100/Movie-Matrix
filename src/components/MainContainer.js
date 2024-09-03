import React from "react";
import { useSelector } from "react-redux";
import VideoContainer from "./VideoContainer";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;
  const bannerMovie = movies[0];
  // console.log(bannerMovie);
  const { original_title, overview,id} = bannerMovie;

  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle title={original_title} overview={overview} />
      <VideoContainer  movie_id={id} />

    </div>
  );
};

export default MainContainer;
