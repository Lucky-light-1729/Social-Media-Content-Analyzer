import React from "react";

const sentimentEmojis = {
  Positive: "😊",
  Neutral: "😐",
  Negative: "😞",
};

function SentimentSummary({ sentiment, sentimentScore, engagementEstimate, readability }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Sentiment Overview
      </h3>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{sentimentEmojis[sentiment]}</span>
        <h4 className="text-xl font-semibold text-gray-800">{sentiment}</h4>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          🧠 <strong>Sentiment Score:</strong> {sentimentScore.toFixed(2)}
        </p>
        <p>
          🔮 <strong>Engagement (est.):</strong> {engagementEstimate} / 100
        </p>
        <p>
          🧾 <strong>Readability:</strong> {readability}
        </p>
      </div>
    </div>
  );
}

export default SentimentSummary;
