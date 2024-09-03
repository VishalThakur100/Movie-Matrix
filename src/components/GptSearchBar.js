import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import openai from "../utils/openAi";
import { API_options } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import { useDispatch } from "react-redux";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const handleGptSearchClick = async () => {
    // console.log(searchText.current.value);
    //   here make an api call

    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the quey :" +
      searchText.current.value +
      "And only give me name of 5 movies, comma separated like this Golmaal, Hungama, Chennai Express, De Dana Dan, Chup Chup Ke";

    const GPTResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!GPTResults) {
      console.error("GPT failed to return results");
      return; // or handle the failure case better here. For now, just log an error.  // This is a placeholder, actual error handling should be done in the calling function.  // For example, if the API call fails, you could display an error message to the user.  // Also, you should not log errors in production code. Instead, use a logging service or error reporting tool.  // Here, I'm logging the error to the console for demonstration purposes.  // In a real-world application, you should log the error to a server for further analysis and debugging.  // The error message should contain the details of the failure, such as the user's input, the error message, and any relevant error details provided by the API call.  // The error message should also include a timestamp for easy debugging.  // The error message should be in a format that can be easily parsed and
    }
    console.log(GPTResults.choices?.[0]?.message.content);
    const gptMovies = GPTResults.choices?.[0]?.message.content.split(", ");

    const moviePromiseArray = gptMovies.map((movie) => fetchMovies(movie));
    const movieData = await Promise.all(moviePromiseArray);
    console.log(movieData);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: movieData })
    );

    //   for each movie search on the tmdb
    // gptMovies.forEach(async (movie) => {
    //   const movieData = await openai.Completion.create({
    //     engine: "davinci",
    //     prompt: `What are the top 5 key features of ${movie}?`,
    //   });
    //   console.log(movieData.choices[0].text.trim());
    // });
  };

  const fetchMovies = async (movie) => {
    const movieData = fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_options
    );
    const jsonData = await movieData.json();
    console.log(jsonData);
    return jsonData;
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
