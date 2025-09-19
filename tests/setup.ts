/**
 * ALua Sentinel - Test Setup File
 * Global test configuration and utilities for world-class testing
 */

import '@tensorflow/tfjs-backend-cpu';

// Global test timeout
jest.setTimeout(30000);

// Global test fixtures
const TEST_FIXTURES = {
  // AI-generated text samples
  AI_TEXTS: [
    "As an AI language model, I'm designed to provide accurate and helpful responses based on my training data.",
    "Based on my analysis of the input pattern, I can generate a comprehensive response to your query.",
    "The algorithm processes the input data through multiple neural network layers to produce this output.",
    "This response is generated using advanced natural language processing techniques and machine learning models."
  ],
  
  // Human-written text samples  
  HUMAN_TEXTS: [
    "Hey there! I was just thinking about this yesterday - it's really interesting stuff!",
    "OMG I can't believe I made that typo again... sorry about that! 😅",
    "From my personal experience, I've found that this approach works best in most situations.",
    "I think we should consider different perspectives on this matter before deciding."
  ],
  
  // Mixed texts for complex testing
  MIXED_TEXTS: [
    "The AI system analyzed the data and I personally think the results are accurate.",
    "As a machine learning model, I provide insights but humans should make final decisions.",
    "This is my opinion based on years of experience: technology should assist, not replace."
  ]
};

// Global test utilities
global.testFixtures = TEST_FIXTURES;

// Custom matchers for AI detection tests
expect.extend({
  toBeAIGenerated(received: any, expectedScore: number = 0.6) {
    const pass = received.isAIGenerated === true && received.confidence >= expectedScore;
    return {
      pass,
      message: () => 
        pass 
          ? `Expected text not to be AI-generated with confidence >= ${expectedScore}`
          : `Expected AI-generated text with confidence >= ${expectedScore}, but got ${JSON.stringify(received)}`
    };
  },
  
  toBeHumanGenerated(received: any, expectedScore: number = 0.6) {
    const pass = received.isAIGenerated === false && received.confidence >= expectedScore;
    return {
      pass,
      message: () =>
        pass
          ? `Expected text not to be human-generated with confidence >= ${expectedScore}`
          : `Expected human-generated text with confidence >= ${expectedScore}, but got ${JSON.stringify(received)}`
    };
  }
});

// Global teardown
afterAll(async () => {
  // Cleanup TensorFlow memory
  const tf = require('@tensorflow/tfjs');
  tf.disposeVariables();
});