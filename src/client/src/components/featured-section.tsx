import { Asset } from "@/types";
import AssetCard from "./asset-card";

interface FeaturedSectionProps {
  assets: Asset[];
  favorites: number[];
  onToggleFavorite: (assetId: number) => void;
  onViewAsset: (asset: Asset) => void;
}

export default function FeaturedSection({
  assets,
  favorites,
  onToggleFavorite,
  onViewAsset,
}: FeaturedSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-slate-800">
          Featured Assets
        </h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            isFavorite={favorites.includes(asset.id)}
            onToggleFavorite={onToggleFavorite}
            onViewAsset={onViewAsset}
            size="large"
          />
        ))}
      </div>
    </div>
  );
}
