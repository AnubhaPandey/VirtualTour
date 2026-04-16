"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowLeft, Map } from "lucide-react"

type Scene = "entrance" | "lobby" | "meetingRoom"

interface Hotspot {
  id: string
  x: string
  y: string
  width: string
  height: string
  label?: string
  showLabel?: boolean
}

const scenes: Record<Scene, {
  image: string
  hotspots: Hotspot[]
  nextScene?: Scene
}> = {
  entrance: {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Entrance-wQ8Y95luEXQUV9NSy0g51kHwThb770.webp",
    hotspots: [
      {
        id: "enter-door",
        x: "30%",
        y: "35%",
        width: "40%",
        height: "50%",
      },
    ],
    nextScene: "lobby",
  },
  lobby: {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lobby-5DuGkfVTNKVAt7J0UNPXp3g10sVqaJ.png",
    hotspots: [
      {
        id: "left-door",
        x: "8%",
        y: "30%",
        width: "18%",
        height: "45%",
        label: "Magadh",
        showLabel: true,
      },
      {
        id: "right-door",
        x: "-4%",
        y: "30%",
        width: "18%",
        height: "45%",
        label: "Awadh",
        showLabel: true,
      },
    ],
    nextScene: "meetingRoom",
  },
  meetingRoom: {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MeetingRoom-gQhDHoueug0tM7vXUdmq4nvQ3BJTeV.jpg",
    hotspots: [
      {
        id: "tv-screen",
        x: "8%",
        y: "18%",
        width: "28%",
        height: "32%",
      },
    ],
  },
}

const sceneLabels: Record<Scene, string> = {
  entrance: "Entrance Gate",
  lobby: "Office Lobby",
  meetingRoom: "Meeting Room",
}

function Hotspot({
  hotspot,
  onClick,
  isHovered,
  onHover,
}: {
  hotspot: Hotspot
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
}) {
  return (
    <div
      className="absolute cursor-pointer group"
      style={{
        left: hotspot.x,
        top: hotspot.y,
        width: hotspot.width,
        height: hotspot.height,
      }}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Invisible clickable area with subtle border on hover */}
      <div
        className={cn(
          "w-full h-full rounded-lg transition-all duration-300",
          isHovered
            ? "bg-primary/20 border-2 border-primary shadow-lg shadow-primary/30"
            : "bg-transparent border-2 border-transparent hover:border-primary/50 hover:bg-primary/10"
        )}
      />

      {/* Pulsing indicator - Orange for Mastercard */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative">
          <div className="w-4 h-4 bg-orange-500 rounded-full animate-ping absolute inset-0 opacity-75" />
          <div className="w-4 h-4 bg-orange-500 rounded-full relative z-10" />
        </div>
      </div>

      {/* Label positioned directly above the orange dot */}
      {hotspot.showLabel && hotspot.label && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full pointer-events-none" style={{ marginTop: '-24px' }}>
          <div className="flex flex-col items-center">
            <span className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg border border-white/20 text-sm font-medium whitespace-nowrap">
              {hotspot.label}
            </span>
            <svg
              className="w-5 h-5 text-orange-500 animate-bounce mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Hover tooltip for non-labeled hotspots */}
      {!hotspot.showLabel && isHovered && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
          <span className="bg-card/95 backdrop-blur-sm text-card-foreground px-3 py-1.5 rounded-lg shadow-lg border border-border text-xs font-medium">
            Click to interact
          </span>
        </div>
      )}
    </div>
  )
}

