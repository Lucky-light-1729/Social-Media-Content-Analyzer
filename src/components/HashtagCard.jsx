import React from "react";

const HashtagList = ({ hashtags = [] }) => {
  if (!hashtags.length)
    return <p className="text-slate-500 text-sm mt-1">No hashtags found.</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Top Hashtags</h3>
      <div className="flex flex-wrap gap-2">
        {hashtags.map((tag, i) => (
          <span
            key={i}
            title="Click to copy"
            onClick={() => navigator.clipboard.writeText(tag)}
            className="cursor-pointer bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HashtagList;
