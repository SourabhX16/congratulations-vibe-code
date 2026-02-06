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

  const handleKeyCatch = () => {
    if (clickAttempts < 4) {
      setClickAttempts(prev => prev + 1)
      const newX = Math.random() * 80 + 10
      const newY = Math.random() * 80 + 10
      setKeyPosition({ x: newX, y: newY })
      return
    }
    
    setCaught(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      })
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      })
    }, 250)
  }

  if (caught) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl text-center transform animate-[fadeIn_0.5s_ease-in]">
          <div className="text-7xl mb-6">🏡🎉</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Congratulations!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-6">
            On Your Beautiful New Home!
          </p>
          <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl p-6 mb-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              May your new home be filled with love, laughter, and countless happy memories. 
              Here's to new beginnings and wonderful adventures ahead! 🌟
            </p>
          </div>
          <div className="text-6xl">🔑✨🏠💫</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="text-center mb-8 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          🎁 You've Got a Surprise!
        </h1>
        <p className="text-xl text-gray-600">
          Catch the key to unlock your special message! 🔑
        </p>
        {clickAttempts > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            {clickAttempts >= 3 ? "Almost there! One more try! 😉" : `Oops! Try again! (${clickAttempts}/4)`}
          </p>
        )}
      </div>

      <div className="relative w-full h-96 md:h-[500px] touch-none">
        <div
          id="key"
          onClick={handleKeyCatch}
          onTouchEnd={handleKeyCatch}
          className="absolute text-6xl cursor-pointer transition-all duration-300 hover:scale-110 select-none active:scale-125"
          style={{
            left: `${keyPosition.x}%`,
            top: `${keyPosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          🔑
        </div>
      </div>
    </div>
  )
}

export default App