function SuccessOverlay({ onReset }: { onReset: () => void }) {
  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-500">
      <div className="text-center animate-in zoom-in-95 duration-500">
        <div className="relative">
          {/* Celebration particles */}
          <div className="absolute -inset-20 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full animate-float"
                style={{
                  backgroundColor: ["#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7"][i % 5],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${2 + Math.random()}s`,
                }}
              />
            ))}
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
            Well done!!
          </h1>
          <p className="text-xl text-white/80 mb-8">
            You have completed the virtual office tour
          </p>
          <button
            onClick={onReset}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  )
}

function SceneTransition({ isTransitioning }: { isTransitioning: boolean }) {
  if (!isTransitioning) return null

  return (
    <div className="absolute inset-0 bg-black z-40 animate-in fade-in duration-200" />
  )
}

function MastercardLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 131.39 86.9"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="43.45" cy="43.45" r="43.45" fill="#eb001b" />
      <circle cx="87.94" cy="43.45" r="43.45" fill="#f79e1b" />
      <path
        d="M65.7 11.53a43.35 43.35 0 0 0-16.12 33.92 43.35 43.35 0 0 0 16.12 33.92 43.35 43.35 0 0 0 16.11-33.92 43.35 43.35 0 0 0-16.11-33.92z"
        fill="#ff5f00"
      />
    </svg>
  )
}

function WelcomeBanner() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
      {/* Click to Enter text with arrow above the box */}
      <div className="mb-4 flex flex-col items-center">
        <span className="text-white text-lg italic drop-shadow-lg">Click to Enter</span>
        <svg
          className="w-6 h-6 text-white mt-2 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
      <div className="bg-black/60 backdrop-blur-md px-10 py-8 rounded-2xl border border-white/20 shadow-2xl">
        {/* Mastercard Logo */}
        <div className="flex justify-center mb-4">
          <MastercardLogo className="w-20 h-auto" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
          Welcome to
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          AI Garage Mastercard
        </h2>
      </div>
    </div>
  )
}

function LobbyInfoBox() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-full max-w-3xl px-4">
      <div className="bg-black/70 backdrop-blur-md px-8 py-6 rounded-xl border border-white/20 shadow-2xl">
        <p className="text-white text-center text-base md:text-lg leading-relaxed">
          AI Garage leverages and applies Artificial Intelligence at scale within Mastercard and its associated business partners, providing a foundational, competitive advantage for the future.
        </p>
      </div>
    </div>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-8 left-8 z-20 flex items-center gap-2 bg-card/90 backdrop-blur-sm text-card-foreground px-5 py-3 rounded-full font-medium hover:bg-card transition-all hover:scale-105 shadow-lg border border-border"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Lobby
    </button>
  )
}

function FloorMapButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-24 right-8 z-20 flex flex-col items-center gap-2 bg-black/70 backdrop-blur-sm text-white px-4 py-3 rounded-xl font-medium hover:bg-black/80 transition-all hover:scale-105 shadow-lg border border-white/20"
    >
      <Map className="w-8 h-8" />
      <span className="text-xs">Floor Map</span>
    </button>
  )
}

function FloorMapOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/50">
          <h2 className="text-2xl font-bold text-white">AI Garage Showcase - Floor Map</h2>
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-card/90 backdrop-blur-sm text-card-foreground px-5 py-3 rounded-full font-medium hover:bg-card transition-all hover:scale-105 shadow-lg border border-border"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Lobby
          </button>
        </div>
        
        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center p-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Watercycle-2mUCL1ASCy0vmhMIRaAtk5fxuLtHwM.jpg"
            alt="AI Garage Showcase - Water Cycle Floor Map"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            crossOrigin="anonymous"
          />
        </div>
      </div>
    </div>
  )
}

export function Office3DScene() {
  const [currentScene, setCurrentScene] = useState<Scene>("entrance")
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showFloorMap, setShowFloorMap] = useState(false)

  const scene = scenes[currentScene]

  const handleHotspotClick = (hotspotId: string) => {
    if (isTransitioning) return

    // Special case for TV screen in meeting room
    if (currentScene === "meetingRoom" && hotspotId === "tv-screen") {
      setShowSuccess(true)
      return
    }

    // Navigate to next scene
    if (scene.nextScene) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentScene(scene.nextScene!)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const handleBackToLobby = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentScene("lobby")
      setIsTransitioning(false)
    }, 300)
  }

  const handleReset = () => {
    setShowSuccess(false)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentScene("entrance")
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-lg">
            AIG Showcase
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            {sceneLabels[currentScene]}
          </span>
        </div>
      </div>

      {/* Main Scene Image */}
      <div className="absolute inset-0">
        <img
          src={scene.image}
          alt={sceneLabels[currentScene]}
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />

        {/* Hotspots */}
        {scene.hotspots.map((hotspot) => (
          <Hotspot
            key={hotspot.id}
            hotspot={hotspot}
            onClick={() => handleHotspotClick(hotspot.id)}
            isHovered={hoveredHotspot === hotspot.id}
            onHover={(hovered) =>
              setHoveredHotspot(hovered ? hotspot.id : null)
            }
          />
        ))}
      </div>

      {/* Welcome Banner at Entrance */}
      {currentScene === "entrance" && <WelcomeBanner />}

      {/* Info Box at Lobby */}
      {currentScene === "lobby" && <LobbyInfoBox />}

      {/* Floor Map Button in Lobby */}
      {currentScene === "lobby" && !showFloorMap && (
        <FloorMapButton onClick={() => setShowFloorMap(true)} />
      )}

      {/* Floor Map Overlay */}
      {showFloorMap && <FloorMapOverlay onClose={() => setShowFloorMap(false)} />}

      {/* Back Button in Meeting Room */}
      {currentScene === "meetingRoom" && !showSuccess && (
        <BackButton onClick={handleBackToLobby} />
      )}

      {/* Scene Transition Overlay */}
      <SceneTransition isTransitioning={isTransitioning} />

      {/* Success Overlay */}
      {showSuccess && <SuccessOverlay onReset={handleReset} />}


    </div>
  )
}
