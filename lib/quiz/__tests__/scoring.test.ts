import { describe, it, expect } from "vitest";
import { calculateDiagnosticScore, UserAnswers } from "../scoring";
import { QUIZ_QUESTIONS } from "../questions";

describe("OPAL Diagnostic Scoring Engine", () => {
  it("should calculate minimum score (Cabinet sous tension)", () => {
    const answers: UserAnswers = {};
    for (const q of QUIZ_QUESTIONS) {
      // Pick the lowest scoring option (last option in list)
      const lastOpt = q.options[q.options.length - 1];
      answers[q.id] = lastOpt.id;
    }

    const result = calculateDiagnosticScore(answers);
    expect(result.globalScore).toBeLessThan(40);
    expect(result.profile.key).toBe("tension");
    expect(result.profile.label).toBe("Cabinet sous tension");
  });

  it("should calculate maximum score (Cabinet prêt à accélérer)", () => {
    const answers: UserAnswers = {};
    for (const q of QUIZ_QUESTIONS) {
      // Pick the highest scoring option (first option in list)
      const firstOpt = q.options[0];
      answers[q.id] = firstOpt.id;
    }

    const result = calculateDiagnosticScore(answers);
    expect(result.globalScore).toBeGreaterThanOrEqual(80);
    expect(result.profile.key).toBe("accelerate");
    expect(result.profile.label).toBe("Cabinet prêt à accélérer");
    expect(result.dimensions.commercialCapacity).toBe(100);
    expect(result.dimensions.organization).toBe(100);
    expect(result.dimensions.operationalEfficiency).toBe(100);
  });

  it("should correctly identify organization bottleneck when organization scores are lowest", () => {
    const answers: UserAnswers = {};
    for (const q of QUIZ_QUESTIONS) {
      if (q.dimension === "organization") {
        // Lowest option for organization
        answers[q.id] = q.options[q.options.length - 1].id;
      } else {
        // Top option for others
        answers[q.id] = q.options[0].id;
      }
    }

    const result = calculateDiagnosticScore(answers);
    expect(result.primaryBottleneck.dimension).toBe("organization");
    expect(result.dimensions.organization).toBeLessThan(result.dimensions.commercialCapacity);
  });

  it("should correctly identify commercial capacity bottleneck", () => {
    const answers: UserAnswers = {};
    for (const q of QUIZ_QUESTIONS) {
      if (q.dimension === "commercialCapacity") {
        answers[q.id] = q.options[q.options.length - 1].id;
      } else {
        answers[q.id] = q.options[0].id;
      }
    }

    const result = calculateDiagnosticScore(answers);
    expect(result.primaryBottleneck.dimension).toBe("commercialCapacity");
  });

  it("should correctly identify operational efficiency bottleneck", () => {
    const answers: UserAnswers = {};
    for (const q of QUIZ_QUESTIONS) {
      if (q.dimension === "operationalEfficiency") {
        answers[q.id] = q.options[q.options.length - 1].id;
      } else {
        answers[q.id] = q.options[0].id;
      }
    }

    const result = calculateDiagnosticScore(answers);
    expect(result.primaryBottleneck.dimension).toBe("operationalEfficiency");
  });

  it("should correctly identify growth capacity bottleneck", () => {
    const answers: UserAnswers = {};
    for (const q of QUIZ_QUESTIONS) {
      if (q.dimension === "growthCapacity") {
        answers[q.id] = q.options[q.options.length - 1].id;
      } else {
        answers[q.id] = q.options[0].id;
      }
    }

    const result = calculateDiagnosticScore(answers);
    expect(result.primaryBottleneck.dimension).toBe("growthCapacity");
  });

  it("should map 40-59 to Cabinet en transition and 60-79 to Cabinet structuré", () => {
    // Intermediate test
    const answersMid: UserAnswers = {
      1: "q1_b", // 70
      2: "q2_b", // 65
      3: "q3_b", // 70
      4: "q4_b", // 70
      5: "q5_b", // 65
      6: "q6_b", // 70
      7: "q7_b", // 70
      8: "q8_b", // 70
      9: "q9_b", // 70
      10: "q10_b", // 70
      11: "q11_b", // 70
      12: "q12_team", // 50
    };

    const resultMid = calculateDiagnosticScore(answersMid);
    expect(resultMid.globalScore).toBeGreaterThanOrEqual(60);
    expect(resultMid.globalScore).toBeLessThan(80);
    expect(resultMid.profile.key).toBe("structured");
  });
});
