function buildPrompt({ niche, tone, duration, quantity }) {
  return `
    Generate ${quantity} TikTok video ideas for the "${niche}" niche.
    Tone: ${tone}.
    Video duration: ${duration} seconds.

    For each idea return a JSON array with this exact structure, and nothing else:
    [
      {
        "title": "short title of the idea",
        "hook": "opening line to grab attention in the first 3 seconds",
        "structure": "brief description of the video narrative",
        "cta": "call to action at the end of the video"
      }
    ]

    Return only the JSON array, no extra text.
  `
}

module.exports = { buildPrompt }