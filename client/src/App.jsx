import { useState, useEffect } from 'react'
import './App.css'

const THEME_KEY = 'oopsai-theme'

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY)
  return saved === 'dark' ? 'dark' : 'light'
}

const TONES = [
  { id: 'casual', label: 'Casual', emoji: '😊' },
  { id: 'formal', label: 'Formal', emoji: '👔' },
  { id: 'humorous', label: 'Humorous', emoji: '😂' },
  { id: 'creative', label: 'Creative', emoji: '✨' },
]

const API_BASE = import.meta.env.VITE_API_URL || ''

const QUICK_SCENARIOS = [
  'Missed a work meeting',
  'Late to school',
  'Forgot a deadline',
  'Skipped the gym',
  'Missed a call',
  'Couldn\'t finish homework',
]

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [scenario, setScenario] = useState('')
  const [tone, setTone] = useState('casual')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  const [count, setCount] = useState(3)
  const [excuses, setExcuses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(null)

  const generateExcuses = async () => {
    if (!scenario.trim()) {
      setError('Please enter a scenario')
      return
    }
    setError('')
    setExcuses([])
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/api/generate-excuses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: scenario.trim(), tone, count }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Failed to generate')
      setExcuses(data.excuses || [])
    } catch (err) {
      setError(err.message)
      setExcuses([])
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(index)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      setCopied(null)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-top">
          <h1>OopsAI</h1>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <p>Ultimate Excuse Generator</p>
      </header>

      <main className="main">
        <section className="input-section">
          <label htmlFor="scenario">What happened?</label>
          <textarea
            id="scenario"
            placeholder="e.g., Missed a work meeting, Late to class..."
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            rows={2}
          />

          <div className="quick-scenarios">
            <span>Quick pick:</span>
            {QUICK_SCENARIOS.map((s) => (
              <button
                key={s}
                type="button"
                className="chip"
                onClick={() => setScenario(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="options">
            <div className="option-group">
              <label>Tone</label>
              <div className="tone-buttons">
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`tone-btn ${tone === t.id ? 'active' : ''}`}
                    onClick={() => setTone(t.id)}
                  >
                    <span className="emoji">{t.emoji}</span>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>Number of excuses</label>
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {error && <p className="error">{error}</p>}

          <button
            type="button"
            className="generate-btn"
            onClick={generateExcuses}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Excuses'}
          </button>
        </section>

        <section className="results-section">
          {excuses.length > 0 && (
            <h2>Your excuses</h2>
          )}
          <div className="excuse-list">
            {excuses.map((excuse, i) => (
              <div key={i} className="excuse-card">
                <p>{excuse}</p>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => copyToClipboard(excuse, i)}
                  title="Copy"
                >
                  {copied === i ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
