"use client"

import type { Product } from "@/lib/types"
import Link from "next/link"
import { Star } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="group overflow-hidden rounded-lg bg-card hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative h-64 overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
            ₹{product.price}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            {product.category.replace("-", " ")}
          </p>
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">{product.description}</p>
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
