export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute inset-4 bg-primary/10 rounded-full animate-pulse flex items-center justify-center">
          <div className="w-4 h-4 bg-primary rounded-full"></div>
        </div>
      </div>
      <h2 className="mt-8 font-heading text-2xl font-bold text-primary animate-pulse">Harvesting...</h2>
    </div>
  );
}
