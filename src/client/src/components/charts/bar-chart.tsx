interface BarChartProps {
    data: number[];
    color: string;
    className?: string;
  }
  
  export default function BarChart({ data, color, className = "" }: BarChartProps) {
    const maxValue = Math.max(...data);
    
    const getColorClass = (color: string) => {
      const colorMap: { [key: string]: string } = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        purple: "bg-purple-500",
        red: "bg-red-500",
        indigo: "bg-indigo-500",
        orange: "bg-orange-500",
        teal: "bg-teal-500",
        amber: "bg-amber-500",
      };
      return colorMap[color] || "bg-blue-500";
    };
  
    return (
      <div className={`flex items-end justify-between h-32 space-x-2 ${className}`}>
        {data.map((value, index) => (
          <div
            key={index}
            className={`${getColorClass(color)} chart-bar rounded-t transition-all duration-300 hover:opacity-80`}
            style={{
              height: `${(value / maxValue) * 100}%`,
              width: `${100 / data.length - 2}%`,
            }}
          />
        ))}
      </div>
    );
  }
  