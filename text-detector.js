"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextDetector = void 0;
class TextDetector {
    constructor() {
        this.patterns = {
            aiPatterns: [
                /as an ai language model/i,
                /as a large language model/i,
                /i am an ai/i,
                /i cannot|i'm unable/i
            ],
            humanPatterns: [
                /typo|mistake|oops/i,
                /slang|colloquial/i,
                /personal experience|i remember/i
            ]
        };
    }
    analyzeText(text) {
        const reasons = [];
        let aiScore = 0;
        let humanScore = 0;
        // تحليل الأنماط
        this.patterns.aiPatterns.forEach(pattern => {
            if (pattern.test(text)) {
                aiScore += 0.3;
                reasons.push(`AI pattern detected: ${pattern.source}`);
            }
        });
        this.patterns.humanPatterns.forEach(pattern => {
            if (pattern.test(text)) {
                humanScore += 0.2;
                reasons.push(`Human pattern detected: ${pattern.source}`);
            }
        });
        // تحليل الإحصاءات اللغوية
        const stats = this.analyzeTextStatistics(text);
        aiScore += stats.aiProbability * 0.4;
        humanScore += stats.humanProbability * 0.4;
        const isAIGenerated = aiScore > humanScore;
        const confidence = Math.abs(aiScore - humanScore);
        return {
            isAIGenerated,
            confidence,
            reasons
        };
    }
    analyzeTextStatistics(text) {
        // محاكاة تحليل إحصائي متقدم
        const length = text.length;
        const wordCount = text.split(/\s+/).length;
        const sentenceCount = text.split(/[.!?]+/).length;
        // نموذج مبسط للتحليل الإحصائي
        const complexityScore = (wordCount / sentenceCount) / (length / wordCount);
        return {
            aiProbability: Math.min(0.7, complexityScore * 0.5),
            humanProbability: Math.min(0.8, (1 - complexityScore) * 0.6)
        };
    }
}
exports.TextDetector = TextDetector;
