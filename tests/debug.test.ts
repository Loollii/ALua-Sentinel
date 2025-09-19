import { TextDetector } from '../src/detectors/text-detector';

describe('Debug Tests', () => {
  test('basic test should work', async () => {
    const detector = new TextDetector();
    const result = await detector.analyzeText('test');
    expect(result).toHaveProperty('isAIGenerated');
  });
});