require('dotenv').config();

exports.handler = async (event) => {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error.' }),
    };
  }

  const url = `https://duck-api.netlify.app/api/facts/random`;

  try {
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        'X-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Proxy request failed.' }),
    };
  }
};
