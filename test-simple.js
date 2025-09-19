// اختبار مبسط بدون Jest
const { TextDetector } = require('./dist/index.js');

async function runSimpleTest() {
  console.log('🚀 Running simple ALua Sentinel test...');
  
  const detector = new TextDetector();
  
  // انتظار تهيئة TensorFlow
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // اختبار نص AI
  const aiText = "As an AI language model, I provide accurate responses";
  const aiResult = await detector.analyzeText(aiText);
  console.log('🤖 AI Text Result:', aiResult);
  
  // اختبار نص بشري
  const humanText = "Hey I think this is really cool stuff! 😊";
  const humanResult = await detector.analyzeText(humanText);
  console.log('👤 Human Text Result:', humanResult);
  
  console.log('✅ Basic test completed successfully!');
}

runSimpleTest().catch(console.error);