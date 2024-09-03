/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_options } from "../utils/constants";
import { addTopRatedMovies } from "../utils/movieSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const top_rated_movies = useSelector((store) => store.movies.topRatedMovies);

  const getTopRatedMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_options
    );
    const data = await response.json();
    // console.log(data.results);
    dispatch(addTopRatedMovies(data.results));
  };
  
  useEffect(() => {
    !top_rated_movies && getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
