function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-xl shadow-lg shadow-cyan-500/20">
              🧠
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                BrainTumor<span className="text-cyan-400">AI</span>
              </h1>
              <p className="text-xs text-slate-400 -mt-0.5">
                ResNet50 MRI Classification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Model Active
            </span>
          </div>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
    </nav>
  );
}

export default Navbar;
