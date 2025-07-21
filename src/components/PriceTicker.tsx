import { useState, useEffect } from 'react';

interface PriceTickerProps {
  currentPrice: number;
  previousPrice: number;
  symbol: string;
}

export const PriceTicker = ({ currentPrice, previousPrice, symbol }: PriceTickerProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [priceDirection, setPriceDirection] = useState<'up' | 'down' | 'neutral'>('neutral');

  useEffect(() => {
    if (currentPrice !== previousPrice) {
      setIsUpdating(true);
      setPriceDirection(currentPrice > previousPrice ? 'up' : currentPrice < previousPrice ? 'down' : 'neutral');
      
      const timer = setTimeout(() => {
        setIsUpdating(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentPrice, previousPrice]);

  const formatPrice = (price: number) => {
    if (price < 1) {
      return `$${price.toFixed(6)}`;
    }
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl font-mono font-bold transition-all duration-500 relative overflow-hidden ${
      isUpdating 
        ? priceDirection === 'up' 
          ? 'status-positive animate-bounce-glow scale-105' 
          : priceDirection === 'down'
          ? 'status-negative animate-bounce-glow scale-105'
          : 'bg-muted/20'
        : 'bg-muted/10 hover:bg-muted/20'
    }`}>
      {/* Background animation */}
      {isUpdating && (
        <div className={`absolute inset-0 ${
          priceDirection === 'up' 
            ? 'bg-gradient-to-r from-success/20 to-transparent animate-shimmer' 
            : 'bg-gradient-to-r from-destructive/20 to-transparent animate-shimmer'
        }`} />
      )}
      
      <span className="relative z-10 text-lg">
        {formatPrice(currentPrice)}
      </span>
      
      {isUpdating && (
        <div className={`relative z-10 w-3 h-3 rounded-full animate-pulse ${
          priceDirection === 'up' ? 'bg-success' : 'bg-destructive'
        }`}>
          <div className={`absolute inset-0 rounded-full animate-ping ${
            priceDirection === 'up' ? 'bg-success' : 'bg-destructive'
          }`} />
        </div>
      )}
    </div>
  );
};