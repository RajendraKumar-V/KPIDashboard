import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Asset } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Layout, FileText, Eye, Heart, Share2, Download } from "lucide-react";

interface LayoutModalProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (assetId: number) => void;
  onRequestAccess: (asset: Asset) => void;
}

export default function LayoutModal({
  asset,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onRequestAccess,
}: LayoutModalProps) {
  const { toast } = useToast();

  if (!asset || asset.type !== "Layout") return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.href}?asset=${asset.id}`);
    toast({
      title: "Link copied!",
      description: "Layout link has been copied to clipboard.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download started!",
      description: "Your layout template download has begun.",
    });
  };

  const mockPages = [
    {
      title: "Overview Dashboard",
      description: "Main metrics and KPI overview",
    },
    {
      title: "Detailed Analytics",
      description: "Deep dive into performance data",
    },
    { title: "Trend Analysis", description: "Historical trends and patterns" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Layout className="h-6 w-6 text-green-600" />
            {asset.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Preview */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 mb-6">
              {/* Layout Preview */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-32 h-4 bg-slate-200 rounded"></div>
                    <div className="flex space-x-2">
                      <div className="w-6 h-6 bg-green-200 rounded"></div>
                      <div className="w-6 h-6 bg-blue-200 rounded"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {asset.previewData?.metrics?.map((metric, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 rounded p-3 text-center"
                      >
                        <div
                          className={`text-lg font-bold text-${metric.color}-600`}
                        >
                          {metric.value}
                        </div>
                        <div className="text-xs text-slate-600">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-32 bg-slate-100 rounded flex items-center justify-center">
                      <span className="text-slate-500 text-sm">Chart Area</span>
                    </div>
                    <div className="h-32 bg-slate-100 rounded flex items-center justify-center">
                      <span className="text-slate-500 text-sm">Data Table</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="pages">Pages</TabsTrigger>
                <TabsTrigger value="kpis">KPIs Used</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">
                      {asset.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pages" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Layout Pages ({asset.pages || mockPages.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockPages.map((page, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <div className="font-medium text-slate-800">
                              {page.title}
                            </div>
                            <div className="text-sm text-slate-600">
                              {page.description}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kpis" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">KPIs Being Used</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {asset.kpisUsed?.map((kpi, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">{kpi}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Asset Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Type:</span>
                  <Badge className="bg-green-100 text-green-800">Layout</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Creator:</span>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={asset.creatorAvatar} />
                      <AvatarFallback>{asset.creator.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-slate-800 font-medium text-sm">
                      {asset.creator}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Pages:</span>
                  <span className="text-slate-800 text-sm">
                    {asset.pages || mockPages.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Downloads:</span>
                  <span className="text-slate-800 text-sm">
                    {asset.downloads.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Favorites:</span>
                  <span className="text-slate-800 text-sm">
                    {asset.favorites.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {asset.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-slate-700"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Preview Layout Button */}
            <Card>
              <CardContent className="p-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    toast({
                      title: "Preview opened!",
                      description: "Layout preview in new tab.",
                    })
                  }
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Layout
                </Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button onClick={handleDownload} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Layout
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleFavorite(asset.id)}
                  className={`flex-1 ${
                    isFavorite
                      ? "text-red-500 hover:text-red-600"
                      : "text-slate-600 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 mr-1 ${
                      isFavorite ? "fill-current" : ""
                    }`}
                  />
                  {isFavorite ? "Favorited" : "Favorite"}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyLink}
                  className="flex-1 text-slate-600 hover:text-blue-500"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Copy Link
                </Button>
              </div>

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
