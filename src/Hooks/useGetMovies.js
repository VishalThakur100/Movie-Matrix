// import React from "react";
import { API_options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useGetMovies = () => {
  const dispatch = useDispatch();

  const now_playing_Movies = useSelector((store) => store.movies.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_options
    );
    const data = await response.json();

    dispatch(addNowPlayingMovies(data.results));
  };
  // Fetching movies only when now_playing_movies is not available in the Redux store
  useEffect(() => {
    !now_playing_Movies && getNowPlayingMovies();
  }, []);
};

export default useGetMovies;
