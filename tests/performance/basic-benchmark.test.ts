import { TextDetector } from '../../src/detectors/text-detector';
import { ALuaSentinel } from '../../src/index';

describe('🚀 Performance Benchmark Tests - Basic', () => {
  const textDetector = new TextDetector();
  const sentinel = new ALuaSentinel();
  const testText = "As an AI language model, I provide accurate responses based on extensive training data";

  beforeAll(async () => {
    // انتظار تهيئة TensorFlow
    await new Promise(resolve => setTimeout(resolve, 3000));
  });

  test('should process single request under 100ms', async () => {
    const startTime = Date.now();
    const result = await textDetector.analyzeText(testText);
    const processingTime = Date.now() - startTime;
    
    console.log(`⏱️  Single request processing time: ${processingTime}ms`);
    
    expect(processingTime).toBeLessThan(100);
    expect(result).toHaveProperty('isAIGenerated');
    expect(result).toHaveProperty('confidence');
  }, 10000);

  test('should handle 10 concurrent requests under 500ms', async () => {
    const requests = Array(10).fill(null).map(() => 
      textDetector.analyzeText(testText)
    );
    
    const startTime = Date.now();
    const results = await Promise.all(requests);
    const totalTime = Date.now() - startTime;
    
    console.log(`⏱️  10 concurrent requests time: ${totalTime}ms`);
    console.log(`📊 Average time per request: ${(totalTime / 10)}ms`);
    
    expect(totalTime).toBeLessThan(500);
    expect(results).toHaveLength(10);
    results.forEach(result => {
      expect(result).toHaveProperty('isAIGenerated');
    });
  }, 15000);

  test('should maintain consistent performance under load', async () => {
    const iterations = 5;
    let totalTime = 0;

    for (let i = 0; i < iterations; i++) {
      const startTime = Date.now();
      await textDetector.analyzeText(testText + ` iteration ${i}`);
      totalTime += Date.now() - startTime;
    }

    const averageTime = totalTime / iterations;
    console.log(`📈 Average time over ${iterations} iterations: ${averageTime}ms`);
    
    expect(averageTime).toBeLessThan(120);
  }, 20000);

  test('ALuaSentinel should process requests under 150ms', async () => {
    const startTime = Date.now();
    const result = await sentinel.analyzeText(testText);
    const processingTime = Date.now() - startTime;
    
    console.log(`⏱️  ALuaSentinel processing time: ${processingTime}ms`);
    
    expect(processingTime).toBeLessThan(150);
    expect(result.integrityScore).toBeDefined();
  }, 10000);
});