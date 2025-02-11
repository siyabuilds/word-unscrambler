import * as fs from "fs";
import * as path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const loadDictionary = async (): Promise<Record<number, string[]>> => {
  const filePath = path.join(process.cwd(), "src/pages/api/words.json");

  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const dictionary = JSON.parse(data);
    return dictionary;
  } catch (error) {
    console.error("Error loading dictionary:", error);
    throw new Error("Failed to load dictionary: " + error.message);
  }
};

// Function to unscramble the word (async version)
const unscramble = async (scrambledWord: string): Promise<string[]> => {
  try {
    const dictionary = await loadDictionary();
    const wordLength = scrambledWord.length;

    if (!dictionary[wordLength]) return [];

    const sortedScrambled = scrambledWord.split("").sort().join("");
    // Find matching words
    const matchingWords = dictionary[wordLength].filter((word) => {
      const sortedWord = word.split("").sort().join("");
      return sortedScrambled === sortedWord;
    });

    return matchingWords;
  } catch (error) {
    console.error("Error unscrambling word:", error);
    throw new Error("Failed to unscramble word: " + error.message);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { word } = req.query;

    if (typeof word !== "string") {
      return res
        .status(400)
        .json({ error: "Word query parameter is required" });
    }

    try {
      const possibleWords = await unscramble(word);
      return res.status(200).json({ word, possibleWords });
    } catch (error) {
      console.error("API Handler Error:", error);
      return res
        .status(500)
        .json({ error: "Failed to unscramble word", details: error.message });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
