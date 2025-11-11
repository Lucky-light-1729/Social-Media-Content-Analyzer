// Enhanced Text Analysis Utility
// Lightweight heuristic-based analyzer (no external dependencies)

export function analyzeText(text) {
  const lower = text.toLowerCase();

  // --- Sentiment Lexicons (expanded & stem-friendly)
  const positiveWords = [
    "love", "great", "happy", "awesome", "good", "amazing", "excited",
    "fantastic", "joy", "cool", "nice", "wonderful", "best", "fun"
  ];
  const negativeWords = [
    "hate", "sad", "bad", "terrible", "awful", "angry", "worse",
    "disappointed", "upset", "boring", "tired", "annoyed"
  ];

  // --- Emoji Tone Detection
  const positiveEmojis = ["😊", "😁", "😃", "❤️", "👍", "🔥", "🥳", "😄"];
  const negativeEmojis = ["😢", "😠", "💔", "👎", "😭", "😞", "😤"];

  let score = 0;

  // Count word matches (stem-aware)
  const countMatches = (arr, factor = 1) => {
    arr.forEach((w) => {
      const matches = lower.match(new RegExp(`\\b${w}\\w*\\b`, "g"));
      if (matches) score += matches.length * factor;
    });
  };
  countMatches(positiveWords, 1);
  countMatches(negativeWords, -1);

  // Emoji influence
  positiveEmojis.forEach((e) => { if (text.includes(e)) score += 1; });
  negativeEmojis.forEach((e) => { if (text.includes(e)) score -= 1; });

  // --- Sentiment Score Normalization
  const sentimentScore = Math.max(-1, Math.min(1, score / Math.sqrt(text.split(/\s+/).length)));
  const sentiment = sentimentScore > 0.2 ? "Positive" : sentimentScore < -0.2 ? "Negative" : "Neutral";

  // --- Hashtag Extraction (normalized)
  const hashtags = Array.from(new Set(
    Array.from(text.matchAll(/#([\w-]+)/g)).map((m) => "#" + m[1].toLowerCase())
  ));

  // --- Keyword Extraction (filtered frequency)
  const words = text
    .replace(/#([\w-]+)/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
    
  const stop = new Set(["the", "a", "an", "and", "or", "is", "in", "on", "of", "to", "for", "with", "that", "this", "it", "by", "at", "from"]);
  const freq = {};
  words.forEach((w) => {
    if (!stop.has(w) && w.length > 2) freq[w] = (freq[w] || 0) + 1;
  });

  const keywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map((e) => e[0]);

  // --- Readability (avg word length heuristic)
  const avgWordLen = words.reduce((s, w) => s + w.length, 0) / Math.max(1, words.length);
  const readability = avgWordLen > 6 ? "Advanced" : avgWordLen > 4 ? "Intermediate" : "Simple";

  // --- Engagement Estimate (refined)
  const engagementEstimate = Math.min(
    100,
    Math.round(
      (sentimentScore > 0 ? sentimentScore * 50 : 0) +
      Math.min(hashtags.length, 5) * 10 +
      (text.includes("!") ? 5 : 0) +
      Math.min(20, words.length / 3)
    )
  );

  return {
    sentiment,
    sentimentScore: Number(sentimentScore.toFixed(2)),
    hashtags,
    keywords,
    readability,
    engagementEstimate
  };
}
