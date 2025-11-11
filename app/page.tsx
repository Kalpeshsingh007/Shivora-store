"use client"

import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)

  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(bannerInterval)
  }, [])

  const categories = [
    { id: "night-pants", label: "Night Pants", icon: "🌙" },
    { id: "t-shirts", label: "T-Shirts", icon: "👕" },
    { id: "jackets", label: "Jackets", icon: "🧥" },
    { id: "track-pants", label: "Track Pants", icon: "🏃" },
    { id: "hoodies", label: "Hoodies", icon: "🎽" },
    { id: "shorts", label: "Shorts", icon: "🩳" },
  ]

  const banners = [
    {
      title: "Summer Collection",
      subtitle: "Get 40% off on all new arrivals",
      bg: "from-orange-500 to-red-600",
      textColor: "text-white",
    },
    {
      title: "Premium Hoodies",
      subtitle: "Comfort meets style - Shop now",
      bg: "from-purple-600 to-indigo-700",
      textColor: "text-white",
    },
    {
      title: "Weekend Specials",
      subtitle: "Limited time offers on selected items",
      bg: "from-blue-600 to-cyan-600",
      textColor: "text-white",
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleBannerNext = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length)
  }

  const handleBannerPrev = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="relative h-96 md:h-96 overflow-hidden">
        <div className="absolute inset-0 flex transition-opacity duration-1000">
          {banners.map((banner, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full bg-gradient-to-r ${banner.bg} transition-opacity duration-1000 ${
                idx === currentBannerIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="h-full flex items-center justify-center">
                <div className="text-center px-4">
                  <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${banner.textColor}`}>{banner.title}</h1>
                  <p className={`text-lg md:text-xl mb-6 ${banner.textColor} opacity-90`}>{banner.subtitle}</p>
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold shadow-xl">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Controls */}
        <button
          onClick={handleBannerPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur transition"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button
          onClick={handleBannerNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur transition"
        >
          <ChevronRight size={24} className="text-white" />
        </button>

        {/* Banner Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBannerIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentBannerIndex ? "bg-white w-8" : "bg-white/50 w-2"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-slate-800/50 border-b border-slate-700 py-8 sticky top-16 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-2 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="rounded-full whitespace-nowrap bg-slate-600 hover:bg-slate-500 border-0"
            >
              All Products
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full whitespace-nowrap bg-slate-700 hover:bg-slate-600 border-0"
              >
                {category.icon} {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-slate-400 mb-4">No products found matching your search.</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory(null)
                }}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
