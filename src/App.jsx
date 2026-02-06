import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

function App() {
  const [keyPosition, setKeyPosition] = useState({ x: 50, y: 50 })
  const [attempts, setAttempts] = useState(0)
  const [clickAttempts, setClickAttempts] = useState(0)
  const [caught, setCaught] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const dodgeRadius = attempts > 6 ? 80 : 150

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  useEffect(() => {
    if (caught) return

    const keyElement = document.getElementById('key')
    if (!keyElement) return

    const keyRect = keyElement.getBoundingClientRect()
    const keyCenterX = keyRect.left + keyRect.width / 2
    const keyCenterY = keyRect.top + keyRect.height / 2

    const distance = Math.sqrt(
      Math.pow(mousePos.x - keyCenterX, 2) + Math.pow(mousePos.y - keyCenterY, 2)
    )

    if (distance < dodgeRadius) {
      const angle = Math.atan2(mousePos.y - keyCenterY, mousePos.x - keyCenterX)
      const newX = Math.max(5, Math.min(95, keyPosition.x - Math.cos(angle) * 15))
      const newY = Math.max(5, Math.min(95, keyPosition.y - Math.sin(angle) * 15))
      
      setKeyPosition({ x: newX, y: newY })
      setAttempts(prev => prev + 1)
    }
  }, [mousePos, caught, keyPosition, dodgeRadius])

  const handleKeyCatch = (e) => {
    e.preventDefault()
    
    if (clickAttempts < 6) {
      setClickAttempts(prev => prev + 1)
      
      // Jump to random position with animation
      const newX = Math.random() * 70 + 15
      const newY = Math.random() * 70 + 15
      setKeyPosition({ x: newX, y: newY })
      return
    }
    
    setCaught(true)
    
    // Warm elegant confetti
    const colors = ['#d4a574', '#c9a882', '#b8956f', '#e8d5c4']
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors,
      ticks: 200
    })
    setTimeout(() => {
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 50,
        origin: { x: 0 },
        colors
      })
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 50,
        origin: { x: 1 },
        colors
      })
    }, 200)
  }

  if (caught) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf8f5] via-[#f5f0e8] to-[#ede5db] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
        
        {/* Subtle warm glow effects */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
        
        <div className="w-full max-w-2xl relative z-10">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-6 md:p-16 border border-amber-100/50 animate-scale-in">
            
            {/* Icon with warm gradient */}
            <div className="flex justify-center mb-6 md:mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-300 via-orange-300 to-amber-400 flex items-center justify-center shadow-xl shadow-amber-500/30">
                <span className="text-4xl md:text-5xl">🏡</span>
              </div>
            </div>

            {/* Title - Fixed for mobile */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 text-center mb-3 md:mb-4 tracking-tight animate-slide-up px-2" style={{ animationDelay: '0.2s' }}>
              Congratulations
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-900/80 text-center mb-8 md:mb-12 font-light animate-slide-up px-2" style={{ animationDelay: '0.3s' }}>
              On your beautiful new home
            </p>

            {/* Divider with warm gradient */}
            <div className="w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8 md:mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }} />

            {/* Message */}
            <div className="text-center space-y-3 md:space-y-4 animate-slide-up px-4" style={{ animationDelay: '0.5s' }}>
              <p className="text-amber-900/70 leading-relaxed font-light text-sm sm:text-base md:text-lg">
                May your new home be filled with warmth, joy,
              </p>
              <p className="text-amber-900/70 leading-relaxed font-light text-sm sm:text-base md:text-lg">
                and countless cherished memories.
              </p>
              <p className="text-amber-900/70 leading-relaxed font-light text-sm sm:text-base md:text-lg mt-4 md:mt-6">
                Here's to new beginnings.
              </p>
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12 text-xl md:text-2xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <span className="text-amber-400/60">✦</span>
              <span className="text-orange-400/60">✦</span>
              <span className="text-amber-400/60">✦</span>
            </div>

            {/* Signature */}
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-amber-200/30 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <p className="text-xs sm:text-sm text-amber-900/50 font-light mb-2">With warm regards,</p>
              <p className="text-sm sm:text-base text-amber-900/70 font-medium mb-3">Sourabh</p>
              <div className="flex justify-center gap-4 text-xs sm:text-sm">
                <a 
                  href="https://github.com/SourabhX16" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-700/60 hover:text-amber-700 transition-colors duration-200 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a 
                  href="https://linkedin.com/in/sourabh-patne-2385733a3" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-700/60 hover:text-amber-700 transition-colors duration-200 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f5] via-[#f5f0e8] to-[#ede5db] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      
      {/* Subtle warm glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl animate-subtle-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200/15 rounded-full blur-3xl animate-subtle-float" style={{ animationDelay: '1s' }} />
      
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #8b6f47 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="w-full max-w-2xl text-center relative z-10 px-4">
        
        {/* Header */}
        <div className="mb-12 md:mb-16 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 mb-3 md:mb-4 tracking-tight">
            A Special Message
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-amber-900/70 font-light">
            Tap the key to reveal
          </p>
        </div>

        {/* Key interaction area */}
        <div className="relative h-[350px] sm:h-[400px] md:h-[500px] mb-6 md:mb-8">
          <div
            id="key"
            onClick={handleKeyCatch}
            onTouchStart={handleKeyCatch}
            className="absolute text-6xl md:text-7xl cursor-pointer transition-all duration-300 ease-out select-none hover:scale-110 active:scale-95 animate-gentle-pulse"
            style={{
              left: `${keyPosition.x}%`,
              top: `${keyPosition.y}%`,
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 0 20px rgba(217, 119, 6, 0.3)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))'
            }}
          >
            🔑
          </div>
        </div>

        {/* Feedback message */}
        {clickAttempts > 0 && (
          <p className="text-xs sm:text-sm text-amber-700/80 font-light animate-fade-in">
            {clickAttempts >= 5 ? "One more..." : "Keep trying"}
          </p>
        )}

        {/* Progress indicator with warm gradient */}
        <div className="flex justify-center gap-2 mt-6 md:mt-8 animate-fade-in">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < clickAttempts 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/40' 
                  : 'bg-amber-900/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
