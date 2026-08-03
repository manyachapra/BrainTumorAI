function PredictionCard({ result }) {
  if (!result) return null;

  const isBenign = result.prediction?.toLowerCase() === "no tumor";

  const badgeStyle = isBenign
    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
    : "bg-rose-500/15 text-rose-400 border-rose-500/30";

  const dotColor = isBenign ? "bg-emerald-400" : "bg-rose-400";

  const statusText = isBenign ? "No Tumor Detected" : "Tumor Detected";

  return (
    <div className="w-full animate-fade-in-up">
      {/* Status Badge */}
      <div className="flex items-center justify-center mb-4">
        <span
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium ${badgeStyle}`}
        >
          <span className={`w-2 h-2 rounded-full ${dotColor}`} />
          {statusText}
        </span>
      </div>

      {/* Prediction Label */}
      <div className="text-center mb-2">
        <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">
          Classification
        </p>
        <h2 className="text-4xl font-bold text-white">{result.prediction}</h2>
      </div>
    </div>
  );
}

export default PredictionCard;
