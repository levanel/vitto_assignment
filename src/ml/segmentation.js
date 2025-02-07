import * as tf from '@tensorflow/tfjs';

// Sample MSME Data: [Business Size, Revenue, Region Encoding]
const data = tf.tensor2d([
  [1, 50000, 0], // Micro Business
  [2, 120000, 1], // Small Business
  [3, 200000, 2], // Medium Business
]);

const segmentUsers = async (data, numClusters = 3) => {
  const kmeans = tf.kmeans({ k: numClusters });
  const clusters = await kmeans.fit(data);
  return clusters;
};

export default segmentUsers;
