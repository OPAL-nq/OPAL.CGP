"use client";

import { useState } from "react";
import { ArrowRight, ShieldCheck, Lock, Building2 } from "lucide-react";
import { LeadData } from "@/lib/diagnostic/lead";
import { SECTOR_OPTIONS } from "@/lib/diagnostic/questions";

interface LeadCaptureProps {
  initialSector?: string;
  initialSectorOther?: string;
  onSubmit: (lead: LeadData) => void;
  isSubmitting?: boolean;
}

export default function LeadCapture({
  initialSector = "cgp",
  initialSectorOther = "",
  onSubmit,
  isSubmitting = false,
}: LeadCaptureProps) {
  const [formData, setFormData] = useState<LeadData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    sector: initialSector,
    sectorOther: initialSectorOther,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});

  // Label for prefilled sector badge
  const sectorLabel =
    formData.sector === "autre" && formData.sectorOther
      ? formData.sectorOther
      : SECTOR_OPTIONS.find((s) => s.id === formData.sector)?.label || formData.sector;

  const validate = () => {
    const newErrors: Partial<Record<keyof LeadData, string>> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Veuillez renseigner votre prénom";
    if (!formData.lastName.trim()) newErrors.lastName = "Veuillez renseigner votre nom";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      newErrors.email = "Veuillez renseigner une adresse email professionnelle valide";
    }
    if (!formData.company.trim()) newErrors.company = "Veuillez renseigner le nom de votre entreprise";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-opal-redLight text-opal-red border border-opal-redBorder text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Dernière Étape</span>
        </div>
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground tracking-tight">
          Votre diagnostic est presque prêt.
        </h3>
        <p className="text-sm sm:text-base text-muted max-w-md mx-auto leading-relaxed">
          Nous allons maintenant analyser vos réponses pour identifier votre principal point de friction opérationnel.
        </p>
      </div>

      {/* Sector Badge Indicator */}
      <div className="flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-100 border border-border text-xs font-medium text-foreground">
          <Building2 className="w-3.5 h-3.5 text-opal-red" />
          <span>Secteur : <strong>{sectorLabel}</strong></span>
        </span>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-card space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
              Prénom <span className="text-opal-red">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="Maxime"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground focus-ring transition-colors ${
                errors.firstName
                  ? "border-red-500 bg-red-50/20"
                  : "border-border bg-surface-50 focus:bg-white"
              }`}
            />
            {errors.firstName && (
              <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
              Nom <span className="text-opal-red">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="Dupont"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground focus-ring transition-colors ${
                errors.lastName
                  ? "border-red-500 bg-red-50/20"
                  : "border-border bg-surface-50 focus:bg-white"
              }`}
            />
            {errors.lastName && (
              <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
            Email professionnel <span className="text-opal-red">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="m.dupont@entreprise.fr"
            className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground focus-ring transition-colors ${
              errors.email
                ? "border-red-500 bg-red-50/20"
                : "border-border bg-surface-50 focus:bg-white"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
              Entreprise <span className="text-opal-red">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Cabinet Dupont & Associés"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground focus-ring transition-colors ${
                errors.company
                  ? "border-red-500 bg-red-50/20"
                  : "border-border bg-surface-50 focus:bg-white"
              }`}
            />
            {errors.company && (
              <p className="text-xs text-red-600 mt-1">{errors.company}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
              Téléphone <span className="text-muted font-normal text-[10px]">(facultatif mais recommandé)</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="06 12 34 56 78"
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-50 focus:bg-white text-sm text-foreground focus-ring transition-colors"
            />
          </div>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2.5 bg-opal-red hover:bg-opal-redDark text-white py-4 px-6 rounded-xl font-display font-bold text-base shadow-sm hover:shadow-glow transition-all duration-200 active:scale-[0.99] disabled:opacity-50 focus-ring"
          >
            <span>{isSubmitting ? "Calcul du diagnostic..." : "Voir mon diagnostic →"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-muted pt-2">
          <Lock className="w-3 h-3 text-muted" />
          <span>Vos informations restent strictement confidentielles. Aucun spam.</span>
        </div>
      </form>
    </div>
  );
}
