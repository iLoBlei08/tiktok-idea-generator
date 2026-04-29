const express = require('express')
const router = express.Router()
const Groq = require('groq-sdk')
const { buildPrompt } = require('../prompts/builder')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

router.post('/generate', async (req, res) => {
  const { niche, tone, duration, quantity } = req.body

  if (!niche || !tone || !duration || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const prompt = buildPrompt({ niche, tone, duration, quantity })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
    })

    const text = completion.choices[0].message.content
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    res.json({ ideas: parsed.ideas, sessionName: parsed.sessionName })

  } catch (error) {
    console.error('Groq error:', error)
    res.status(500).json({ error: 'Failed to generate ideas' })
  }
})

module.exports = router