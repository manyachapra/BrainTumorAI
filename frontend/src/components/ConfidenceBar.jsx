function ConfidenceBar({ confidence }) {
  if (confidence == null) return null;

  const getBarColor = () => {
    if (confidence >= 90) return "from-emerald-400 to-cyan-400";
    if (confidence >= 70) return "from-amber-400 to-yellow-400";
    return "from-rose-400 to-red-400";
  };

  const getTextColor = () => {
    if (confidence >= 90) return "text-emerald-400";
    if (confidence >= 70) return "text-amber-400";
    return "text-rose-400";
  };

  return (
    <div className="w-full animate-fade-in-up">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
          Confidence
        </p>
        <p className={`text-lg font-bold tabular-nums ${getTextColor()}`}>
          {confidence}%
        </p>
      </div>

      <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getBarColor()} animate-bar-fill`}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  );
}

export default ConfidenceBar;
