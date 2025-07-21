import { useState, useEffect } from 'react';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
  total_volume: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export const useCryptoData = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch cryptocurrency data');
      }
      
      const data = await response.json();
      setCryptos(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching crypto data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    
    // Set up automatic refresh every 30 seconds
    const interval = setInterval(fetchCryptoData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    cryptos,
    loading,
    error,
    refetch: fetchCryptoData
  };
};