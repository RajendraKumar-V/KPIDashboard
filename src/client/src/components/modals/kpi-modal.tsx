import { useState } from "react";
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
import { Calculator, BarChart3, Users, Heart, Share2, Download } from "lucide-react";
import BarChart from "../charts/bar-chart";

interface KpiModalProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (assetId: number) => void;
  onRequestAccess: (asset: Asset) => void;
}

export default function KpiModal({
  asset,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onRequestAccess,
}: KpiModalProps) {
  const { toast } = useToast();

  if (!asset || asset.type !== "KPI") return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.href}?asset=${asset.id}`);
    toast({
      title: "Link copied!",
      description: "KPI link has been copied to clipboard.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download started!",
      description: "Your KPI asset download has begun.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            {asset.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Preview */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 mb-6">
              {asset.previewData?.chartData && (
                <BarChart
                  data={asset.previewData.chartData}
                  color={asset.previewData.color || "blue"}
                  className="h-64"
                />
              )}
            </div>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="calculation">Calculation</TabsTrigger>
                <TabsTrigger value="visuals">Visuals</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
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
              </TabsContent>
              
              <TabsContent value="calculation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Calculation Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Formula</h4>
                      <code className="bg-slate-100 p-3 rounded-lg block text-sm font-mono">
                        {asset.calculation || "SUM(metric_value) WHERE conditions"}
                      </code>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Metric IDs</h4>
                      <div className="flex flex-wrap gap-2">
                        {asset.metricIds?.map((id, index) => (
                          <Badge key={index} variant="outline" className="font-mono text-xs">
                            {id}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="visuals" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Available Visualizations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {asset.visualsAvailable?.map((visual, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                          <BarChart3 className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">{visual}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="business" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Business Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {asset.businessQuestions?.map((question, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold text-sm mt-1">Q{index + 1}.</span>
                          <span className="text-slate-700">{question}</span>
                        </li>
                      ))}
                    </ul>
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
                  <Badge className="bg-blue-100 text-blue-800">KPI</Badge>
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
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Affiliate Applicability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {asset.affiliateApplicability?.map((affiliate, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{affiliate}</span>
                    </div>
                  ))}
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
            
            {/* Actions */}
            <div className="space-y-3">
              <Button onClick={handleDownload} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download KPI
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