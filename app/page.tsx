"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import PositioningSection from "@/components/PositioningSection";
import BeforeAfter from "@/components/BeforeAfter";
import DiagnosticSection from "@/components/DiagnosticSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import QuizModal from "@/components/quiz/QuizModal";
import { trackEvent } from "@/lib/analytics";

export default function Home() {
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);

  useEffect(() => {
    trackEvent("landing_view");
  }, []);

  const handleOpenDiagnostic = () => {
    setDiagnosticOpen(true);
  };

  const handleCloseDiagnostic = () => {
    setDiagnosticOpen(false);
  };

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground selection:bg-opal-redLight selection:text-opal-redDark">
      {/* 01. Sticky Header */}
      <Header onOpenDiagnostic={handleOpenDiagnostic} />

      {/* 02. Hero Section with Capacity Visualizer */}
      <Hero onOpenDiagnostic={handleOpenDiagnostic} />

      {/* 03. Problem Section with Escalation Timeline */}
      <ProblemSection />

      {/* 04. Positioning & 4 Pillars OPAL */}
      <PositioningSection />

      {/* 05. Before / After Transformation Matrix */}
      <BeforeAfter />

      {/* 06. Diagnostic Section */}
      <DiagnosticSection onOpenDiagnostic={handleOpenDiagnostic} />

      {/* 07. Final CTA */}
      <FinalCTA onOpenDiagnostic={handleOpenDiagnostic} />

      {/* 08. Sober Institutional Footer */}
      <Footer />

      {/* Diagnostic Interactive Fullscreen Modal */}
      <QuizModal isOpen={diagnosticOpen} onClose={handleCloseDiagnostic} />
    </main>
  );
}
