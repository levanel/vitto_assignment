import React, { useState } from 'react';
import UserForm from './components/UserForm';
import { getDatabase, ref, push } from 'firebase/database';
import { database } from './firebase.js';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import * as tf from '@tensorflow/tfjs';
import './style';

const dataRef = ref(database, '/newUsers');

const translations = {
  en: {
    recommendationHeading: 'Recommendations',
    startupRecommendation:
      'We recommend exploring startup or tech-related financial products.',
    traditionalRecommendation:
      'Consider traditional small business loans or agricultural loans.',
    specialForWomen:
      ' Additionally, we have special financial services for women.',
  },
  es: {
    recommendationHeading: 'Recomendaciones',
    startupRecommendation:
      'Recomendamos explorar productos financieros relacionados con startups o tecnología.',
    traditionalRecommendation:
      'Considere préstamos tradicionales para pequeñas empresas o préstamos agrícolas.',
    specialForWomen:
      ' Además, tenemos servicios financieros especiales para mujeres.',
  },
  fr: {
    recommendationHeading: 'Recommandations',
    startupRecommendation:
      'Nous recommandons d’explorer des produits financiers liés aux startups ou à la technologie.',
    traditionalRecommendation:
      'Envisagez des prêts commerciaux traditionnels ou des prêts agricoles.',
    specialForWomen:
      ' De plus, nous avons des services financiers spéciaux pour les femmes.',
  },
};

const App = () => {
  const [openPopup, setOpenPopup] = useState(true);
  const [recommendation, setRecommendation] = useState('');

  const handleFormSubmit = (formData) => {
    push(dataRef, formData)
      .then(() => {
        console.log('Data pushed successfully!');
        setOpenPopup(false);
        generateRecommendation(formData);
      })
      .catch((error) => {
        console.error('Error pushing data: ', error);
      });
    console.log('Form Data Submitted:', formData);
  };

  const generateRecommendation = async (formData) => {
    try {
      console.log('Loading model...');
      const model = await use.load();
      console.log('Model loaded successfully.');

      // Combine relevant form data for embeddings
      const sentences = [
        formData.businessType,
        formData.location,
        formData.language,
      ];
      console.log('Form data for embedding:', sentences);

      const embeddings = await model.embed(sentences);
      const embeddingsArray = embeddings.arraySync();

      const avgEmbeddingValue =
        embeddingsArray.flat().reduce((a, b) => a + b, 0) /
        embeddingsArray.flat().length;
      let recommendationText;

      const selectedLanguage = formData.language || 'en';
      const languageTexts =
        translations[selectedLanguage] || translations['en'];

      if (avgEmbeddingValue > 0.2) {
        recommendationText = languageTexts.startupRecommendation;
      } else {
        recommendationText = languageTexts.traditionalRecommendation;
      }

      if (formData.gender === 'Female') {
        recommendationText += languageTexts.specialForWomen;
      }

      setRecommendation(recommendationText);
    } catch (error) {
      console.error('Error generating recommendation:', error);
      setRecommendation(
        'Error in generating recommendation. Please try again.'
      );
    }
  };

  return (
    <div>
      {openPopup && <UserForm onSubmit={handleFormSubmit} />}
      {!openPopup && (
        <div>
          <h2>
            Wait A Bit for the Recommendation to Appear
            {recommendation ? translations['en'].recommendationHeading : ''}
          </h2>
          <pre>{recommendation}</pre>
        </div>
      )}
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          width: '300px',
          height: '400px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/qEkd1fenibQ_Bd7faBSHn"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Chatbot"
        ></iframe>
      </div>
    </div>
  );
};

export default App;
