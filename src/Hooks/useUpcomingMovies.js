import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_options } from "../utils/constants";
import { addUpcomingMovies } from "../utils/movieSlice";


const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const upcoming_movies = useSelector((store) => store.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_options
    );
    const data = await response.json();
    // console.log(data.results);
    dispatch(addUpcomingMovies(data.results));
  };
  
  useEffect(() => {
    !upcoming_movies && getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
