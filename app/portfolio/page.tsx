"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, ArrowRight } from "lucide-react"

const categories = ["All Projects", "Apartments", "Villas", "Hotels"]

const projects = [
  {
    id: 1,
    title: "Modern Penthouse Suite",
    category: "Apartments",
    location: "Manhattan, NY",
    year: "2024",
    image: "/luxury-penthouse.png",
    description:
      "A stunning penthouse transformation featuring contemporary design with gold accents and panoramic city views.",
    area: "3,500 sq ft",
    duration: "6 months",
  },
  {
    id: 2,
    title: "Luxury Villa Renovation",
    category: "Villas",
    location: "Beverly Hills, CA",
    year: "2024",
    image: "/luxury-villa.png",
    description:
      "Complete villa renovation combining classic elegance with modern amenities and custom furniture pieces.",
    area: "8,200 sq ft",
    duration: "12 months",
  },
  {
    id: 3,
    title: "Boutique Hotel Lobby",
    category: "Hotels",
    location: "Miami, FL",
    year: "2023",
    image: "/boutique-hotel-lobby.png",
    description: "Sophisticated hotel lobby design creating an unforgettable first impression for guests.",
    area: "2,800 sq ft",
    duration: "4 months",
  },
  {
    id: 4,
    title: "Contemporary Apartment",
    category: "Apartments",
    location: "Chicago, IL",
    year: "2023",
    image: "/contemporary-apartment.png",
    description: "Sleek and modern apartment design maximizing space and natural light.",
    area: "1,800 sq ft",
    duration: "3 months",
  },
  {
    id: 5,
    title: "Luxury Resort Suite",
    category: "Hotels",
    location: "Aspen, CO",
    year: "2023",
    image: "/luxury-resort-suite.png",
    description: "Mountain resort suite combining rustic charm with modern luxury.",
    area: "1,200 sq ft",
    duration: "5 months",
  },
  {
    id: 6,
    title: "Mediterranean Villa",
    category: "Villas",
    location: "Malibu, CA",
    year: "2022",
    image: "/placeholder.svg?height=400&width=600",
    description: "Coastal villa design inspired by Mediterranean architecture and lifestyle.",
    area: "6,500 sq ft",
    duration: "10 months",
  },
]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Projects")

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "All Projects" || project.category === selectedCategory,
  )

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-gray-900 section-padding py-12">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold mb-4">
            Our <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Explore our collection of exceptional interior design projects that showcase our commitment to luxury,
            innovation, and attention to detail.
          </p>
        </div>
      </div>

      <div className="container-custom section-padding">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-900 text-gray-300 hover:text-yellow-400 border border-yellow-400/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link key={project.id} href={`/portfolio/${project.id}`} className="group cursor-pointer">
              <div className="bg-gray-900 border border-yellow-400/20 rounded-2xl overflow-hidden card-hover">
                <div className="relative h-64">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-400/20 backdrop-blur-sm text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.year}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-400">Area: </span>
                      <span className="text-white">{project.area}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400 group-hover:gap-2 transition-all">
                      <span>View Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
