"use client";

import { useRef, useState } from "react";
import { AppHeader } from "@/components/app-header";
import { Dropzone } from "@/components/dropzone";
import { PreviewTable } from "@/components/preview-table";
import { SecurityBadges } from "@/components/security-badges";
import type { ConverterStatus } from "@/lib/types";
import { isPdfFile } from "@/lib/utils";

export function ConverterApp() {
  const [status, setStatus] = useState<ConverterStatus>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  function clearTimers() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }

  function reset() {
    clearTimers();
    setStatus("idle");
    setFile(null);
    setError(null);
  }

  function onFileSelected(next: File) {
    clearTimers();

    if (!isPdfFile(next)) {
      setFile(null);
      setError("Only .pdf files are accepted. Please choose a bank statement PDF.");
      setStatus("error");
      return;
    }

    setError(null);
    setFile(next);
    setStatus("uploading");

    const processingId = window.setTimeout(() => setStatus("processing"), 450);
    const previewId = window.setTimeout(() => setStatus("preview"), 1800);
    timers.current = [processingId, previewId];
  }

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Local web utility
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Convert bank PDFs to CSV without sending them anywhere.
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Drop a statement, preview transactions, then export CSV. This step uses mock data so the layout and states can be reviewed before PDF parsing is added.
          </p>
        </div>

        <SecurityBadges />
        <Dropzone
          status={status}
          file={file}
          error={error}
          onFileSelected={onFileSelected}
          onClear={reset}
        />
        <PreviewTable status={status} fileName={file?.name ?? null} />
      </main>
    </div>
  );
}
