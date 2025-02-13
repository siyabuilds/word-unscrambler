import { useState } from "react";

const Unscrambler = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUnscramble = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/unscramble?word=${input}`);
      const data = await res.json();

      if (res.ok) {
        setResults(data.possibleWords || []);
      } else {
        setError(data.error || "Failed to unscramble");
      }
    } catch (err: unknown) {
      console.error(err);
      setError("An error occurred while fetching results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2 text-black">Word Unscrambler</h2>
      <input
        type="text"
        placeholder="Enter scrambled word"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded mb-2 text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
      <button
        onClick={handleUnscramble}
        className={`w-full bg-blue-500 text-white p-2 rounded transition-all duration-300 transform ${
          loading ? "cursor-wait" : "hover:scale-105"
        }`}
        disabled={loading}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-4 h-4 border-2 border-t-2 border-white rounded-full animate-spin"></div>
          </div>
        ) : (
          "Unscramble"
        )}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <ul className="mt-4 flex flex-col gap-3">
        {results.length > 0 ? (
          results.map((word, idx) => (
            <li
              key={idx}
              className="p-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white rounded-xl shadow-md hover:scale-105 transform transition-all"
            >
              {word}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No matches found.</p>
        )}
      </ul>
    </div>
  );
};

export default Unscrambler;
