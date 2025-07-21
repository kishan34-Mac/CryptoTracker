import { useState, useMemo } from "react";
import { Header } from "./Header";
import { CryptoCard } from "./CryptoCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { useCryptoData } from "@/hooks/useCryptoData";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CryptoDashboard = () => {
  const { cryptos, loading, error, refetch } = useCryptoData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCryptos = useMemo(() => {
    if (!searchTerm) return cryptos;
    
    return cryptos.filter(crypto =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cryptos, searchTerm]);

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-2xl p-8 text-center">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Failed to Load Data
            </h2>
            <p className="text-muted-foreground mb-6">
              {error}
            </p>
            <Button 
              onClick={refetch}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <Header 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          topCoins={cryptos.slice(0, 8)}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {searchTerm ? `Search Results (${filteredCryptos.length})` : 'Top Cryptocurrencies'}
                </h2>
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? `Showing results for "${searchTerm}"` 
                    : 'Updated every 30 seconds'
                  }
                </p>
              </div>
              
              <Button
                onClick={refetch}
                variant="outline"
                size="sm"
                className="glass-card border-glass-border hover:bg-muted/50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            {/* Crypto Grid */}
            {filteredCryptos.length === 0 ? (
              <div className="glass-card rounded-2xl p-8 text-center">
                <p className="text-xl text-muted-foreground">
                  No cryptocurrencies found matching "{searchTerm}"
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up">
                {filteredCryptos.map((crypto, index) => (
                  <CryptoCard 
                    key={crypto.id} 
                    crypto={crypto} 
                    index={index}
                  />
                ))}
              </div>
            )}

            {/* Footer */}
            <footer className="mt-12 text-center text-muted-foreground">
              <p>Data provided by CoinGecko API</p>
              <p className="text-sm mt-1">
                Prices are updated in real-time • Built with React & Tailwind CSS
              </p>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};