/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { API_options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const getTrailer = (movie_id) => {
  const dispatch = useDispatch();

  //   memoization make api calls only when the data is not available
  const get_Trailer = useSelector((store) => store.movies.trailerVideo);

  const getMovieTrailer = async () => {
    const movieTrailer = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,
      API_options
    );
    const jsonResponse = await movieTrailer.json();
    // console.log(jsonResponse);
    const filterData = jsonResponse.results.filter(
      (movie) => movie.type === "Trailer"
    );
    const trailer = filterData.length ? filterData[0] : jsonResponse.results[0];
    // console.log(trailer);
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    !get_Trailer && getMovieTrailer();
  }, []);
};

export default getTrailer;
