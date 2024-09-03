import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_options } from "../utils/constants";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const get_Popular_movie = useSelector((store) => store.movies.popularMovies);

  const getPopularMoview = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_options
    );
    const data = await response.json();
    // console.log(data.results);
    dispatch(addPopularMovies(data.results));
  };

  useEffect(() => {
    !get_Popular_movie && getPopularMoview();
  }, []);
};

export default usePopularMovies;
