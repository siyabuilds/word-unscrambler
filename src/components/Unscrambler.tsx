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
        setError(data.error || "Failed to unscramble.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[500px] mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl border border-slate-200">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700 text-center">
        Word Unscrambler
      </h2>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="e.g. act"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 ease-in-out"
        />

        <button
          onClick={handleUnscramble}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-300 disabled:bg-indigo-300"
          disabled={loading}
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Loading...</span>
            </span>
          ) : (
            "Find Words"
          )}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

      <div className="mt-6">
        {results.length > 0 ? (
          <>
            <h3 className="text-slate-700 font-medium mb-2">Possible Words:</h3>
            <ul className="flex flex-wrap gap-3 mt-4">
              {results.map((word, idx) => (
                <li key={idx}>
                  <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-200 cursor-pointer transition-all duration-300 text-lg font-semibold">
                    {word}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          !loading && (
            <p className="text-slate-400 mt-4 text-center">
              No words found. Try another one!
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Unscrambler;
