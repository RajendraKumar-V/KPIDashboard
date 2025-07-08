interface LineChartProps {
  data: number[];
  color: string;
  className?: string;
}

export default function LineChart({
  data,
  color,
  className = "",
}: LineChartProps) {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "#3B82F6",
      green: "#10B981",
      purple: "#8B5CF6",
      red: "#EF4444",
      indigo: "#6366F1",
      orange: "#F97316",
      teal: "#14B8A6",
      amber: "#F59E0B",
    };
    return colorMap[color] || "#3B82F6";
  };

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 180 + 10;
      const y = 50 - ((value - minValue) / range) * 40;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className={`relative h-20 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 200 60">
        <polyline
          fill="none"
          stroke={getColorClass(color)}
          strokeWidth="2"
          points={points}
          className="transition-all duration-300"
        />
        <circle
          cx={190}
          cy={50 - ((data[data.length - 1] - minValue) / range) * 40}
          r="3"
          fill={getColorClass(color)}
        />
      </svg>
    </div>
  );
}
