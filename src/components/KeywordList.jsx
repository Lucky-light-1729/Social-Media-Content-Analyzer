import React from "react";

const KeywordList = ({ keywords = [] }) => {
  const filteredKeywords = keywords.filter((word) => !/^\d+$/.test(word));

  if (!filteredKeywords.length)
    return <p className="text-slate-500 text-sm mt-1">No keywords found.</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Top Keywords</h3>
      <div className="flex flex-wrap gap-2">
        {filteredKeywords.map((word, i) => (
          <span
            key={i}
            title="Click to copy"
            onClick={() => navigator.clipboard.writeText(word)}
            className="cursor-pointer bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeywordList;
