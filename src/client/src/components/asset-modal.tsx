import { X, Download, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Asset } from "@/types";
import BarChart from "./charts/bar-chart";
import LineChart from "./charts/line-chart";
import ProgressChart from "./charts/progress-chart";
import { useToast } from "@/hooks/use-toast";

interface AssetModalProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (assetId: number) => void;
  onRequestAccess: (asset: Asset) => void;
}

export default function AssetModal({
  asset,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onRequestAccess,
}: AssetModalProps) {
  const { toast } = useToast();

  if (!asset) return null;

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
              className="px-8 h-40"
            />
          );
        }
        break;
      case "Data Viz":
        if (previewData.lineData) {
          return (
            <div className="px-8">
              <LineChart
                data={previewData.lineData}
                color={previewData.color}
              />
            </div>
          );
        }
        if (previewData.percentage) {
          return (
            <div className="px-8">
              <ProgressChart
                percentage={previewData.percentage}
                color={previewData.color}
              />
            </div>
          );
        }
        break;
      default:
        return (
          <div className="px-8">
            <BarChart
              data={[60, 80, 45, 90, 70, 85, 55]}
              color="blue"
              className="h-40"
            />
          </div>
        );
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Asset link has been copied to clipboard.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download started!",
      description: "Your asset download has begun.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            {asset.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div
              className={`bg-gradient-to-br ${getGradientBackground(
                asset.type
              )} rounded-xl p-8 mb-6`}
            >
              <div className="chart-container">{renderPreview()}</div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  onClick={handleDownload}
                  className="flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Asset</span>
                </Button>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleFavorite(asset.id)}
                    className={
                      isFavorite
                        ? "text-red-500 hover:text-red-600"
                        : "text-slate-600 hover:text-red-500"
                    }
                  >
                    <Heart
                      className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyLink}
                    className="text-slate-600 hover:text-blue-500"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-3">
                Asset Details
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Type:</span>
                  <Badge
                    variant="secondary"
                    className={getTypeColor(asset.type)}
                  >
                    {asset.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Creator:</span>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={asset.creatorAvatar} />
                      <AvatarFallback>{asset.creator.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-slate-800 font-medium">
                      {asset.creator}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Created:</span>
                  <span className="text-slate-800">{asset.createdAt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Downloads:</span>
                  <span className="text-slate-800">
                    {asset.downloads.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Favorites:</span>
                  <span className="text-slate-800">
                    {asset.favorites.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-3">
                Description
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {asset.description}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-3">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {asset.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-slate-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Button
                className="w-full bg-amber-600 hover:bg-amber-700"
                onClick={() => onRequestAccess(asset)}
              >
                Request Access
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
