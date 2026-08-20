"use client";

import Link from "next/link";
import DiagnosticContainer from "@/components/diagnostic/DiagnosticContainer";
import { ArrowLeft } from "lucide-react";

export default function DiagnosticPage() {
  return (
    <div className="min-h-screen bg-surface-100 py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-4xl w-full mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-foreground transition-colors bg-white px-3.5 py-2 rounded-xl border border-border shadow-subtle"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l&apos;accueil OPAL</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl max-w-4xl w-full mx-auto p-6 sm:p-10 md:p-12 border border-border shadow-premium">
        <DiagnosticContainer isModal={false} />
      </div>
    </div>
  );
}
