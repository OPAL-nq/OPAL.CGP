"use client";

import { useEffect } from "react";
import DiagnosticContainer from "./DiagnosticContainer";

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DiagnosticModal({
  isOpen,
  onClose,
}: DiagnosticModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl p-6 sm:p-10 md:p-12 border border-border shadow-premium relative my-auto">
        <DiagnosticContainer onClose={onClose} isModal={true} />
      </div>
    </div>
  );
}
