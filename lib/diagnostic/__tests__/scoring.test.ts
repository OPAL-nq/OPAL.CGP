import { describe, it, expect } from "vitest";
import { calculateDiagnosticScore, UserAnswers } from "../scoring";
import { DIAGNOSTIC_QUESTIONS } from "../questions";

describe("OPAL 12-Question Diagnostic Scoring Engine", () => {
  it("should calculate minimum score (Organisation sous tension)", () => {
    const answers: UserAnswers = { 1: "cgp" };
    for (const q of DIAGNOSTIC_QUESTIONS) {
      if (q.type === "single" && q.options) {
        // Pick lowest scoring option (last in list)
        const lastOpt = q.options[q.options.length - 1];
        answers[q.id] = lastOpt.id;
      }
    }
    answers[12] = "Trop d'administratif et pas assez de temps de conseil";

    const result = calculateDiagnosticScore(
      answers,
      { sector: "cgp" },
      answers[12]
    );

    expect(result.globalScore).toBeLessThan(40);
    expect(result.profile.key).toBe("tension");
    expect(result.profile.label).toBe("Organisation sous tension");
    expect(result.freeTextAnswer).toBe("Trop d'administratif et pas assez de temps de conseil");
  });

  it("should calculate maximum score (Organisation prête à accélérer)", () => {
    const answers: UserAnswers = { 1: "avocat" };
    for (const q of DIAGNOSTIC_QUESTIONS) {
      if (q.type === "single" && q.options) {
        // Pick highest scoring option (first in list)
        const firstOpt = q.options[0];
        answers[q.id] = firstOpt.id;
      }
    }

    const result = calculateDiagnosticScore(answers, { sector: "avocat" });
    expect(result.globalScore).toBeGreaterThanOrEqual(80);
    expect(result.profile.key).toBe("accelerate");
    expect(result.profile.label).toBe("Organisation prête à accélérer");
    expect(result.dimensions.structure).toBe(100);
    expect(result.dimensions.efficiency).toBe(100);
    expect(result.dimensions.capacity).toBe(100);
    expect(result.dimensions.visibility).toBe(100);
  });

  it("should correctly identify structure bottleneck when structure dimension scores lowest", () => {
    const answers: UserAnswers = { 1: "immo" };
    for (const q of DIAGNOSTIC_QUESTIONS) {
      if (q.type === "single" && q.options) {
        if (q.dimension === "structure") {
          answers[q.id] = q.options[q.options.length - 1].id;
        } else {
          answers[q.id] = q.options[0].id;
        }
      }
    }

    const result = calculateDiagnosticScore(answers, { sector: "immo" });
    expect(result.primaryBottleneck.dimension).toBe("structure");
    expect(result.dimensions.structure).toBeLessThan(result.dimensions.capacity);
  });

  it("should correctly identify efficiency bottleneck when efficiency dimension scores lowest", () => {
    const answers: UserAnswers = { 1: "comptabilite" };
    for (const q of DIAGNOSTIC_QUESTIONS) {
      if (q.type === "single" && q.options) {
        if (q.dimension === "efficiency") {
          answers[q.id] = q.options[q.options.length - 1].id;
        } else {
          answers[q.id] = q.options[0].id;
        }
      }
    }

    const result = calculateDiagnosticScore(answers, { sector: "comptabilite" });
    expect(result.primaryBottleneck.dimension).toBe("efficiency");
  });

  it("should correctly identify capacity bottleneck when capacity dimension scores lowest", () => {
    const answers: UserAnswers = { 1: "notaire" };
    for (const q of DIAGNOSTIC_QUESTIONS) {
      if (q.type === "single" && q.options) {
        if (q.dimension === "capacity") {
          answers[q.id] = q.options[q.options.length - 1].id;
        } else {
          answers[q.id] = q.options[0].id;
        }
      }
    }

    const result = calculateDiagnosticScore(answers, { sector: "notaire" });
    expect(result.primaryBottleneck.dimension).toBe("capacity");
  });

  it("should correctly map intermediate score to Organisation structurée", () => {
    const answers: UserAnswers = {
      1: "assurance",
      2: "q2_manageable", // 75
      3: "q3_few_synced", // 75
      4: "q4_documented", // 75
      5: "q5_few_hours",  // 75
      6: "q6_minor_friction", // 75
      7: "q7_some", // 75
      8: "q8_minor", // 75
      9: "q9_good", // 75
      10: "q10_prob", // 70
      11: "q11_structure", // 50
      12: "Standardiser nos processus",
    };

    const result = calculateDiagnosticScore(answers, { sector: "assurance" }, answers[12]);
    expect(result.globalScore).toBeGreaterThanOrEqual(60);
    expect(result.globalScore).toBeLessThan(80);
    expect(result.profile.key).toBe("structured");
    expect(result.profile.label).toBe("Organisation structurée");
  });

  it("should preserve custom sector input when sector is other", () => {
    const answers: UserAnswers = { 1: "autre" };
    const result = calculateDiagnosticScore(answers, {
      sector: "autre",
      sectorOther: "Architecte d'intérieur",
    });

    expect(result.sector).toBe("autre");
    expect(result.sectorOther).toBe("Architecte d'intérieur");
  });
});
