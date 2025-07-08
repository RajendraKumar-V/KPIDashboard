import { Heart, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Asset } from "@/types";
import BarChart from "./charts/bar-chart";
import LineChart from "./charts/line-chart";
import ProgressChart from "./charts/progress-chart";

interface AssetCardProps {
  asset: Asset;
  isFavorite: boolean;
  onToggleFavorite: (assetId: number) => void;
  onViewAsset: (asset: Asset) => void;
  size?: "small" | "large";
}

export default function AssetCard({
  asset,
  isFavorite,
  onToggleFavorite,
  onViewAsset,
  size = "small",
}: AssetCardProps) {
  const getTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      KPI: "bg-blue-100 text-blue-800",
      Layout: "bg-green-100 text-green-800",
      "Data Viz": "bg-purple-100 text-purple-800",
      Storyboard: "bg-orange-100 text-orange-800",
    };
    return colorMap[type] || "bg-slate-100 text-slate-800";
  };

  const getGradientBackground = (type: string) => {
    const gradientMap: { [key: string]: string } = {
      KPI: "from-blue-50 to-indigo-100",
      Layout: "from-green-50 to-emerald-100",
      "Data Viz": "from-purple-50 to-pink-100",
      Storyboard: "from-orange-50 to-red-100",
    };
    return gradientMap[type] || "from-slate-50 to-gray-100";
  };

  const renderPreview = () => {
    const { previewData, type } = asset;

    if (!previewData) return null;

    switch (type) {
      case "KPI":
        if (previewData.chartData) {
          return (
            <BarChart
              data={previewData.chartData}
              color={previewData.color}
              className="px-6"
            />
          );
        }
        if (previewData.revenue) {
          return (
            <div className="w-full px-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-600">
                  Sales Performance
                </span>
                <span className="text-xs font-semibold text-indigo-600">
                  {previewData.growth}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Revenue</span>
                  <span className="text-sm font-semibold">
                    {previewData.revenue}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${previewData.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        }
        if (previewData.views) {
          return (
            <div className="w-full px-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-teal-600">
                    {previewData.views}
                  </div>
                  <div className="text-xs text-slate-600">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-cyan-600">
                    {previewData.rate}
                  </div>
                  <div className="text-xs text-slate-600">Rate</div>
                </div>
              </div>
            </div>
          );
        }
        break;
      case "Layout":
        if (previewData.metrics) {
          return (
            <div className="w-full px-6">
              <div className="grid grid-cols-2 gap-4">
                {previewData.metrics.map((metric: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 shadow-sm"
                  >
                    <div className="text-xs text-slate-600 mb-1">
                      {metric.label}
                    </div>
                    <div
                      className={`text-lg font-bold text-${metric.color}-600`}
                    >
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return (
          <div className="w-full px-4">
            <div className="space-y-2">
              <div className="flex space-x-2">
                <div className="flex-1 h-4 bg-orange-200 rounded"></div>
                <div className="w-8 h-4 bg-orange-300 rounded"></div>
              </div>
              <div className="flex space-x-2">
                <div className="w-12 h-8 bg-orange-300 rounded"></div>
                <div className="flex-1 h-8 bg-orange-200 rounded"></div>
              </div>
              <div className="h-6 bg-orange-100 rounded"></div>
            </div>
          </div>
        );
      case "Data Viz":
        if (previewData.lineData) {
          return (
            <div className="w-full px-4">
              <LineChart
                data={previewData.lineData}
                color={previewData.color}
              />
            </div>
          );
        }
        if (previewData.percentage) {
          return (
            <div className="w-full px-6">
              <ProgressChart
                percentage={previewData.percentage}
                color={previewData.color}
              />
            </div>
          );
        }
        break;
      case "Storyboard":
        if (previewData.steps) {
          return (
            <div className="w-full px-4">
              <div className="grid grid-cols-3 gap-2">
                {[...Array(previewData.steps)].map((_, index) => (
                  <div key={index} className="bg-white rounded p-2 shadow-sm">
                    <div className="w-full h-3 bg-green-200 rounded mb-1"></div>
                    <div
                      className={`w-${
                        Math.floor(Math.random() * 3) + 1
                      }/4 h-2 bg-slate-200 rounded`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return (
          <div className="w-full px-4">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 bg-rose-300 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="flex-1 h-0.5 bg-rose-200 mx-2"></div>
              <div className="w-8 h-8 bg-rose-400 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="flex-1 h-0.5 bg-rose-200 mx-2"></div>
              <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        );
    }
    return null;
  };

  const previewHeight = size === "large" ? "h-48" : "h-40";

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <div
        className={`${previewHeight} bg-gradient-to-br ${getGradientBackground(
          asset.type
        )} flex items-center justify-center`}
      >
        {renderPreview()}
      </div>
      <CardContent className={size === "large" ? "p-6" : "p-4"}>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className={getTypeColor(asset.type)}>
            {asset.type}
          </Badge>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(asset.id);
            }}
            className={`transition-colors ${
              isFavorite
                ? "text-red-500 hover:text-red-600"
                : "text-slate-400 hover:text-red-500"
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>
        <h4 className="font-semibold text-slate-800 mb-2">{asset.title}</h4>
        <p
          className={`text-sm text-slate-600 mb-${
            size === "large" ? "4" : "3"
          }`}
        >
          {asset.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-5 w-5">
              <AvatarImage src={asset.creatorAvatar} />
              <AvatarFallback>{asset.creator.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-slate-600">{asset.creator}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewAsset(asset);
            }}
            className="text-blue-600 hover:text-blue-700 text-xs font-medium"
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
