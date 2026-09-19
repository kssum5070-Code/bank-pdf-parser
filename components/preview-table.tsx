import { Download, Table2 } from "lucide-react";
import { MOCK_TRANSACTIONS } from "@/lib/mock-transactions";
import type { ConverterStatus } from "@/lib/types";

type PreviewTableProps = {
  status: ConverterStatus;
  fileName: string | null;
};

export function PreviewTable({ status, fileName }: PreviewTableProps) {
  const showPlaceholder = status === "idle" || status === "error";
  const showSkeleton = status === "uploading" || status === "processing";
  const showRows = status === "preview";

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <Table2 className="h-5 w-5 text-slate-500" aria-hidden />
            Transaction preview
          </h2>
          <p className="text-sm text-slate-500">
            {showRows && fileName
              ? `Mock rows extracted from ${fileName}`
              : "A table appears here after you drop a PDF."}
          </p>
        </div>
        <button
          type="button"
          disabled={!showRows}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-200 disabled:text-slate-500"
        >
          <Download className="h-4 w-4" aria-hidden />
          Download CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Description</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold text-right">Amount</th>
              <th className="px-4 py-3 font-semibold text-right">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {showPlaceholder ? (
              <tr>
                <td colSpan={5} className="px-4 py-16 text-center text-slate-400">
                  Drop a PDF to load a preview table.
                </td>
              </tr>
            ) : null}

            {showSkeleton
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    {Array.from({ length: 5 }).map((__, cell) => (
                      <td key={cell} className="px-4 py-3">
                        <span className="block h-4 animate-pulse rounded bg-slate-100" />
                      </td>
                    ))}
                  </tr>
                ))
              : null}

            {showRows
              ? MOCK_TRANSACTIONS.map((row) => (
                  <tr key={`${row.date}-${row.description}`} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-700">
                      {row.date}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{row.description}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          row.type === "Credit"
                            ? "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"
                            : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
                        }
                      >
                        {row.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-medium tabular-nums text-slate-900">
                      {row.type === "Credit" ? "+" : "−"}
                      {row.amount}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-slate-500">
                      {row.balance}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
