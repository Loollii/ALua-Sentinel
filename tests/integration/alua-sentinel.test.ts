import { ALuaSentinel } from '../../src/index';

describe('ALuaSentinel Integration', () => {
  test('basic integration test', async () => {
    const sentinel = new ALuaSentinel();
    await new Promise(resolve => setTimeout(resolve, 3000));
    const result = await sentinel.analyzeText('test text for integration');
    expect(result).toHaveProperty('integrityScore');
  }, 15000);
});