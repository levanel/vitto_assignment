// src/components/Recommendations.jsx
import { useEffect, useState } from 'react';
import { recommendContent } from '../ml/recommendation';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function fetchRecommendations() {
      const data = await recommendContent();
      setRecommendations(data);
    }
    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2>Recommended for You</h2>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>Business Tip {index + 1}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
