import { useEffect, useState } from 'react'
import { getRandomTip } from '../../data/tips'

const DISPLAY_MS    = 2800   // how long the tip stays visible
const FADE_OUT_MS   = 600    // fade-out duration (matches CSS)
const SESSION_KEY   = 'dhorllar_tip_shown'

interface Props {
  onDone: () => void
}

export default function TipsLoader({ onDone }: Props) {
  const [tip]       = useState(getRandomTip)
  const [visible,   setVisible]   = useState(true)   // controls fade-in
  const [exiting,   setExiting]   = useState(false)  // triggers fade-out class
  const [progress,  setProgress]  = useState(0)

  /* Fade in on mount */
  useEffect(() => {
    const fadeIn = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(fadeIn)
  }, [])

  /* Progress bar */
  useEffect(() => {
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const elapsed = now - start
      setProgress(Math.min((elapsed / DISPLAY_MS) * 100, 100))
      if (elapsed < DISPLAY_MS) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  /* Trigger exit after display duration */
  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true)
      setTimeout(onDone, FADE_OUT_MS)
    }, DISPLAY_MS)

    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div
      className={`tips-loader-overlay ${visible ? 'tips-loader-visible' : ''} ${exiting ? 'tips-loader-exit' : ''}`}
      aria-live="polite"
      aria-label="Loading tip"
    >
      <div className="tips-loader-inner">

        {/* Logo / branding mark */}
        <div className="tips-loader-logo">
          <span style={{ color: 'var(--accent-cyan)' }}>dhorllar</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>98</span>
          <span style={{ color: 'var(--accent-violet)' }}>.com</span>
        </div>

        {/* Category badge */}
        <span className="tips-loader-badge">
          {tip.category}
        </span>

        {/* Tip text */}
        <p className="tips-loader-tip">
          {tip.tip}
        </p>

        {/* Code snippet */}
        {tip.code && (
          <pre className="tips-loader-code">
            <code>{tip.code}</code>
          </pre>
        )}

      </div>

      {/* Progress bar */}
      <div className="tips-loader-progress-track">
        <div
          className="tips-loader-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

/**
 * Returns true if the loader should show (once per browser session).
 * Set skipInDev=true to suppress during hot-reload development.
 */
export function shouldShowTip(): boolean {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return false
    sessionStorage.setItem(SESSION_KEY, '1')
    return true
  } catch {
    return false
  }
}
