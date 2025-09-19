import { TextDetector } from './detectors/text-detector';
import { ImageDetector } from './detectors/image-detector';
import { TFModel } from './ml/tf-model';

export class ALuaSentinel {
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
      console.log(`✅ ALua Sentinel v${this.version} initialized - الأقوى عالمياً`);
      console.log('🔧 Engine: Pattern Analysis + Statistical Analysis + TensorFlow.js');
    }).catch(error => {
      console.warn('⚠️ Initialization completed with fallback mode');
    });
  }

  private async initialize(): Promise<void> {
    try {
      await this.tfModel.initialize();
      this.isInitialized = true;
    } catch (error) {
      console.warn('⚠️ TensorFlow initialization skipped, using enhanced fallback');
    }
  }

  public async analyzeText(content: string): Promise<any> {
    if (!content || content.trim().length < 10) {
      throw new Error('Text content must be at least 10 characters long');
    }

    const analysis = await this.textDetector.analyzeText(content);
    
    return {
      integrityScore: analysis.isAIGenerated ? 
        Math.max(0.1, 0.5 - (analysis.confidence / 2)) : 
        Math.min(0.99, 0.5 + (analysis.confidence / 2)),
      isAIGenerated: analysis.isAIGenerated,
      confidence: analysis.confidence,
      reasons: analysis.reasons.slice(0, 10), // Limit to top 10 reasons
      tfScore: analysis.tfScore,
      metadata: {
        ...analysis.metadata,
        textLength: content.length,
        wordCount: content.split(/\s+/).length,
        processingTime: new Date().toISOString()
      },
      timestamp: new Date().toISOString(),
      version: this.version,
      engine: this.isInitialized ? 'Advanced AI Detection Suite' : 'Enhanced Fallback Mode',
      model: this.isInitialized ? 'TensorFlow.js + Pattern Recognition' : 'Pattern Recognition Only'
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
      engine: 'Image Forensic Analysis',
      warning: analysis.isAIGenerated ? 
        'Potential AI-generated content detected' : 
        'No signs of AI generation detected'
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
🔖 Version: ${results.version}
⚙️ Engine: ${results.engine}
📅 Date: ${results.timestamp}

📊 RESULTS:
✅ Integrity Score: ${(results.integrityScore * 100).toFixed(1)}%
🤖 AI Generated: ${results.isAIGenerated ? 'YES' : 'NO'} 
🎯 Confidence: ${(results.confidence * 100).toFixed(1)}%
${results.tfScore ? `🧠 TF.js Score: ${(results.tfScore * 100).toFixed(1)}%` : ''}

📈 METADATA:
📝 Text Length: ${results.metadata?.textLength || 'N/A'} characters
🔤 Word Count: ${results.metadata?.wordCount || 'N/A'} words
📋 Patterns Detected: ${results.reasons?.length || 0}

${results.isAIGenerated ? '⚠️ WARNING: Potential AI-generated content' : '✅ VERIFIED: Human-like content'}
${results.integrityScore < 0.3 ? '🚨 HIGH RISK: Low integrity score' : ''}`;
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
        'Multi-layer Verification',
        'Batch Processing',
        'Comprehensive Reporting'
      ]
    };
  }

  public async getSystemInfo(): Promise<any> {
    return {
      version: this.version,
      status: this.getStatus(),
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime()
    };
  }
}

// أمثلة استخدام متقدمة
if (require.main === module) {
  const sentinel = new ALuaSentinel();
  
  // اختبار بعد التهيئة
  setTimeout(async () => {
    console.log('\n🧪 Testing ALua Sentinel Advanced Detection...\n');
    
    // نصوص اختبارية
    const testCases = [
      "As an AI language model, I'm designed to provide helpful and accurate responses based on my training data.",
      "I think this is really interesting! From my experience, people often make typos and use informal language.",
      "The quick brown fox jumps over the lazy dog. This is a simple test sentence.",
      "Based on my analysis of the data patterns and algorithmic processing, I can generate a response."
    ];

    for (let i = 0; i < testCases.length; i++) {
      console.log(`\n--- Test Case ${i + 1} ---`);
      console.log(`📝 Text: "${testCases[i].substring(0, 60)}..."`);
      
      try {
        const results = await sentinel.analyzeText(testCases[i]);
        console.log(sentinel.generateIntegrityCertificate(results));
        
        if (results.reasons && results.reasons.length > 0) {
          console.log('\n🔍 Top Reasons:');
          results.reasons.slice(0, 3).forEach((reason: string, idx: number) => {
            console.log(`  ${idx + 1}. ${reason}`);
          });
        }
      } catch (error) {
        console.error('❌ Analysis error:', error);
      }
      
      console.log('─'.repeat(50));
    }

    // عرض معلومات النظام
    const systemInfo = await sentinel.getSystemInfo();
    console.log('\n🖥️ System Information:');
    console.log(`Node.js: ${systemInfo.nodeVersion}`);
    console.log(`Platform: ${systemInfo.platform}`);
    console.log(`Status: ${systemInfo.status.initialized ? 'FULLY INITIALIZED' : 'FALLBACK MODE'}`);

  }, 2000); // انتظار التهيئة
}

// التصدير للاستخدام كوحدة
export default ALuaSentinel;