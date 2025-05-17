import * as fs from "fs";
import * as path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const loadDictionary = async () => {
  const filePath = path.join(process.cwd(), "src/pages/api/words.json");

  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const dictionary = JSON.parse(data);
    return dictionary;
  } catch (error: unknown) {
    console.error("Error loading dictionary:", error);
  }
};

// Function to unscramble the word (async version)
const unscramble = async (scrambledWord: string) => {
  try {
    const dictionary = await loadDictionary();
    const wordLength = scrambledWord.length;

    if (!dictionary[wordLength]) return [];

    const sortedScrambled = scrambledWord.split("").sort().join("");
    // Find matching words
    const matchingWords = dictionary[wordLength].filter((word: string) => {
      const sortedWord = word.split("").sort().join("");
      return sortedScrambled === sortedWord;
    });

    return matchingWords;
  } catch (error) {
    console.error("Error unscrambling word:", error);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    const { word } = req.query;

    if (typeof word !== "string") {
      return res
        .status(400)
        .json({ error: "Word query parameter is required" });
    }

    try {
      const possibleWords = await unscramble(word.toLowerCase());
      return res.status(200).json(possibleWords);
    } catch (error) {
      console.error("API Handler Error:", error);
      return res.status(500).json({ error: "Failed to unscramble word" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
