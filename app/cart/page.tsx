"use client"

import { Footer } from "@/components/footer"
import { useStore } from "@/lib/store"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function CartPage() {
  const { cart, removeFromCart, updateCartItem, user } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const cartItems = cart
    .map((item) => ({
      ...item,
      product: products.find((p) => p.id === item.productId),
    }))
    .filter((item) => item.product)

  const subtotal = cartItems.reduce((sum, item) => sum + item.product!.price * item.quantity, 0)
  const shipping = subtotal > 0 ? (subtotal > 5000 ? 0 : 99) : 0
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <section className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 text-primary hover:underline font-medium">
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>

          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-6">Your cart is empty</p>
              <Link href="/">
                <Button size="lg">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      className="p-6 border-b border-border last:border-b-0 flex gap-4"
                    >
                      <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product!.image || "/placeholder.svg"}
                          alt={item.product!.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <Link
                          href={`/product/${item.productId}`}
                          className="font-semibold text-foreground hover:text-primary transition mb-1 inline-block"
                        >
                          {item.product!.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.color} | Size: {item.size}
                        </p>
                        <p className="text-accent font-semibold">₹{item.product!.price}</p>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-destructive hover:bg-destructive/10 p-2 rounded transition"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="flex items-center border border-border rounded">
                          <button
                            onClick={() => updateCartItem(item.productId, Math.max(1, item.quantity - 1))}
                            className="px-3 py-1 hover:bg-muted"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 border-l border-r border-border">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItem(item.productId, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-muted"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-semibold text-foreground">
                          ₹{(item.product!.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6 pb-6 border-b border-border">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold">{shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (18%)</span>
                      <span className="font-semibold">₹{Math.round(tax).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-6 text-lg font-bold">
                    <span>Total</span>
                    <span className="text-accent">₹{Math.round(total).toLocaleString()}</span>
                  </div>
                  <Button
                    onClick={() => router.push("/checkout")}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Proceed to Checkout
                  </Button>
                  <Link href="/">
                    <Button variant="outline" size="lg" className="w-full mt-3 bg-transparent">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
