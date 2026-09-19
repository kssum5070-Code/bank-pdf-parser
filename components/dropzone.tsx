"use client";

import { useId, useRef, useState } from "react";
import { FileText, LoaderCircle, UploadCloud, X } from "lucide-react";
import { cn, formatFileSize } from "@/lib/utils";
import type { ConverterStatus } from "@/lib/types";

type DropzoneProps = {
  status: ConverterStatus;
  file: File | null;
  error: string | null;
  onFileSelected: (file: File) => void;
  onClear: () => void;
};

export function Dropzone({
  status,
  file,
  error,
  onFileSelected,
  onClear,
}: DropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const busy = status === "uploading" || status === "processing";

  function handleFiles(files: FileList | null) {
    const next = files?.[0];
    if (next) onFileSelected(next);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Upload statement</h2>
          <p className="text-sm text-slate-500">PDF bank statements only. Parsing stays in this tab.</p>
        </div>
        {file ? (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
            Remove file
          </button>
        ) : null}
      </div>

      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault();
          if (!busy) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          if (!busy) handleFiles(event.dataTransfer.files);
        }}
        className={cn(
          "flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition",
          isDragging && "border-emerald-500 bg-emerald-50",
          error && "border-red-300 bg-red-50",
          !isDragging && !error && "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100/80",
          busy && "cursor-wait opacity-90",
        )}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept=".pdf,application/pdf"
          className="sr-only"
          disabled={busy}
          onChange={(event) => {
            handleFiles(event.target.files);
            event.target.value = "";
          }}
        />

        {status === "processing" ? (
          <>
            <LoaderCircle className="mb-4 h-12 w-12 animate-spin text-emerald-600" aria-hidden />
            <p className="text-base font-semibold text-slate-900">Processing statement locally…</p>
            <p className="mt-1 max-w-md text-sm text-slate-500">
              Mock extraction is running in the browser. No network request is made.
            </p>
          </>
        ) : file && !error ? (
          <>
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
              <FileText className="h-7 w-7 text-emerald-700" aria-hidden />
            </span>
            <p className="text-base font-semibold text-slate-900">{file.name}</p>
            <p className="mt-1 text-sm text-slate-500">{formatFileSize(file.size)} · PDF ready for preview</p>
          </>
        ) : (
          <>
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
              <UploadCloud className="h-7 w-7 text-slate-700" aria-hidden />
            </span>
            <p className="text-base font-semibold text-slate-900">
              Drag and drop your PDF here
            </p>
            <p className="mt-1 text-sm text-slate-500">or click to browse — .pdf files only</p>
            <span className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              Choose PDF
            </span>
          </>
        )}
      </label>

      {error ? (
        <p role="alert" className="mt-3 text-sm font-medium text-red-600">
          {error}
        </p>
      ) : (
        <p className="mt-3 text-xs text-slate-400">
          Free tier preview is limited to 3 pages. PDF parsing will be added in a later step.
        </p>
      )}
    </section>
  );
}
