import { Search, TrendingUp, Activity, Globe, Zap, BarChart3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PriceTicker } from "./PriceTicker";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  topCoins?: Array<{id: string; symbol: string; current_price: number; price_change_percentage_24h: number}>;
}

export const Header = ({ searchTerm, onSearchChange, topCoins }: HeaderProps) => {
  return (
    <header className="glass-card card-mesh rounded-3xl p-8 mb-8 animate-fade-in relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary animate-shimmer" />
      
      <div className="relative z-10">
        {/* Logo and Title Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0 mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-accent glow-primary animate-rotate-glow">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-pulse-glow" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent animate-gradient-flow">
                CryptoTracker
              </h1>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <p className="text-muted-foreground font-medium">
                  Real-time cryptocurrency prices & analytics
                </p>
                <BarChart3 className="w-4 h-4 text-primary animate-bounce" />
              </div>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="relative w-full md:w-96">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Search cryptocurrencies..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 pr-4 glass-card border-2 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 bg-muted/20 text-foreground placeholder:text-muted-foreground h-14 rounded-2xl text-lg font-medium backdrop-blur-md transition-all duration-300 hover:bg-muted/30"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Real-time Price Ticker */}
        {topCoins && topCoins.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-6 h-6 text-primary animate-pulse" />
                <span className="text-lg font-bold text-foreground">Live Market</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">Real-time data</span>
              </div>
              <Zap className="w-4 h-4 text-accent animate-bounce" />
            </div>
            
            <div className="relative">
              <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-custom">
                {topCoins.slice(0, 8).map((coin, index) => (
                  <div 
                    key={coin.id} 
                    className="flex items-center space-x-3 min-w-fit glass-card p-4 rounded-xl hover:scale-105 transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                      {coin.symbol}
                    </span>
                    <PriceTicker 
                      currentPrice={coin.current_price}
                      previousPrice={coin.current_price * (1 - coin.price_change_percentage_24h / 100)}
                      symbol={coin.symbol}
                    />
                  </div>
                ))}
              </div>
              
              {/* Fade overlay for scroll indication */}
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            </div>
          </div>
        )}

        {/* Enhanced Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Market Cap", value: "$2.34T", icon: Globe, color: "primary" },
            { label: "24h Volume", value: "$89.2B", icon: BarChart3, color: "accent" },
            { label: "BTC Dominance", value: "56.7%", icon: TrendingUp, color: "success" }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center p-6 rounded-2xl glass-card hover:scale-105 transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center justify-center mb-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-${stat.color} to-${stat.color}-dark animate-float`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-muted-foreground text-sm font-medium mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors number-animate">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};