// src/ml/recommendation.js
import * as tf from '@tensorflow/tfjs';

// Example User Data & Content Features
const userProfile = tf.tensor2d([[2, 120000, 1]]); // Small Business
const contentFeatures = tf.tensor2d([
  [1, 50000, 0], // Micro Business Tips
  [2, 120000, 1], // Small Business Loan Advice
  [3, 200000, 2], // Medium Business Strategies
]);

const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [3], units: 10, activation: 'relu' }));
model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));
model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy' });

export async function recommendContent() {
  await model.fit(contentFeatures, userProfile, { epochs: 10 });
  const predictions = model.predict(userProfile);
  return predictions.arraySync();
}
