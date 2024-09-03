import OpenAI from "openai";
import { OPEN_API_KEY } from "./constants";

// import "dotenv/config";
// resolve.fallback: { "path": false };
// console.log(process.env)

const openai = new OpenAI({
  apiKey: OPEN_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default openai;
