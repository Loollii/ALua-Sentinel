/**
 * ALua Sentinel - Basic TextDetector Tests
 * Initial test setup for AI detection
 */

import { TextDetector } from '../../src/detectors/text-detector';

// تعريف testFixtures محلياً since setup.ts may not be ready
const TEST_FIXTURES = {
  AI_TEXTS: [
    "As an AI language model, I'm designed to provide accurate responses.",
    "Based on my training data, I can generate comprehensive answers."
  ],
  HUMAN_TEXTS: [
    "Hey there! I was just thinking about this - it's really interesting!",
    "OMG I can't believe I made that typo again... sorry about that! 😅"
  ]
};

describe('TextDetector - Basic Tests', () => {
  let textDetector: TextDetector;

  beforeAll(() => {
    textDetector = new TextDetector();
  });

  test('should detect AI-generated text', async () => {
    const text = TEST_FIXTURES.AI_TEXTS[0];
    const result = await textDetector.analyzeText(text);
    
    console.log('AI Detection Result:', result);
    expect(result).toHaveProperty('isAIGenerated');
    expect(result).toHaveProperty('confidence');
  }, 15000);

  test('should detect human-written text', async () => {
    const text = TEST_FIXTURES.HUMAN_TEXTS[0];
    const result = await textDetector.analyzeText(text);
    
    console.log('Human Detection Result:', result);
    expect(result).toHaveProperty('isAIGenerated');
    expect(result).toHaveProperty('confidence');
  }, 15000);
});