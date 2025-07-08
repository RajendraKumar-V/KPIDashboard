import { Search, Bell, Box } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Box className="text-blue-600 text-2xl mr-3" />
              <h1 className="text-xl font-bold text-slate-800">AssetHub</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a
                href="#"
                className="text-blue-600 font-medium border-b-2 border-blue-600 pb-4"
              >
                Dashboard
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-800 pb-4">
                My Assets
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-800 pb-4">
                Teams
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-800 pb-4">
                Settings
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-64 pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            </div>
            <button className="p-2 text-slate-600 hover:text-slate-800">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=40&h=40&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-slate-700">
                John Doe
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
