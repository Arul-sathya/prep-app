export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { topic } = req.body
  if (!topic?.trim()) return res.status(400).json({ error: 'Topic required' })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' })

  const sys = `You are an expert ML engineer interview coach. Generate a study topic card.
Return ONLY valid JSON (no markdown, no backticks) exactly like:
{"title":"Topic Title","tag":"CATEGORY","color":"#hex","sub":"sub1 · sub2 · sub3",
"sections":[{"label":"Overview","text":"2-3 sentences."},{"label":"Key Concepts","text":"Key points."}],
"qa":[{"q":"Q1?","a":"Answer."},{"q":"Q2?","a":"Answer."},{"q":"Q3?","a":"Answer."},{"q":"Q4?","a":"Answer."},{"q":"Q5?","a":"Answer."}],
"chips":["chip1","chip2","chip3"]}
Colors: #4ade80 #818cf8 #fb923c #c084fc #f87171 #22d3ee #facc15 #fb7185 #2dd4bf #38bdf8 #a78bfa #60a5fa
Make answers thorough and practical for ML engineer interviews.`

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: sys,
        messages: [{ role: 'user', content: `Topic: ${topic.trim()}` }],
      }),
    })
    const data = await r.json()
    if (data.error) throw new Error(data.error.message)
    const parsed = JSON.parse(data.content[0].text.trim())
    parsed.id = 'ai-' + Date.now()
    parsed.cat = 'c-mcp'
    res.status(200).json(parsed)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to generate. Try again.' })
  }
}
