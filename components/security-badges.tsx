import { GlobeLock, ShieldCheck, WifiOff } from "lucide-react";

const BADGES = [
  {
    icon: ShieldCheck,
    label: "100% Private — Files processing never leaves your browser.",
    featured: true,
  },
  {
    icon: WifiOff,
    label: "No uploads. No servers. No tracking.",
  },
  {
    icon: GlobeLock,
    label: "Works fully offline after the page loads.",
  },
];

export function SecurityBadges() {
  return (
    <section aria-label="Privacy guarantees" className="grid gap-3 sm:grid-cols-3">
      {BADGES.map(({ icon: Icon, label, featured }) => (
        <div
          key={label}
          className={
            featured
              ? "col-span-1 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-950 shadow-sm sm:col-span-3"
              : "flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700"
          }
        >
          <span
            className={
              featured
                ? "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white"
                : "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700"
            }
          >
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          <p className={featured ? "text-sm font-semibold leading-6 sm:text-base" : "text-sm leading-6"}>
            {label}
          </p>
        </div>
      ))}
    </section>
  );
}
