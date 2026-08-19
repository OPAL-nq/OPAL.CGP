"use client";

import Link from "next/link";
import QuizContainer from "@/components/quiz/QuizContainer";
import { ArrowLeft } from "lucide-react";

export default function DiagnosticPage() {
  return (
    <div className="min-h-screen bg-surface-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour à l&apos;accueil OPAL.CGP</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl max-w-4xl mx-auto p-6 sm:p-10 md:p-12 border border-border shadow-premium">
        <QuizContainer isModal={false} />
      </div>
    </div>
  );
}
