function buildPrompt({ niche, tone, duration, quantity }) {
  return `
    Generate ${quantity} TikTok video ideas for the "${niche}" niche.
    Tone: ${tone}.
    Video duration: ${duration} seconds.

    Return a JSON object with this exact structure, and nothing else:
    {
      "sessionName": "a short 2-4 word name describing this session (e.g. 'Fitness Motivation', 'Budget Cooking Tips')",
      "ideas": [
        {
          "title": "short title of the idea",
          "hook": "opening line to grab attention in the first 3 seconds",
          "structure": "brief description of the video narrative",
          "cta": "call to action at the end of the video"
        }
      ]
    }

    Return only the JSON object, no extra text.
  `
}

module.exports = { buildPrompt }