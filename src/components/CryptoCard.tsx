import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, ExternalLink, Zap, Star } from "lucide-react";
import { SparklineChart } from "./SparklineChart";
import { toast } from "sonner";

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
  total_volume: number;
  homepage?: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

interface CryptoCardProps {
  crypto: CryptoData;
  index: number;
}

export const CryptoCard = ({ crypto, index }: CryptoCardProps) => {
  const [displayPrice, setDisplayPrice] = useState(crypto.current_price);
  const [isHovered, setIsHovered] = useState(false);
  const isPositive = crypto.price_change_percentage_24h > 0;
  const isHighPerformer = Math.abs(crypto.price_change_percentage_24h) > 10;

  useEffect(() => {
    // Animate price changes with number rolling effect
    setDisplayPrice(crypto.current_price);
  }, [crypto.current_price]);

  const handleCardClick = () => {
    const url = `https://www.coingecko.com/en/coins/${crypto.id}`;
    toast.success(`Opening ${crypto.name} details...`, {
      duration: 2000,
      icon: "🚀",
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const formatPrice = (price: number) => {
    if (price < 1) {
      return `$${price.toFixed(6)}`;
    }
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    }
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    }
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  };

  return (
    <div 
      className={`glass-card card-mesh hover-lift rounded-2xl p-6 group cursor-pointer relative transition-all duration-500 animate-fade-in ${
        isHighPerformer ? 'float' : ''
      }`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        transformStyle: 'preserve-3d'
      }}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Background Mesh */}
      <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-primary/10 via-accent/10 to-transparent rounded-2xl" />
      
      {/* High Performer Badge */}
      {isHighPerformer && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1 animate-bounce-glow">
            <Star className="w-3 h-3" />
            <span>HOT</span>
          </div>
        </div>
      )}

      {/* Header with Coin Info */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src={crypto.image} 
              alt={crypto.name}
              className={`w-12 h-12 rounded-full ring-2 ring-offset-2 ring-offset-transparent transition-all duration-300 ${
                isPositive ? 'ring-success/50' : 'ring-destructive/50'
              } ${isHovered ? 'scale-110 rotate-12' : ''}`}
            />
            {isHovered && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 rounded-full animate-pulse-glow" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
              {crypto.name}
            </h3>
            <p className="text-sm text-muted-foreground uppercase font-medium tracking-wider">
              {crypto.symbol}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <ExternalLink className={`w-4 h-4 text-muted-foreground transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-110 text-primary' : 'opacity-0 scale-90'
          }`} />
          <div className={`flex items-center space-x-1 px-3 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${
            isPositive 
              ? 'status-positive animate-glow-pulse' 
              : 'status-negative animate-glow-pulse'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </span>
            {isHighPerformer && <Zap className="w-3 h-3 animate-bounce" />}
          </div>
        </div>
      </div>

      {/* Premium Chart Section */}
      {crypto.sparkline_in_7d?.price && (
        <div className="mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-lg" />
          <SparklineChart 
            data={crypto.sparkline_in_7d.price} 
            isPositive={isPositive}
          />
          <div className="absolute top-0 right-0 text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded backdrop-blur">
            7D
          </div>
        </div>
      )}

      {/* Price Information */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-medium">Current Price</span>
          <div className="text-right">
            <span className="text-2xl font-bold number-animate">
              {formatPrice(displayPrice)}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Market Cap</span>
              <span className="font-semibold text-foreground">
                {formatMarketCap(crypto.market_cap)}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Volume 24h</span>
              <span className="font-semibold text-foreground">
                {formatMarketCap(crypto.total_volume)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Hover Overlay */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
        isHovered 
          ? `${isPositive ? 'glow-success' : 'glow-destructive'} opacity-100` 
          : 'opacity-0'
      }`} />

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className={`absolute inset-0 rounded-2xl ${
          isPositive 
            ? 'bg-gradient-to-r from-success via-primary to-accent' 
            : 'bg-gradient-to-r from-destructive via-pink-500 to-purple-500'
        } animate-rotate-glow`} 
        style={{ 
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          padding: '2px'
        }} />
      </div>
    </div>
  );
};