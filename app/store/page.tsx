"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Grid, List, Star, Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

const categories = [
  "All Products",
  "Sofas",
  "Chairs",
  "Dining Sets",
  "Beds",
  "Cabinets",
  "Outdoor Furniture",
  "Office Furniture",
]

const products = [
  {
    id: 1,
    name: "Luxury Velvet Sofa",
    category: "Sofas",
    price: 2499,
    originalPrice: 2999,
    rating: 4.9,
    reviews: 127,
    image: "/luxury-velvet-sofa-gold.png",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 2,
    name: "Modern Dining Set",
    category: "Dining Sets",
    price: 1899,
    rating: 4.8,
    reviews: 89,
    image: "/modern-dining-set.png",
    badge: "New",
    inStock: true,
  },
  {
    id: 3,
    name: "Executive Office Chair",
    category: "Office Furniture",
    price: 899,
    originalPrice: 1199,
    rating: 4.7,
    reviews: 203,
    image: "/luxury-executive-chair.png",
    badge: "Sale",
    inStock: true,
  },
  {
    id: 4,
    name: "King Size Bed Frame",
    category: "Beds",
    price: 1599,
    rating: 4.9,
    reviews: 156,
    image: "/luxury-king-bed.png",
    badge: "Premium",
    inStock: false,
  },
  {
    id: 5,
    name: "Outdoor Lounge Set",
    category: "Outdoor Furniture",
    price: 3299,
    rating: 4.6,
    reviews: 78,
    image: "/outdoor-lounge-set.png",
    inStock: true,
  },
  {
    id: 6,
    name: "Modern Accent Chair",
    category: "Chairs",
    price: 699,
    originalPrice: 899,
    rating: 4.8,
    reviews: 134,
    image: "/modern-accent-chair.png",
    badge: "Sale",
    inStock: true,
  },
]

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const { addToCart } = useCart()

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-gray-900 section-padding py-12">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold mb-4">
            Furniture <span className="text-gradient">Store</span>
          </h1>
          <p className="text-xl text-gray-300">Discover our curated collection of premium furniture pieces</p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-gray-900 rounded-2xl p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? "bg-yellow-400 text-black"
                          : "text-gray-300 hover:text-yellow-400"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-300">Under $500</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-300">$500 - $1000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-300">$1000 - $2000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-300">Over $2000</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
              <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 ${viewMode === "grid" ? "bg-yellow-400 text-black" : "bg-gray-900"}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 ${viewMode === "list" ? "bg-yellow-400 text-black" : "bg-gray-900"}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {sortedProducts.map((product) => (
                <div key={product.id} className={`group ${viewMode === "list" ? "flex gap-6" : ""}`}>
                  <div className="bg-gray-900 border border-yellow-400/20 rounded-2xl overflow-hidden card-hover">
                    <div className={`relative ${viewMode === "list" ? "w-48 h-48" : ""}`}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={300}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "list" ? "w-48 h-48" : "w-full h-48"
                        }`}
                      />
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold">
                          {product.badge}
                        </span>
                      )}
                      <button className="absolute top-3 right-3 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-4 h-4" />
                      </button>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex-1">
                      <div className="text-sm text-yellow-400 mb-2">{product.category}</div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-400"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">({product.reviews})</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-yellow-400">${product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                            })
                          }
                          disabled={!product.inStock}
                          className="p-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
