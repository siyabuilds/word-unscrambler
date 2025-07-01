import { useState, useRef, useEffect } from "react";

const Unscrambler = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsTyping(true);

    // Clear typing indicator after 2 seconds of no typing
    setTimeout(() => setIsTyping(false), 200);

    if (results.length > 0) setResults([]);
    if (error) setError("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleUnscramble();
    }
  };

  const copyToClipboard = (word: string) => {
    navigator.clipboard.writeText(word);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Main card */}
      <div className="glass rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-emerald-500/5 rounded-3xl"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center pulse-glow">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
              Unscramble Magic
            </h2>
            <p className="text-slate-400">
              Enter your scrambled letters and watch the magic happen
            </p>
          </div>

          {/* Input section */}
          <div className="space-y-6">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter scrambled letters... (e.g., 'act', 'listen')"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full px-6 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-lg backdrop-blur-sm"
                disabled={loading}
              />

              {/* Typing indicator */}
              {isTyping && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleUnscramble}
              disabled={loading || !input.trim()}
              className="w-full bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:cursor-not-allowed relative overflow-hidden"
            >
              {loading ? (
                <div className="flex justify-center items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Unscrambling...</span>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>Unscramble Words</span>
                </div>
              )}
            </button>
          </div>

          {/* Error display */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="flex items-center gap-2 text-red-400">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Results section */}
          <div className="mt-8">
            {results.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-200 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-emerald-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Found {results.length} word{results.length !== 1 ? "s" : ""}
                  </h3>
                  <span className="text-sm text-slate-400">Click to copy</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {results.map((word, idx) => (
                    <div
                      key={idx}
                      onClick={() => copyToClipboard(word)}
                      className="glass-light rounded-xl p-4 hover:bg-slate-700/30 cursor-pointer transition-all duration-300 transform hover:scale-105 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-slate-100 group-hover:text-indigo-300 transition-colors">
                          {word}
                        </span>
                        <svg
                          className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {word.length} letter{word.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              !loading &&
              input && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467.881-6.077 2.33l-.708-.708A8.961 8.961 0 0112 13.5z"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-400 text-lg">No words found</p>
                  <p className="text-slate-500 text-sm mt-2">
                    Try different letters or check your spelling
                  </p>
                </div>
              )
            )}

            {!input && !loading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <p className="text-slate-400 text-lg">Ready to unscramble</p>
                <p className="text-slate-500 text-sm mt-2">
                  Enter some scrambled letters to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips section */}
      <div className="mt-8 glass-light rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-slate-200 mb-3 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-amber-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          Pro Tips
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-400">
          <div className="flex items-start gap-2">
            <span className="text-emerald-400">•</span>
            <span>Try common letter combinations like 'ing', 'ed', 'er'</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400">•</span>
            <span>Look for vowels to help form word patterns</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400">•</span>
            <span>Start with shorter words first</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400">•</span>
            <span>Press Enter to quickly unscramble</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unscrambler;
