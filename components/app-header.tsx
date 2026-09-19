import { FileSpreadsheet, Lock, Sparkles } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
            <FileSpreadsheet className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
              Private Bank Statement to CSV Converter
            </p>
            <p className="hidden items-center gap-1 text-xs text-slate-500 sm:flex">
              <Lock className="h-3 w-3" aria-hidden />
              Client-side only
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 sm:text-sm">
            Free Tier: 3 Pages Max
          </div>
          <button
            type="button"
            disabled
            title="Pro upgrades are coming soon"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500 sm:px-4 sm:text-sm"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Upgrade to Pro
          </button>
        </div>
      </div>
    </header>
  );
}
