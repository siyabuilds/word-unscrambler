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
        className="w-full p-2 border rounded mb-2 text-blue-950"
      />
      <button
        onClick={handleUnscramble}
        className="w-full bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-white hover:text-black hover:border hover:border-black transition duration-200 ease-in-out"
        disabled={loading}
      >
        {loading ? "Unscrambling..." : "Unscramble"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <ul className="mt-4 flex">
        {results.length > 0 ? (
          results.map((word, idx) => (
            <li key={idx} className="p-1">
              <span className="bg-black text-white  px-4 py-2 rounded cursor-pointer hover:bg-white hover:text-black hover:border hover:border-black transition duration-200 ease-in-out">
                {word}
              </span>
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
