import '@tensorflow/tfjs-backend-cpu';
jest.setTimeout(30000);
afterAll(async () => {
  const tf = require('@tensorflow/tfjs');
  tf.disposeVariables();
  await new Promise(resolve => setTimeout(resolve, 500));
});