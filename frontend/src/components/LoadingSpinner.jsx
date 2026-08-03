function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        {/* Pulsing Brain with Spinning Ring */}
        <div className="relative w-20 h-20">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center animate-pulse-glow">
            <span className="text-4xl">🧠</span>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin" />
        </div>

        <div className="text-center">
          <p className="text-lg font-medium text-white">Analyzing MRI</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              style={{ animation: "dot-pulse 1.4s ease-in-out infinite" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              style={{ animation: "dot-pulse 1.4s ease-in-out 0.2s infinite" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              style={{ animation: "dot-pulse 1.4s ease-in-out 0.4s infinite" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
