import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface SparklineChartProps {
  data: number[];
  isPositive: boolean;
}

export const SparklineChart = ({ data, isPositive }: SparklineChartProps) => {
  // Convert array to chart data format with smooth interpolation
  const chartData = data.map((price, index) => ({
    index,
    price,
    smoothPrice: price // We could add smoothing algorithm here if needed
  }));

  const minPrice = Math.min(...data);
  const maxPrice = Math.max(...data);
  const priceRange = maxPrice - minPrice;

  return (
    <div className="h-20 w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-muted/10 to-transparent">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`gradient-${isPositive ? 'success' : 'danger'}`} x1="0" y1="0" x2="0" y2="1">
              <stop 
                offset="0%" 
                stopColor={isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'} 
                stopOpacity={0.8}
              />
              <stop 
                offset="50%" 
                stopColor={isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'} 
                stopOpacity={0.4}
              />
              <stop 
                offset="100%" 
                stopColor={isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'} 
                stopOpacity={0.1}
              />
            </linearGradient>
            
            {/* Glow effect */}
            <filter id={`glow-${isPositive ? 'success' : 'danger'}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <XAxis hide />
          <YAxis hide domain={[minPrice - priceRange * 0.1, maxPrice + priceRange * 0.1]} />
          
          {/* Area fill */}
          <Area
            type="monotone"
            dataKey="price"
            stroke="none"
            fill={`url(#gradient-${isPositive ? 'success' : 'danger'})`}
            fillOpacity={1}
          />
          
          {/* Main line with glow */}
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
            strokeWidth={3}
            dot={false}
            activeDot={false}
            filter={`url(#glow-${isPositive ? 'success' : 'danger'})`}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Overlay indicators */}
      <div className="absolute top-2 left-2 flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full animate-pulse ${
          isPositive ? 'bg-success' : 'bg-destructive'
        }`} />
        <span className={`text-xs font-bold ${
          isPositive ? 'text-success' : 'text-destructive'
        }`}>
          {isPositive ? '↗' : '↘'}
        </span>
      </div>
    </div>
  );
};