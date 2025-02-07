// src/components/LanguageSelector.jsx
import { useState } from 'react';
import { translateText } from '../ml/translation';

const LanguageSelector = ({ onTranslate }) => {
  const [language, setLanguage] = useState('hi');

  const handleTranslate = async () => {
    const translatedText = await translateText('Hello, how are you?', language);
    onTranslate(translatedText);
  };

  return (
    <div>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="hi">Hindi</option>
        <option value="ta">Tamil</option>
        <option value="bn">Bengali</option>
      </select>
      <button onClick={handleTranslate}>Translate</button>
    </div>
  );
};

export default LanguageSelector;
