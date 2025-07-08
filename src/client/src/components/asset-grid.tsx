import { Asset } from "@/types";
import AssetCard from "./asset-card";

interface AssetGridProps {
  assets: Asset[];
  favorites: number[];
  onToggleFavorite: (assetId: number) => void;
  onViewAsset: (asset: Asset) => void;
  totalResults: number;
  itemsPerPage: number;
  currentPage: number;
}

export default function AssetGrid({
  assets,
  favorites,
  onToggleFavorite,
  onViewAsset,
  totalResults,
  itemsPerPage,
  currentPage,
}: AssetGridProps) {
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalResults);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-slate-800">All Assets</h3>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <span>
            Showing {startIndex}-{endIndex} of {totalResults} results
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {assets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            isFavorite={favorites.includes(asset.id)}
            onToggleFavorite={onToggleFavorite}
            onViewAsset={onViewAsset}
            size="small"
          />
        ))}
      </div>
    </div>
  );
}
