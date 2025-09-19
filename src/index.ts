import { TextDetector } from './detectors/text-detector';
import { ImageDetector } from './detectors/image-detector';
import { TFModel } from './ml/tf-model';

class ALuaSentinel {
  private version: string = '1.0.0-beta';
  private textDetector: TextDetector;
  private imageDetector: ImageDetector;
  private tfModel: TFModel;
  private isInitialized: boolean = false;

  constructor() {
    console.log(`🚀 ALua Sentinel v${this.version} - Initializing...`);
    
    this.tfModel = new TFModel();
    this.textDetector = new TextDetector();
    this.imageDetector = new ImageDetector();
    
    this.initialize().then(() => {
      console.log(`✅ ALua Sentinel v${this.version} initialized`);
    }).catch(error => {
      console.warn('⚠️ Initialization completed with fallback mode');
    });
  }

  private async initialize(): Promise<void> {
    try {
      await this.tfModel.initialize();
      this.isInitialized = true;
    } catch (error) {
      console.warn('⚠️ TensorFlow initialization skipped');
      this.isInitialized = false;
    }
  }

  public async analyzeText(content: string): Promise<any> {
    if (!content || content.trim().length < 10) {
      throw new Error('Content must be at least 10 characters long');
    }

    const analysis = await this.textDetector.analyzeText(content);
    
    return {
      integrityScore: analysis.isAIGenerated ? 
        Math.max(0.1, 0.5 - (analysis.confidence / 2)) : 
        Math.min(0.99, 0.5 + (analysis.confidence / 2)),
      isAIGenerated: analysis.isAIGenerated,
      confidence: analysis.confidence,
      reasons: analysis.reasons.slice(0, 10),
      tfScore: analysis.tfScore,
      metadata: {
        ...analysis.metadata,
        textLength: content.length,
        wordCount: content.split(/\s+/).length,
        processingTime: new Date().toISOString()
      },
      timestamp: new Date().toISOString(),
      version: this.version,
      engine: this.isInitialized ? 'Advanced AI Detection Suite' : 'Enhanced Statistical Analysis'
    };
  }

  public async analyzeImage(imageData: any): Promise<any> {
    const analysis = this.imageDetector.analyzeImage(imageData);
    
    return {
      integrityScore: analysis.isAIGenerated ? 0.3 : 0.90,
      isAIGenerated: analysis.isAIGenerated,
      confidence: analysis.confidence,
      metrics: analysis.metrics,
      timestamp: new Date().toISOString(),
      version: this.version,
      engine: 'Image Forensic Analysis'
    };
  }

  public async analyzeBatch(texts: string[]): Promise<any[]> {
    const results = [];
    for (const text of texts) {
      if (text && text.trim().length >= 10) {
        try {
          const result = await this.analyzeText(text);
          results.push(result);
        } catch (error) {
          results.push({
            error: 'Analysis failed',
            text: text.substring(0, 50) + '...',
            timestamp: new Date().toISOString()
          });
        }
      }
    }
    return results;
  }

  public generateIntegrityCertificate(results: any): string {
    return `📜 ALua Integrity Certificate
✅ Score: ${(results.integrityScore * 100).toFixed(1)}%
🤖 AI Generated: ${results.isAIGenerated ? 'Yes' : 'No'}
🎯 Confidence: ${(results.confidence * 100).toFixed(1)}%
📅 Date: ${results.timestamp}
🔖 Version: ${results.version}`;
  }

  public getVersion(): string {
    return this.version;
  }

  public getStatus(): { initialized: boolean; features: string[] } {
    return {
      initialized: this.isInitialized,
      features: [
        'Advanced Pattern Recognition',
        'Statistical Text Analysis', 
        ...(this.isInitialized ? ['TensorFlow.js AI Detection'] : ['Enhanced Fallback Mode']),
        'Real-time Processing',
        'Multi-layer Verification'
      ]
    };
  }

  public async getSystemInfo(): Promise<any> {
    return {
      version: this.version,
      status: this.getStatus(),
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform
    };
  }
}

interface TextAnalysisResult {
  integrityScore: number;
  isAIGenerated: boolean;
  confidence: number;
  reasons: string[];
  tfScore?: number;
  metadata: any;
  timestamp: string;
  version: string;
  engine: string;
}

interface ImageAnalysisResult {
  integrityScore: number;
  isAIGenerated: boolean;
  confidence: number;
  metrics: any;
  timestamp: string;
  version: string;
  engine: string;
}

interface SystemStatus {
  initialized: boolean;
  features: string[];
}

export { ALuaSentinel };
export default ALuaSentinel;
export { TextDetector } from './detectors/text-detector';
export { ImageDetector } from './detectors/image-detector';
export { TFModel } from './ml/tf-model';