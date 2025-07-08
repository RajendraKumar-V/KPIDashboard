import { useState, useEffect, useMemo } from "react";
import { Asset } from "@/types";
import { mockAssets } from "@/lib/mock-data";

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Sort by Latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([3, 6]); // Mock user favorites
  const itemsPerPage = 12;

  const filteredAssets = useMemo(() => {
    let filtered = assets;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (asset) =>
          asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (asset) => asset.category === selectedCategory
      );
    }

    // Sort assets
    switch (sortBy) {
      case "Sort by Name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Sort by Creator":
        filtered.sort((a, b) => a.creator.localeCompare(b.creator));
        break;
      case "Sort by Popularity":
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case "Sort by Latest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return filtered;
  }, [assets, searchQuery, selectedCategory, sortBy]);

  const paginatedAssets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAssets.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAssets, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);

  const toggleFavorite = (assetId: number) => {
    setFavorites((prev) => {
      if (prev.includes(assetId)) {
        return prev.filter((id) => id !== assetId);
      } else {
        return [...prev, assetId];
      }
    });
  };

  const isFavorite = (assetId: number) => favorites.includes(assetId);

  return {
    assets: paginatedAssets,
    allAssets: filteredAssets,
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
    totalResults: filteredAssets.length,
    itemsPerPage,
  };
}
