import { pipeline } from '@xenova/transformers';

export async function translateText(text, targetLang = 'hi') {
  const translator = await pipeline('translation', 'Xenova/opus-mt-en-hi', {
    quantized: false, // Use WebAssembly instead of worker_threads
  });

  const result = await translator(text);
  return result[0].translation_text;
}
