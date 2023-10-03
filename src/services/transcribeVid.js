const axios = require('axios');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

exports.transcribe = (vidURL) => {

  const url = 'https://api.openai.com/v1/engines/whisper/beta/completions';

  // Define the prompt for the transcription
  const prompt = `Transcribe the following video: ${vidURL}\n\nTranscription:`;

  // Define the parameters for the API request
  const data = {
    prompt: prompt,
    max_tokens: 100,
    temperature: 0.6,
    n: 1,
    stop: null,
  };

  // Send the API request
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  };

  axios.post(url, data, { headers })
    .then((response) => {
      // Get the transcription from the API response
      const transcription = response.data.choices[0].text;
      return transcription;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
