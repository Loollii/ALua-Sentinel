export class TextAnalyzer {
  private advancedPatterns = {
    aiIndicators: [
      /as (an|a) (ai|artificial intelligence)/i,
      /language model/i,
      /trained on.*data/i,
      /generate.*text/i,
      /pattern.*recognition/i,
      /algorithm.*based/i
    ],
    humanIndicators: [
      /i think|i believe|i feel/i,
      /in my opinion|from my experience/i,
      /typo|mistake|sorry|oops/i,
      /slang|colloquial|informal/i,
      /personal.*story|anecdote/i
    ]
  };

  public analyzeAdvanced(text: string): { score: number; indicators: string[]; metadata: any } {
    const indicators: string[] = [];
    let aiScore = 0;
    let humanScore = 0;

    // تحليل متقدم للأنماط
    this.advancedPatterns.aiIndicators.forEach((pattern) => {
      const matches = text.match(pattern);
      if (matches) {
        aiScore += 0.15;
        indicators.push(`AI indicator: ${pattern.source} (${matches.length} matches)`);
      }
    });

    this.advancedPatterns.humanIndicators.forEach((pattern) => {
      const matches = text.match(pattern);
      if (matches) {
        humanScore += 0.12;
        indicators.push(`Human indicator: ${pattern.source} (${matches.length} matches)`);
      }
    });

    // تحليل إحصائي متقدم
    const statisticalAnalysis = this.performStatisticalAnalysis(text);
    aiScore += statisticalAnalysis.aiProbability * 0.6;
    humanScore += statisticalAnalysis.humanProbability * 0.6;

    return {
      score: aiScore > humanScore ? aiScore - humanScore : humanScore - aiScore,
      indicators,
      metadata: {
        textLength: text.length,
        wordCount: text.split(/\s+/).length,
        sentenceCount: text.split(/[.!?]+/).filter(s => s.length > 0).length,
        ...statisticalAnalysis
      }
    };
  }

  private performStatisticalAnalysis(text: string): any {
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.length > 0);
    
    const wordVariety = new Set(words).size / Math.max(1, words.length);
    const sentenceComplexity = words.length / Math.max(1, sentences.length);
    const punctuationDiversity = this.analyzePunctuation(text);

    return {
      aiProbability: Math.min(0.9, wordVariety * 0.7 + sentenceComplexity * 0.2),
      humanProbability: Math.min(0.95, punctuationDiversity * 0.6 + (1 - wordVariety) * 0.4),
      wordVariety,
      sentenceComplexity,
      punctuationDiversity
    };
  }

  private analyzePunctuation(text: string): number {
    const punctuation = text.match(/[!?,;:'"-]/g) || [];
    const uniquePunctuation = new Set(punctuation).size;
    return uniquePunctuation / Math.max(1, punctuation.length);
  }
}