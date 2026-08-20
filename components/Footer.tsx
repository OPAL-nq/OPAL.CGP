"use client";

import { useState } from "react";
import { Shield, X, Mail } from "lucide-react";

export default function Footer() {
  const [legalModalOpen, setLegalModalOpen] = useState<"mentions" | "privacy" | "contact" | null>(null);

  return (
    <footer className="bg-surface-50 border-t border-border py-12 text-sm text-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-border">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-opal-black flex items-center justify-center text-white font-display font-black text-xs">
                O
              </div>
              <span className="font-display font-black text-lg tracking-tight text-foreground">
                OPAL
              </span>
            </div>
            <p className="text-xs text-muted max-w-sm">
              Studio de création de logiciels métiers & infrastructure opérationnelle pour entreprises en croissance.
            </p>
          </div>

          {/* Legal / Policy Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <button
              onClick={() => setLegalModalOpen("mentions")}
              className="hover:text-foreground transition-colors"
            >
              Mentions légales
            </button>
            <button
              onClick={() => setLegalModalOpen("privacy")}
              className="hover:text-foreground transition-colors"
            >
              Politique de confidentialité & RGPD
            </button>
            <button
              onClick={() => setLegalModalOpen("contact")}
              className="hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted/80">
          <p suppressHydrationWarning>© 2026 OPAL. Tous droits réservés.</p>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-opal-red" />
            <span>Données hébergées en France · Conformité RGPD</span>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Legal / Privacy / Contact */}
      {legalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-border shadow-premium relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setLegalModalOpen(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-muted hover:text-foreground hover:bg-surface-100 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {legalModalOpen === "mentions" && (
              <div className="space-y-4 text-xs sm:text-sm text-muted">
                <h3 className="font-display font-bold text-lg text-foreground">
                  Mentions Légales
                </h3>
                <p>
                  <strong>Éditeur du site :</strong> OPAL Studio.
                </p>
                <p>
                  <strong>Directeur de la publication :</strong> Maxym — OPAL.
                </p>
                <p>
                  <strong>Hébergement :</strong> Plateforme cloud sécurisée répondant aux normes européennes de protection des données (RGPD).
                </p>
                <p>
                  <strong>Propriété intellectuelle :</strong> L&apos;ensemble des contenus, marques, logos et visuels présents sur ce site sont la propriété exclusive d&apos;OPAL.
                </p>
              </div>
            )}

            {legalModalOpen === "privacy" && (
              <div className="space-y-4 text-xs sm:text-sm text-muted">
                <h3 className="font-display font-bold text-lg text-foreground">
                  Politique de Confidentialité & RGPD
                </h3>
                <p>
                  Les informations recueillies lors du diagnostic de capacité opérationnelle (nom, prénom, email professionnel, entreprise, téléphone, secteur) sont exclusivement destinées à la restitution de votre analyse et aux échanges professionnels afférents.
                </p>
                <p>
                  Aucune donnée n&apos;est transmise ou vendue à des tiers. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données en contactant notre équipe.
                </p>
              </div>
            )}

            {legalModalOpen === "contact" && (
              <div className="space-y-4 text-xs sm:text-sm text-muted">
                <h3 className="font-display font-bold text-lg text-foreground">
                  Contact
                </h3>
                <p>
                  Pour toute question concernant OPAL ou le diagnostic de votre entreprise :
                </p>
                <div className="p-4 rounded-xl bg-surface-50 border border-border flex items-center gap-3 text-foreground font-medium">
                  <Mail className="w-5 h-5 text-opal-red" />
                  <span>contact@opal.business</span>
                </div>
                <p className="text-xs">
                  Notre équipe répond sous 24h ouvrées aux dirigeants d&apos;entreprises.
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-border flex justify-end">
              <button
                onClick={() => setLegalModalOpen(null)}
                className="px-4 py-2 bg-surface-100 hover:bg-surface-200 text-foreground font-semibold text-xs rounded-xl transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
