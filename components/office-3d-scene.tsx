"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowLeft, Map, RotateCcw } from "lucide-react"

type Scene = "entrance" | "lobby" | "meetingRoom"

type FloorMapArea = {
  id: string
  label: string
  subtitle: string
  position: { left: string; top: string; width: string; height: string }
  color: string
}

const floorMapAreas: FloorMapArea[] = [
  {
    id: "clouds",
    label: "Clouds",
    subtitle: "Products under development",
    position: { left: "33%", top: "22%", width: "16%", height: "14%" },
    color: "bg-gray-400",
  },
  {
    id: "thunderstorms",
    label: "Thunderstorms",
    subtitle: "Hackathons",
    position: { left: "58%", top: "18%", width: "18%", height: "16%" },
    color: "bg-purple-500",
  },
  {
    id: "wind",
    label: "Wind",
    subtitle: "Event and Outreach",
    position: { left: "8%", top: "42%", width: "18%", height: "14%" },
    color: "bg-teal-400",
  },
  {
    id: "rain",
    label: "Rain",
    subtitle: "Products and Patents",
    position: { left: "52%", top: "42%", width: "16%", height: "18%" },
    color: "bg-blue-400",
  },
  {
    id: "ocean",
    label: "Ocean",
    subtitle: "Collaborations/Various Enablers",
    position: { left: "12%", top: "76%", width: "28%", height: "14%" },
    color: "bg-blue-600",
  },
  {
    id: "groundwater",
    label: "Ground Water",
    subtitle: "Enhancements of Current Products",
    position: { left: "58%", top: "78%", width: "22%", height: "14%" },
    color: "bg-green-600",
  },
]

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

function LobbyMascot() {
  return (
    <div className="absolute bottom-6 right-6 z-20 pointer-events-none">
      <video
        src="/mascot.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="h-48 w-auto drop-shadow-2xl"
      />
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
      className="flex items-center gap-2 text-sm font-medium text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all"
    >
      <Map className="w-4 h-4" />
      Floor Map
    </button>
  )
}

function StartOverButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm font-medium text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all"
    >
      <RotateCcw className="w-4 h-4" />
      Start Over
    </button>
  )
}

