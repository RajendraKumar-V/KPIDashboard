interface ProgressChartProps {
  percentage: number;
  color: string;
  className?: string;
}

export default function ProgressChart({
  percentage,
  color,
  className = "",
}: ProgressChartProps) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

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
    return colorMap[color] || "#8B5CF6";
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="8"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke={getColorClass(color)}
            strokeWidth="8"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-sm font-semibold`}
            style={{ color: getColorClass(color) }}
          >
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
