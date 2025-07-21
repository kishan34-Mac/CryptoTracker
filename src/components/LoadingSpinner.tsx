import { Loader2, TrendingUp, Zap } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] relative">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-24 h-24 border-4 border-muted/30 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin" 
               style={{ animationDuration: '1s' }} />
        </div>
        
        {/* Middle ring */}
        <div className="absolute top-2 left-2 w-20 h-20 border-3 border-muted/20 rounded-full animate-spin"
             style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
          <div className="absolute top-0 left-0 w-full h-full border-3 border-transparent border-t-accent rounded-full animate-spin"
               style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
        
        {/* Inner ring */}
        <div className="absolute top-4 left-4 w-16 h-16 border-2 border-muted/10 rounded-full animate-spin"
             style={{ animationDuration: '2s' }}>
          <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent border-t-success rounded-full animate-spin"
               style={{ animationDuration: '2s' }} />
        </div>
        
        {/* Center glow with icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse-glow flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white animate-bounce" />
          </div>
        </div>
        
        {/* Orbital dots */}
        <div className="absolute inset-0 animate-rotate-glow">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 animate-pulse" />
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-accent rounded-full transform -translate-x-1/2 animate-pulse" 
               style={{ animationDelay: '0.5s' }} />
          <div className="absolute left-0 top-1/2 w-2 h-2 bg-success rounded-full transform -translate-y-1/2 animate-pulse" 
               style={{ animationDelay: '1s' }} />
          <div className="absolute right-0 top-1/2 w-2 h-2 bg-destructive rounded-full transform -translate-y-1/2 animate-pulse" 
               style={{ animationDelay: '1.5s' }} />
        </div>
      </div>
      
      <div className="ml-6 space-y-2">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-primary animate-bounce" />
          <p className="text-xl font-bold text-foreground animate-gradient-flow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Loading Crypto Data
          </p>
        </div>
        <p className="text-muted-foreground flex items-center space-x-2">
          <span>Fetching real-time prices from global markets</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
            <div className="w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-1 bg-success rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </p>
        
        {/* Progress indicator */}
        <div className="w-64 h-1 bg-muted/30 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary via-accent to-success animate-shimmer bg-size-200" />
        </div>
      </div>
    </div>
  );
};