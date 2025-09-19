import { TextAnalyzer } from '../analyzers/text-analyzer';
import { TFModel } from '../ml/tf-model';

export class TextDetector {
  private patterns = {
    aiPatterns: [
      /as an ai language model/i,
      /as a large language model/i,
      /i am an ai/i,
      /i cannot|i'm unable/i,
      /trained on.*data/i,
      /generate.*response/i
    ],
    humanPatterns: [
      /typo|mistake|oops|sorry/i,
      /slang|colloquial|informal/i,
      /personal experience|i remember|my story/i,
      /i think|i believe|i feel/i,
      /in my opinion|from my perspective/i
    ]
  };

  private textAnalyzer: TextAnalyzer;
  private tfModel: TFModel;

  constructor() {
    this.textAnalyzer = new TextAnalyzer();
    this.tfModel = new TFModel();
    
    // تهيئة TensorFlow في الخلفية
    this.initializeTF();
  }

  private async initializeTF(): Promise<void> {
    try {
      await this.tfModel.initialize();
      console.log('✅ TensorFlow integration ready');
    } catch (error) {
      console.warn('⚠️ TensorFlow not available, using fallback analysis');
    }
  }

  public async analyzeText(text: string): Promise<{ 
    isAIGenerated: boolean; 
    confidence: number; 
    reasons: string[]; 
    metadata?: any;
    tfScore?: number;
  }> {
    const reasons: string[] = [];
    let aiScore = 0;
    let humanScore = 0;
    let tfScore = 0.5; // قيمة افتراضية

    // التحليل الأساسي للأنماط
    this.patterns.aiPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        aiScore += 0.2 + (matches.length * 0.1);
        reasons.push(`AI pattern: ${pattern.source} (${matches.length}x)`);
      }
    });

    this.patterns.humanPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        humanScore += 0.15 + (matches.length * 0.08);
        reasons.push(`Human pattern: ${pattern.source} (${matches.length}x)`);
      }
    });

    // التحليل الإحصائي المتقدم
    const advancedAnalysis = this.textAnalyzer.analyzeAdvanced(text);
    aiScore += advancedAnalysis.metadata.aiProbability * 0.3;
    humanScore += advancedAnalysis.metadata.humanProbability * 0.3;

    reasons.push(...advancedAnalysis.indicators);

    // استخدام TensorFlow إذا كان متاحاً
    try {
      if (await this.tfModel.isInitializedCheck()) {
        const features = this.tfModel.extractTextFeatures(text);
        tfScore = await this.tfModel.analyzeTextFeatures(features);
        aiScore += tfScore * 0.4;
        humanScore += (1 - tfScore) * 0.4;
        reasons.push(`TF.js analysis score: ${(tfScore * 100).toFixed(1)}%`);
      }
    } catch (error) {
      reasons.push('TF.js analysis skipped (fallback mode)');
    }

    const totalScore = aiScore + humanScore;
    const normalizedAIScore = totalScore > 0 ? aiScore / totalScore : 0.5;
    const normalizedHumanScore = totalScore > 0 ? humanScore / totalScore : 0.5;

    const isAIGenerated = normalizedAIScore > normalizedHumanScore;
    const confidence = Math.abs(normalizedAIScore - normalizedHumanScore);

    return {
      isAIGenerated,
      confidence,
      reasons,
      tfScore,
      metadata: {
        ...advancedAnalysis.metadata,
        aiScore: normalizedAIScore,
        humanScore: normalizedHumanScore,
        totalPatterns: reasons.length
      }
    };
  }

  private analyzeTextStatistics(text: string): { aiProbability: number; humanProbability: number } {
    const length = text.length;
    const wordCount = text.split(/\s+/).length;
    const sentenceCount = text.split(/[.!?]+/).filter(s => s.length > 0).length;

    const complexityScore = sentenceCount > 0 ? (wordCount / sentenceCount) / (length / wordCount) : 0.5;
    
    return {
      aiProbability: Math.min(0.8, complexityScore * 0.6),
      humanProbability: Math.min(0.85, (1 - complexityScore) * 0.7)
    };
  }
}