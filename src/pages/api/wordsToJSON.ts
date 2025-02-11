import * as fs from "fs";
import * as path from "path";

const convertWordsToJSON = (txtFilePath: string, outputJsonPath: string) => {
  try {
    const data = fs.readFileSync(txtFilePath, "utf-8");
    const words = data.split(/\r?\n/).map((word) => word.trim().toLowerCase()); // Convert to lowercase

    const dictionary: Record<number, string[]> = {};

    words.forEach((word) => {
      const wordLength = word.length;

      if (!dictionary[wordLength]) {
        dictionary[wordLength] = [];
      }

      dictionary[wordLength].push(word);
    });

    fs.writeFileSync(outputJsonPath, JSON.stringify(dictionary, null, 2));
    console.log(
      `Successfully converted words to JSON and saved at ${outputJsonPath}`
    );
  } catch (error) {
    console.error("Error while converting words to JSON:", error);
  }
};

// Example usage
const txtFilePath = path.join(__dirname, "words.txt"); // Path to the words.txt file
const outputJsonPath = path.join(__dirname, "words.json"); // Path to the output JSON file

convertWordsToJSON(txtFilePath, outputJsonPath);
