export interface Asset {
  id: number;
  title: string;
  description: string;
  type: "KPI" | "Layout" | "Data Viz" | "Storyboard";
  creator: string;
  creatorAvatar: string;
  createdAt: string;
  downloads: number;
  favorites: number;
  tags: string[];
  category: string;
  affiliate: string;
  businessQuestions?: string[];
  metricIds?: string[];
  calculation?: string;
  visualsAvailable?: string[];
  affiliateApplicability?: string[];
  pages?: number;
  kpisUsed?: string[];
  applicableKpis?: string[];
  coupledKpis?: string[];
  applicableAffiliates?: string[];
  previewData?: {
    chartData?: number[];
    lineData?: number[];
    percentage?: number;
    color?: string;
    revenue?: string;
    growth?: string;
    progress?: number;
    views?: string;
    rate?: string;
    metrics?: Array<{
      label: string;
      value: string;
      color: string;
    }>;
    steps?: number;
  };
}

export interface Stats {
  totalAssets: number;
  activeUsers: number;
  downloads: number;
  favorites: number;
  totalAssetsChange: string;
  activeUsersChange: string;
  downloadsChange: string;
  favoritesChange: string;
}

export interface AccessRequest {
  assetId: number;
  reason: string;
  project: string;
  userId: string;
}

export interface KpiModalData {
  businessQuestions: string[];
  metricIds: string[];
  calculation: string;
  visualsAvailable: string[];
  affiliateApplicability: string[];
}

export interface LayoutModalData {
  pages: number;
  kpisUsed: string[];
  previewUrl?: string;
}

export interface DataVizModalData {
  applicableKpis: string[];
  chartType: string;
  interactive: boolean;
}

export interface StoryboardModalData {
  coupledKpis: string[];
  applicableAffiliates: string[];
  slides: number;
}
