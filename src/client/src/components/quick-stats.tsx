import { Database, Users, Download, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Stats } from "@/types";

interface QuickStatsProps {
  stats: Stats;
}

export default function QuickStats({ stats }: QuickStatsProps) {
  const statItems = [
    {
      title: "Total Assets",
      value: stats.totalAssets.toLocaleString(),
      change: stats.totalAssetsChange,
      icon: Database,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      isPositive: stats.totalAssetsChange.startsWith("+"),
    },
    {
      title: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      change: stats.activeUsersChange,
      icon: Users,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      isPositive: stats.activeUsersChange.startsWith("+"),
    },
    {
      title: "Downloads",
      value: stats.downloads.toLocaleString(),
      change: stats.downloadsChange,
      icon: Download,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      isPositive: stats.downloadsChange.startsWith("+"),
    },
    {
      title: "Favorites",
      value: stats.favorites.toLocaleString(),
      change: stats.favoritesChange,
      icon: Heart,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      isPositive: stats.favoritesChange.startsWith("+"),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item) => (
        <Card key={item.title} className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">{item.title}</p>
                <p className="text-2xl font-bold text-slate-800">
                  {item.value}
                </p>
              </div>
              <div className={`${item.bgColor} p-3 rounded-lg`}>
                <item.icon className={`${item.iconColor} h-5 w-5`} />
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`text-sm ${
                  item.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.change} from last month
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
