import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#16a34a", "#eab308", "#ef4444"]; // green, yellow, red

function SentimentChart({ data }) {
  const pos = Math.max(0, data.sentimentScore);
  const neg = Math.max(0, -data.sentimentScore);
  const neutral = 1 - Math.abs(data.sentimentScore);

  const dataset = [
    { name: "Positive", value: pos * 100 },
    { name: "Neutral", value: neutral * 100 },
    { name: "Negative", value: neg * 100 },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-6 border-b border-slate-200 pb-2">
        Sentiment Overview
      </h2>

      {/* Pie Chart Section */}
      <div className="w-full flex justify-center">
        <div style={{ width: 200, height: 200 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={dataset}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {dataset.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend Section */}
      <div className="flex justify-center gap-4 mt-4 text-sm text-gray-700">
        {dataset.map((entry, i) => (
          <div key={i} className="flex items-center gap-1">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[i] }}
            ></span>
            {entry.name}: {entry.value.toFixed(0)}%
          </div>
        ))}
      </div>
    </div>
  );
}

export default SentimentChart;
