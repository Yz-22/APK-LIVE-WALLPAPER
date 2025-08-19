"use client"

import { useState, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Box, Plane } from "@react-three/drei"
import { Move, RotateCcw, Save, Share, Grid3X3, Palette, Home } from "lucide-react"

// 3D Room Component
function Room() {
  return (
    <group>
      {/* Floor */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Plane>

      {/* Walls */}
      <Plane args={[20, 8]} position={[0, 4, -10]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Plane>
      <Plane args={[20, 8]} position={[-10, 4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Plane>
      <Plane args={[20, 8]} position={[10, 4, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Plane>
    </group>
  )
}

// Furniture Component
function Furniture({
  position,
  type,
  color = "#D4AF37",
}: { position: [number, number, number]; type: string; color?: string }) {
  const meshRef = useRef<any>()

  const getFurnitureSize = (type: string): [number, number, number] => {
    switch (type) {
      case "sofa":
        return [3, 1, 1.5]
      case "chair":
        return [1, 1, 1]
      case "table":
        return [2, 0.1, 1]
      case "bed":
        return [2, 0.5, 3]
      default:
        return [1, 1, 1]
    }
  }

  return (
    <Box ref={meshRef} args={getFurnitureSize(type)} position={position}>
      <meshStandardMaterial color={color} />
    </Box>
  )
}

const furnitureTypes = [
  { id: "sofa", name: "Sofa", icon: "🛋️" },
  { id: "chair", name: "Chair", icon: "🪑" },
  { id: "table", name: "Table", icon: "🪑" },
  { id: "bed", name: "Bed", icon: "🛏️" },
]

const colorOptions = [
  { name: "Gold", value: "#D4AF37" },
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Brown", value: "#8B4513" },
  { name: "Gray", value: "#808080" },
]

export default function PlannerPage() {
  const [viewMode, setViewMode] = useState<"2d" | "3d">("3d")
  const [selectedTool, setSelectedTool] = useState<"move" | "rotate" | "add">("add")
  const [selectedFurniture, setSelectedFurniture] = useState("sofa")
  const [selectedColor, setSelectedColor] = useState("#D4AF37")
  const [placedFurniture, setPlacedFurniture] = useState<
    Array<{
      id: string
      type: string
      position: [number, number, number]
      color: string
    }>
  >([])
  const [roomDimensions, setRoomDimensions] = useState({ width: 20, length: 20, height: 8 })

  const addFurniture = () => {
    const newFurniture = {
      id: Date.now().toString(),
      type: selectedFurniture,
      position: [0, 1, 0] as [number, number, number],
      color: selectedColor,
    }
    setPlacedFurniture([...placedFurniture, newFurniture])
  }

  const removeFurniture = (id: string) => {
    setPlacedFurniture(placedFurniture.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen pt-20 bg-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-yellow-400/20">
        <div className="container-custom px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-playfair font-bold">
              3D Interior <span className="text-gradient">Planner</span>
            </h1>
            <div className="flex items-center gap-4">
              <button className="btn-secondary text-sm">
                <Save className="w-4 h-4 mr-2" />
                Save Design
              </button>
              <button className="btn-secondary text-sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </button>
              <div className="flex border border-yellow-400/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("2d")}
                  className={`px-4 py-2 text-sm ${viewMode === "2d" ? "bg-yellow-400 text-black" : "bg-gray-800"}`}
                >
                  2D
                </button>
                <button
                  onClick={() => setViewMode("3d")}
                  className={`px-4 py-2 text-sm ${viewMode === "3d" ? "bg-yellow-400 text-black" : "bg-gray-800"}`}
                >
                  3D
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* Left Sidebar - Tools */}
        <div className="w-80 bg-gray-900 border-r border-yellow-400/20 p-6 overflow-y-auto">
          {/* Room Dimensions */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-yellow-400" />
              Room Dimensions
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Width (ft)</label>
                <input
                  type="number"
                  value={roomDimensions.width}
                  onChange={(e) => setRoomDimensions({ ...roomDimensions, width: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Length (ft)</label>
                <input
                  type="number"
                  value={roomDimensions.length}
                  onChange={(e) => setRoomDimensions({ ...roomDimensions, length: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Height (ft)</label>
                <input
                  type="number"
                  value={roomDimensions.height}
                  onChange={(e) => setRoomDimensions({ ...roomDimensions, height: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Tools</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedTool("move")}
                className={`p-3 rounded-lg border transition-colors ${
                  selectedTool === "move"
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "bg-gray-800 border-gray-700 hover:border-yellow-400"
                }`}
              >
                <Move className="w-5 h-5 mx-auto" />
                <span className="text-xs mt-1 block">Move</span>
              </button>
              <button
                onClick={() => setSelectedTool("rotate")}
                className={`p-3 rounded-lg border transition-colors ${
                  selectedTool === "rotate"
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "bg-gray-800 border-gray-700 hover:border-yellow-400"
                }`}
              >
                <RotateCcw className="w-5 h-5 mx-auto" />
                <span className="text-xs mt-1 block">Rotate</span>
              </button>
              <button
                onClick={() => setSelectedTool("add")}
                className={`p-3 rounded-lg border transition-colors ${
                  selectedTool === "add"
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "bg-gray-800 border-gray-700 hover:border-yellow-400"
                }`}
              >
                <Grid3X3 className="w-5 h-5 mx-auto" />
                <span className="text-xs mt-1 block">Add</span>
              </button>
            </div>
          </div>

          {/* Furniture */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Furniture</h3>
            <div className="grid grid-cols-2 gap-2">
              {furnitureTypes.map((furniture) => (
                <button
                  key={furniture.id}
                  onClick={() => setSelectedFurniture(furniture.id)}
                  className={`p-3 rounded-lg border transition-colors ${
                    selectedFurniture === furniture.id
                      ? "bg-yellow-400 text-black border-yellow-400"
                      : "bg-gray-800 border-gray-700 hover:border-yellow-400"
                  }`}
                >
                  <span className="text-2xl block">{furniture.icon}</span>
                  <span className="text-xs mt-1 block">{furniture.name}</span>
                </button>
              ))}
            </div>
            <button onClick={addFurniture} className="w-full mt-4 btn-primary text-sm">
              Add to Room
            </button>
          </div>

          {/* Colors */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-yellow-400" />
              Colors
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    selectedColor === color.value
                      ? "border-yellow-400 scale-110"
                      : "border-gray-600 hover:border-yellow-400"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Placed Furniture List */}
          <div>
            <h3 className="text-lg font-bold mb-4">Placed Items</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {placedFurniture.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-gray-800 p-2 rounded-lg">
                  <span className="text-sm capitalize">{item.type}</span>
                  <button onClick={() => removeFurniture(item.id)} className="text-red-400 hover:text-red-300 text-xs">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 relative">
          {viewMode === "3d" ? (
            <Canvas camera={{ position: [15, 10, 15], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Room />
              {placedFurniture.map((item) => (
                <Furniture key={item.id} position={item.position} type={item.type} color={item.color} />
              ))}
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Canvas>
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <Grid3X3 className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">2D Floor Plan</h3>
                <p className="text-gray-400">2D view coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
