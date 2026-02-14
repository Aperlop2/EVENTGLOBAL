// server.js o en el archivo de rutas de tu backend
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/api/recommendations', async (req, res) => {
    const { eventDetails } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: `Dame recomendaciones para el siguiente evento: ${eventDetails}`,
            max_tokens: 150,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recommendations from OpenAI:', error);
        res.status(500).send('Error fetching recommendations');
    }
});

module.exports = router;
