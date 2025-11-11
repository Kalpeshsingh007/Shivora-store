"use client"

import { Footer } from "@/components/footer"
import { products } from "@/lib/products"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart, user } = useStore()
  const product = products.find((p) => p.id === params.id)

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "")
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "")
  const [addedToCart, setAddedToCart] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0) // Added image carousel state

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Link href="/" className="text-primary hover:underline">
              Back to shop
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!user) {
      router.push("/login")
      return
    }
    addToCart({
      productId: product.id,
      quantity,
      size: selectedSize,
      color: selectedColor,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/" className="hover:text-foreground">
            Shop
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <section className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="bg-muted rounded-lg overflow-hidden h-96 relative mb-4">
                <img
                  src={product.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${product.name} - View ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                        currentImageIndex === index ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col justify-start">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {product.category.replace("-", " ")}
              </p>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.rating} rating)</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-accent mb-6">₹{product.price}</div>

              {/* Description */}
              <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Size</label>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium transition ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">Color</label>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg font-medium transition ${
                        selectedColor === color
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted transition"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-l border-r border-border">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-muted transition">
                    +
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-grow flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
                >
                  <ShoppingCart size={20} />
                  {addedToCart ? "Added to Cart!" : "Add to Cart"}
                </Button>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="w-full flex items-center justify-center gap-2 bg-transparent"
              >
                <Heart size={20} />
                Add to Wishlist
              </Button>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border">
              <h2 className="text-2xl font-bold mb-8">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/product/${related.id}`}
                    className="group overflow-hidden rounded-lg bg-card hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img
                        src={related.images[0] || "/placeholder.svg"}
                        alt={related.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{related.name}</h3>
                      <p className="text-accent font-semibold">₹{related.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