function FloorMapOverlay({ 
  onClose, 
  onSunClick, 
  onAreaClick,
  onStartOver,
}: { 
  onClose: () => void; 
  onSunClick: () => void;
  onAreaClick: (area: FloorMapArea) => void;
  onStartOver: () => void;
}) {
  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center z-50 animate-in fade-in duration-300">
      {/* Back Button */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white px-5 py-3 rounded-full font-medium hover:bg-black/80 transition-all hover:scale-105 shadow-lg border border-white/20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Lobby
      </button>

      {/* Start Over Button */}
      <div className="absolute top-6 right-6 z-10">
        <StartOverButton onClick={onStartOver} />
      </div>
      
      {/* Full Page Image Container */}
      <div className="relative w-full h-full">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Watercycle-2mUCL1ASCy0vmhMIRaAtk5fxuLtHwM.jpg"
          alt="AI Garage Showcase - Water Cycle Floor Map"
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />
        
        {/* Clickable Sun Area - positioned over the Sun in the image */}
        <div
          onClick={onSunClick}
          className="absolute cursor-pointer group"
          style={{
            left: "3%",
            top: "12%",
            width: "18%",
            height: "28%",
          }}
        >
          {/* Hover effect */}
          <div className="w-full h-full rounded-full transition-all duration-300 group-hover:bg-yellow-400/20 group-hover:border-2 group-hover:border-yellow-400 group-hover:shadow-lg group-hover:shadow-yellow-400/30" />
          
          {/* Pulsing indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative">
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping absolute inset-0 opacity-75" />
              <div className="w-4 h-4 bg-yellow-400 rounded-full relative z-10" />
            </div>
          </div>
          
          {/* Tooltip */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span className="bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg shadow-lg border border-white/20 text-xs font-medium whitespace-nowrap">
              Click to enter Meeting Room
            </span>
          </div>
        </div>

        {/* Other Clickable Areas */}
        {floorMapAreas.map((area) => (
          <FloorMapHotspot 
            key={area.id} 
            area={area} 
            onClick={() => onAreaClick(area)} 
          />
        ))}
      </div>
    </div>
  )
}

function TextPopup({ area, onClose }: { area: FloorMapArea; onClose: () => void }) {
  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white/95 backdrop-blur-md px-10 py-8 rounded-2xl border border-white/30 shadow-2xl max-w-md mx-4 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{area.label}</h2>
        <p className="text-lg text-gray-700">{area.subtitle}</p>
        <button
          onClick={onClose}
          className="mt-6 w-full px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  )
}

function FloorMapHotspot({ area, onClick }: { area: FloorMapArea; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="absolute cursor-pointer group"
      style={{
        left: area.position.left,
        top: area.position.top,
        width: area.position.width,
        height: area.position.height,
      }}
    >
      {/* Hover effect */}
      <div className={`w-full h-full rounded-lg transition-all duration-300 group-hover:${area.color}/30 group-hover:border-2 group-hover:border-white group-hover:shadow-lg`} />
      
      {/* Pulsing indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative">
          <div className="w-3 h-3 bg-white rounded-full animate-ping absolute inset-0 opacity-75" />
          <div className="w-3 h-3 bg-white rounded-full relative z-10 shadow-lg" />
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <span className="bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg shadow-lg border border-white/20 text-xs font-medium whitespace-nowrap">
          Click to view
        </span>
      </div>
    </div>
  )
}

function PDFViewer({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 bg-black/95 flex flex-col z-[60] animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/50 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">MetaClaw</h2>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-9 h-9 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all hover:scale-105 shadow-lg border border-white/20 text-lg leading-none"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      
      {/* PDF Container */}
      <div className="flex-1 w-full">
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent("https://blobs.vusercontent.net/blob/MetaClaw-cQiycbgP2SVvOaXYlJgvQ6ltt9Ovz1.pdf")}&embedded=true`}
          className="w-full h-full"
          title="MetaClaw PDF"
          allow="autoplay"
        />
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
  const [showPDF, setShowPDF] = useState(false)
  const [activePopup, setActivePopup] = useState<FloorMapArea | null>(null)

  const scene = scenes[currentScene]

  const handleHotspotClick = (hotspotId: string) => {
    if (isTransitioning) return

    // Special case for TV screen in meeting room - show PDF
    if (currentScene === "meetingRoom" && hotspotId === "tv-screen") {
      setShowPDF(true)
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

  const handleGoToEntrance = () => {
    setShowFloorMap(false)
    setShowPDF(false)
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
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-lg">
            AIG Showcase
          </h1>
          <span className="text-sm font-medium text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 w-fit">
            {sceneLabels[currentScene]}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* Floor Map button will be rendered here for lobby and meeting room */}
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

      {/* Mascot in Lobby */}
      {currentScene === "lobby" && <LobbyMascot />}

      {/* Floor Map + Start Over Buttons in Lobby and Meeting Room */}
      {(currentScene === "lobby" || currentScene === "meetingRoom") && !showFloorMap && !showPDF && (
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
          <FloorMapButton onClick={() => setShowFloorMap(true)} />
          <StartOverButton onClick={handleGoToEntrance} />
        </div>
      )}

      {/* Floor Map Overlay */}
      {showFloorMap && !showPDF && (
        <FloorMapOverlay 
          onClose={() => {
            setShowFloorMap(false)
            setIsTransitioning(true)
            setTimeout(() => {
              setCurrentScene("lobby")
              setIsTransitioning(false)
            }, 300)
          }}
          onStartOver={handleGoToEntrance}
          onSunClick={() => {
            setShowFloorMap(false)
            setIsTransitioning(true)
            setTimeout(() => {
              setCurrentScene("meetingRoom")
              setIsTransitioning(false)
            }, 300)
          }}
          onAreaClick={(area) => setActivePopup(area)}
        />
      )}

      {/* Text Popup for Floor Map Areas */}
      {activePopup && (
        <TextPopup area={activePopup} onClose={() => setActivePopup(null)} />
      )}

      {/* PDF Viewer */}
      {showPDF && (
        <PDFViewer 
          onClose={() => setShowPDF(false)} 
        />
      )}

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
