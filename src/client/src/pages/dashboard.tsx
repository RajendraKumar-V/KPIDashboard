import { useState } from "react";
import { Asset } from "@/types";
import { mockStats, featuredAssets } from "@/lib/mock-data";
import { useAssets } from "@/hooks/use-assets";
import Header from "@/components/header";
import QuickStats from "@/components/quick-stats";
import FeaturedSection from "@/components/featured-section";
import FilterSection from "@/components/filter-section";
import AssetGrid from "@/components/asset-grid";
import Pagination from "@/components/pagination";
import KpiModal from "@/components/modals/kpi-modal";
import LayoutModal from "@/components/modals/layout-modal";
import DataVizModal from "@/components/modals/data-viz-modal";
import StoryboardModal from "@/components/modals/storyboard-modal";
import AccessRequestModal from "@/components/access-request-modal";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();

  const {
    assets,
    allAssets,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    favorites,
    toggleFavorite,
    isFavorite,
    totalResults,
    itemsPerPage,
  } = useAssets();

  const handleViewAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsAssetModalOpen(true);
  };

  const handleRequestAccess = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsAssetModalOpen(false);
    setIsAccessModalOpen(true);
  };

  const handleToggleFavorite = (assetId: number) => {
    toggleFavorite(assetId);
    const action = isFavorite(assetId) ? "removed from" : "added to";
    toast({
      title: "Favorite updated!",
      description: `Asset ${action} favorites successfully.`,
    });
  };

  const handleGlobalSearch = (query: string) => {
    setGlobalSearchQuery(query);
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        searchQuery={globalSearchQuery}
        onSearchChange={handleGlobalSearch}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Asset Library
              </h2>
              <p className="text-slate-600 mt-1">
                Discover and manage your organization's digital assets
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">
                <span className="mr-2">🔍</span>Filter
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <span className="mr-2">+</span>Add Asset
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <QuickStats stats={mockStats} />

        {/* Featured Section */}
        <FeaturedSection
          assets={featuredAssets}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onViewAsset={handleViewAsset}
        />

        {/* Filter Section */}
        <FilterSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Asset Grid */}
        <AssetGrid
          assets={assets}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onViewAsset={handleViewAsset}
          totalResults={totalResults}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalResults={totalResults}
          itemsPerPage={itemsPerPage}
        />
      </div>

      {/* Specialized Modals */}
      <KpiModal
        asset={selectedAsset}
        isOpen={isAssetModalOpen && selectedAsset?.type === "KPI"}
        onClose={() => setIsAssetModalOpen(false)}
        isFavorite={selectedAsset ? isFavorite(selectedAsset.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onRequestAccess={handleRequestAccess}
      />

      <LayoutModal
        asset={selectedAsset}
        isOpen={isAssetModalOpen && selectedAsset?.type === "Layout"}
        onClose={() => setIsAssetModalOpen(false)}
        isFavorite={selectedAsset ? isFavorite(selectedAsset.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onRequestAccess={handleRequestAccess}
      />

      <DataVizModal
        asset={selectedAsset}
        isOpen={isAssetModalOpen && selectedAsset?.type === "Data Viz"}
        onClose={() => setIsAssetModalOpen(false)}
        isFavorite={selectedAsset ? isFavorite(selectedAsset.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onRequestAccess={handleRequestAccess}
      />

      <StoryboardModal
        asset={selectedAsset}
        isOpen={isAssetModalOpen && selectedAsset?.type === "Storyboard"}
        onClose={() => setIsAssetModalOpen(false)}
        isFavorite={selectedAsset ? isFavorite(selectedAsset.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onRequestAccess={handleRequestAccess}
      />

      <AccessRequestModal
        asset={selectedAsset}
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
      />
    </div>
  );
}
