"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import PositioningSection from "@/components/PositioningSection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import DiagnosticSection from "@/components/DiagnosticSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import DiagnosticModal from "@/components/diagnostic/DiagnosticModal";
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

      {/* 02. Section 1 — Hero with Graphic Tension & Operating Engine Visualizer */}
      <Hero onOpenDiagnostic={handleOpenDiagnostic} />

      {/* 03. Section 2 — Problem Section with 5->300+ Clients Escalation */}
      <ProblemSection onOpenDiagnostic={handleOpenDiagnostic} />

      {/* 04. Section 3 — What OPAL Does (4 Pillars) */}
      <PositioningSection />

      {/* 05. Section 3 (cont.) — Interactive Before / After Matrix */}
      <BeforeAfterSlider />

      {/* 06. Section 4 — Diagnostic High-Conversion Section */}
      <DiagnosticSection onOpenDiagnostic={handleOpenDiagnostic} />

      {/* 07. Final Conversion Callout */}
      <FinalCTA onOpenDiagnostic={handleOpenDiagnostic} />

      {/* 08. Institutional Footer */}
      <Footer />

      {/* Fullscreen / Large Interactive Diagnostic Modal */}
      <DiagnosticModal isOpen={diagnosticOpen} onClose={handleCloseDiagnostic} />
    </main>
  );
}
