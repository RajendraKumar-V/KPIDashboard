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
import {
  Presentation,
  Users,
  Filter,
  Heart,
  Share2,
  Download,
} from "lucide-react";

interface StoryboardModalProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (assetId: number) => void;
  onRequestAccess: (asset: Asset) => void;
}

export default function StoryboardModal({
  asset,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onRequestAccess,
}: StoryboardModalProps) {
  const { toast } = useToast();

  if (!asset || asset.type !== "Storyboard") return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.href}?asset=${asset.id}`);
    toast({
      title: "Link copied!",
      description: "Storyboard link has been copied to clipboard.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download started!",
      description: "Your storyboard download has begun.",
    });
  };

  const mockSlides = [
    {
      title: "Executive Summary",
      content: "Overview of key insights and recommendations",
    },
    {
      title: "Data Overview",
      content: "Current state analysis and baseline metrics",
    },
    {
      title: "Trend Analysis",
      content: "Historical patterns and emerging trends",
    },
    {
      title: "Actionable Insights",
      content: "Strategic recommendations and next steps",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Presentation className="h-6 w-6 text-orange-600" />
            {asset.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Preview */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 mb-6">
              {/* Storyboard Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-700">
                    Storyboard Preview
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-orange-600 border-orange-200"
                  >
                    {mockSlides.length} Slides
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {mockSlides.map((slide, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-500">
                          Slide {index + 1}
                        </span>
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      </div>
                      <h4 className="font-semibold text-slate-800 text-sm mb-2">
                        {slide.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {slide.content}
                      </p>
                      <div className="mt-3">
                        <div className="w-full h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded flex items-center justify-center">
                          <span className="text-xs text-slate-500">
                            Chart Preview
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="kpis">Coupled KPIs</TabsTrigger>
                <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
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

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Storyboard Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                        <Presentation className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium">
                          PowerPoint Ready
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                        <Filter className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">
                          Interactive Filters
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <Users className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">
                          Multi-Affiliate
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                        <div className="w-4 h-4 bg-purple-600 rounded"></div>
                        <span className="text-sm font-medium">Auto-Update</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kpis" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Coupled KPIs & Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {asset.coupledKpis?.map((kpi, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="font-medium text-slate-800">
                              {kpi}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-orange-600">
                            Linked
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="affiliates" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Applicable Affiliates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {asset.applicableAffiliates?.map((affiliate, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                              <Users className="h-4 w-4 text-orange-600" />
                            </div>
                            <span className="font-medium text-slate-800">
                              {affiliate}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-green-600">
                            Active
                          </Badge>
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
                  <Badge className="bg-orange-100 text-orange-800">
                    Storyboard
                  </Badge>
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
                  <span className="text-slate-600">Slides:</span>
                  <span className="text-slate-800 text-sm">
                    {mockSlides.length}
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

            {/* Request Access Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-amber-700">
                  Request Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-3">
                  This storyboard requires approval for access. Please explain
                  your use case when requesting.
                </p>
                <div className="text-xs text-slate-500">
                  <p>• Typically approved within 24 hours</p>
                  <p>• Include your project name and reason</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button onClick={handleDownload} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Storyboard
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
