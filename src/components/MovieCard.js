import React from "react";
import { IMAGE_CDN_URL } from "../utils/constants";

const MoviewCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4">
      <img className="cursor-pointer" alt="posterImage" src={IMAGE_CDN_URL + posterPath} />
    </div>
  );
};

export default MoviewCard;
