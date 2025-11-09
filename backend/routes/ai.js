import express from 'express';

const router = express.Router();

function stripMarkdown(text) {
  return text
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/^[-*+]\s+/gm, '\n• ')
    .replace(/^\d+\.\s+/gm, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

router.post('/ai-chat', async (req, res) => {
  try {
    const { question } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return res.status(400).json({ 
        error: 'Gemini API key not configured. Please add GEMINI_API_KEY to backend/.env file' 
      });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a Virtual Lab Assistant helping students with science experiments. Give a concise, brief answer to: ${question}`
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ 
        error: `Gemini API Error: ${errorData.error?.message || 'Invalid API key or request failed'}` 
      });
    }

    const data = await response.json();
    let answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!answer) {
      return res.status(500).json({ 
        error: 'Gemini API returned empty response' 
      });
    }

    answer = stripMarkdown(answer);
    res.json({ answer });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      error: `Server error: ${error.message}` 
    });
  }
});

export default router;
