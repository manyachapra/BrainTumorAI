function ImagePreview({ preview }) {
  if (!preview) return null;

  return (
    <div className="animate-fade-in-up">
      <p className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">
        Uploaded MRI Scan
      </p>
      <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl shadow-black/20">
        <img
          src={preview}
          alt="MRI Preview"
          className="w-full max-w-[280px] aspect-square object-cover"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
      </div>
    </div>
  );
}

export default ImagePreview;
