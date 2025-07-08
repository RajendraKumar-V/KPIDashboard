import { Asset, Stats } from "@/types";

export const mockStats: Stats = {
  totalAssets: 1247,
  activeUsers: 342,
  downloads: 5847,
  favorites: 129,
  totalAssetsChange: "+12%",
  activeUsersChange: "+8%",
  downloadsChange: "-3%",
  favoritesChange: "+24%",
};

export const mockAssets: Asset[] = [
  {
    id: 1,
    title: "Q4 Revenue Analysis",
    description:
      "Comprehensive revenue tracking and analysis dashboard for Q4 performance metrics",
    type: "KPI",
    creator: "Sarah Chen",
    creatorAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b73eb17d?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face",
    createdAt: "December 15, 2023",
    downloads: 847,
    favorites: 156,
    tags: ["revenue", "analytics", "dashboard", "charts", "Q4"],
    category: "KPI Dashboard",
    affiliate: "Sales Team",
    businessQuestions: [
      "What was our total revenue for Q4?",
      "How did we perform compared to Q3?",
      "Which products drove the most revenue?",
    ],
    metricIds: ["REV_Q4_2023", "REV_GROWTH_Q4", "PROD_REV_Q4"],
    calculation: "SUM(revenue) WHERE quarter = 'Q4' AND year = 2023",
    visualsAvailable: ["Bar Chart", "Line Chart", "Pie Chart", "Table"],
    affiliateApplicability: ["Sales Team", "Finance Team", "Executive Team"],
    previewData: {
      chartData: [60, 80, 45, 90, 70, 85, 55],
      color: "blue",
    },
  },
  {
    id: 2,
    title: "User Engagement Layout",
    description:
      "Modern layout template for user engagement metrics and KPI visualization",
    type: "Layout",
    creator: "Mike Torres",
    creatorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face",
    createdAt: "December 10, 2023",
    downloads: 432,
    favorites: 89,
    tags: ["engagement", "layout", "template", "metrics"],
    category: "Layout Templates",
    affiliate: "UX Team",
    pages: 3,
    kpisUsed: [
      "Daily Active Users",
      "Session Duration",
      "Bounce Rate",
      "User Retention",
    ],
    previewData: {
      metrics: [
        { label: "Active Users", value: "2,847", color: "green" },
        { label: "Engagement", value: "78%", color: "blue" },
        { label: "Retention", value: "65%", color: "purple" },
        { label: "Growth", value: "+12%", color: "red" },
      ],
    },
  },
  {
    id: 3,
    title: "Progress Visualization",
    description:
      "Interactive circular progress chart with customizable metrics and animations",
    type: "Data Viz",
    creator: "Lisa Wang",
    creatorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face",
    createdAt: "December 12, 2023",
    downloads: 1203,
    favorites: 234,
    tags: ["progress", "circular", "chart", "visualization"],
    category: "Data Visualization",
    affiliate: "Analytics Team",
    applicableKpis: [
      "Completion Rate",
      "Progress Tracking",
      "Goal Achievement",
      "Performance Metrics",
    ],
    previewData: {
      percentage: 73,
      color: "purple",
    },
  },
  {
    id: 4,
    title: "Sales Performance KPI",
    description: "Real-time sales tracking dashboard",
    type: "KPI",
    creator: "John Doe",
    creatorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face",
    createdAt: "December 8, 2023",
    downloads: 623,
    favorites: 142,
    tags: ["sales", "performance", "tracking", "real-time"],
    category: "KPI Dashboard",
    affiliate: "Sales Team",
    previewData: {
      revenue: "$847K",
      growth: "+15%",
      progress: 75,
      color: "indigo",
    },
  },
  {
    id: 5,
    title: "Customer Journey",
    description: "End-to-end customer experience flow",
    type: "Storyboard",
    creator: "Sarah Chen",
    creatorAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b73eb17d?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face",
    createdAt: "December 5, 2023",
    downloads: 387,
    favorites: 96,
    tags: ["customer", "journey", "experience", "flow"],
    category: "Storyboards",
    affiliate: "Product Team",
    coupledKpis: [
      "Customer Acquisition Cost",
      "Customer Lifetime Value",
      "Conversion Rate",
    ],
    applicableAffiliates: [
      "Product Team",
      "Marketing Team",
      "Customer Success Team",
    ],
    previewData: {
      steps: 3,
      color: "green",
    },
  },
  {
    id: 6,
    title: "Trend Analysis Chart",
    description: "Interactive line chart for trends",
    type: "Data Viz",
    creator: "Mike Torres",
    creatorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face",
    createdAt: "December 3, 2023",
    downloads: 756,
    favorites: 178,
    tags: ["trend", "analysis", "line", "chart"],
    category: "Data Visualization",
    affiliate: "Analytics Team",
    previewData: {
      lineData: [40, 25, 35, 15, 30, 20, 10, 25, 15, 30],
      color: "purple",
    },
  },
  {
    id: 7,
    title: "Modern Dashboard",
    description: "Clean admin dashboard layout",
    type: "Layout",
    creator: "Lisa Wang",
    creatorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face",
    createdAt: "December 1, 2023",
    downloads: 445,
    favorites: 103,
    tags: ["modern", "dashboard", "admin", "clean"],
    category: "Layout Templates",
    affiliate: "Design Team",
    previewData: {
      color: "orange",
    },
  },
  {
    id: 8,
    title: "Analytics Overview",
    description: "Key performance metrics dashboard",
    type: "KPI",
    creator: "David Kim",
    creatorAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face",
    createdAt: "November 28, 2023",
    downloads: 592,
    favorites: 134,
    tags: ["analytics", "overview", "metrics", "performance"],
    category: "KPI Dashboard",
    affiliate: "Analytics Team",
    previewData: {
      views: "42K",
      rate: "87%",
      color: "teal",
    },
  },
];

export const featuredAssets = mockAssets.slice(0, 3);
