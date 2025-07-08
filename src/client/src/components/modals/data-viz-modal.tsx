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
import { PieChart, MousePointer, Heart, Share2, Download } from "lucide-react";
import ProgressChart from "../charts/progress-chart";
import LineChart from "../charts/line-chart";

interface DataVizModalProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (assetId: number) => void;
  onRequestAccess: (asset: Asset) => void;
}

export default function DataVizModal({
  asset,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onRequestAccess,
}: DataVizModalProps) {
  const { toast } = useToast();

  if (!asset || asset.type !== "Data Viz") return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.href}?asset=${asset.id}`);
    toast({
      title: "Link copied!",
      description: "Data visualization link has been copied to clipboard.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download started!",
      description: "Your data visualization download has begun.",
    });
  };

  const handleInteract = () => {
    toast({
      title: "Chart Interactive!",
      description: "Click, hover, and explore the data visualization.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <PieChart className="h-6 w-6 text-purple-600" />
            {asset.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Preview */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-700">Interactive Visualization</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleInteract}
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  <MousePointer className="h-4 w-4 mr-1" />
                  Interact
                </Button>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm min-h-[300px] flex items-center justify-center">
                {asset.previewData?.percentage ? (
                  <ProgressChart
                    percentage={asset.previewData.percentage}
                    color={asset.previewData.color || "purple"}
                    className="scale-150"
                  />
                ) : asset.previewData?.lineData ? (
                  <div className="w-full">
                    <LineChart
                      data={asset.previewData.lineData}
                      color={asset.previewData.color || "purple"}
                      className="h-48"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <PieChart className="h-24 w-24 text-purple-400 mx-auto mb-4" />
                    <p className="text-slate-500">Interactive chart preview</p>
                  </div>
                )}
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="kpis">Applicable KPIs</TabsTrigger>
                <TabsTrigger value="context">Asset Context</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">{asset.description}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Chart Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                        <MousePointer className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">Interactive</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                        <PieChart className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Responsive</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <div className="w-4 h-4 bg-green-600 rounded"></div>
                        <span className="text-sm font-medium">Customizable</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                        <div className="w-4 h-4 bg-orange-600 rounded"></div>
                        <span className="text-sm font-medium">Exportable</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="kpis" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Applicable KPI Favorites</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {asset.applicableKpis?.map((kpi, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="font-medium text-slate-800">{kpi}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-purple-600">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="context" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Asset Info Context</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Best Used For</h4>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• Performance tracking and monitoring</li>
                        <li>• Trend analysis and forecasting</li>
                        <li>• Comparative data visualization</li>
                        <li>• Executive reporting and presentations</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Data Requirements</h4>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• Time-series data with consistent intervals</li>
                        <li>• Numeric values for quantitative analysis</li>
                        <li>• Category labels for grouping</li>
                      </ul>
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
                  <Badge className="bg-purple-100 text-purple-800">Data Viz</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Creator:</span>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={asset.creatorAvatar} />
                      <AvatarFallback>{asset.creator.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-slate-800 font-medium text-sm">{asset.creator}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Created:</span>
                  <span className="text-slate-800 text-sm">{asset.createdAt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Downloads:</span>
                  <span className="text-slate-800 text-sm">{asset.downloads.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Favorites:</span>
                  <span className="text-slate-800 text-sm">{asset.favorites.toLocaleString()}</span>
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
                    <Badge key={tag} variant="outline" className="text-slate-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Chart Interaction Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MousePointer className="h-5 w-5" />
                  Interact with Chart
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleInteract}>
                  Zoom & Pan
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleInteract}>
                  Hover Details
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleInteract}>
                  Filter Data
                </Button>
              </CardContent>
            </Card>
            
            {/* Actions */}
            <div className="space-y-3">
              <Button onClick={handleDownload} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Viz
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleFavorite(asset.id)}
                  className={`flex-1 ${isFavorite ? "text-red-500 hover:text-red-600" : "text-slate-600 hover:text-red-500"}`}
                >
                  <Heart className={`h-4 w-4 mr-1 ${isFavorite ? "fill-current" : ""}`} />
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