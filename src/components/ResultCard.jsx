import React from "react";
import SentimentSummary from "./SentimentSummary";
import HashtagList from "./HashtagCard";
import KeywordList from "./KeywordList";

function ResultCard({ data }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      {/* Centered Title */}
      <h2 className="text-xl font-bold text-gray-800 text-center mb-6 border-b border-slate-200 pb-2">
        Analysis Result
      </h2>

      {/* Grid layout for summary + lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <SentimentSummary
          sentiment={data.sentiment}
          sentimentScore={data.sentimentScore}
          engagementEstimate={data.engagementEstimate}
          readability={data.readability}
        />

        <div className="space-y-6">
          <KeywordList keywords={data.keywords} />
          <HashtagList hashtags={data.hashtags} />
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
