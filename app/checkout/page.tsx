"use client"

import type React from "react"

import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from "@/lib/store"
import { products } from "@/lib/products"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft, CreditCard, Smartphone, Banknote, Building2, Truck } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart, addOrder, user } = useStore()
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "banking" | "cash">("card")
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const [upiId, setUpiId] = useState("")
  const [bankingDetails, setBankingDetails] = useState({
    accountNumber: "",
    ifscCode: "",
    accountHolder: "",
  })

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
  const shipping = subtotal > 5000 ? 0 : 99
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  if (!user) {
    return null
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-white">Your cart is empty</h1>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600">Continue Shopping</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.values(formData).every((val) => val)) {
      setStep("payment")
    }
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate based on payment method
    if (paymentMethod === "card" && (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv)) {
      alert("Please fill in all card details")
      return
    }
    if (paymentMethod === "upi" && !upiId) {
      alert("Please enter your UPI ID")
      return
    }
    if (
      paymentMethod === "banking" &&
      (!bankingDetails.accountNumber || !bankingDetails.ifscCode || !bankingDetails.accountHolder)
    ) {
      alert("Please fill in all banking details")
      return
    }

    const order = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user?.id || "guest",
      items: cart,
      totalPrice: total,
      status: "processing" as const,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
    }
    addOrder(order)
    clearCart()
    setStep("confirmation")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 to-slate-900">
      <section className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cart" className="flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium mb-8">
            <ArrowLeft size={20} />
            Back to Cart
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Steps Indicator */}
              <div className="flex gap-4 mb-12">
                {(["shipping", "payment", "confirmation"] as const).map((s, idx) => (
                  <div key={s} className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step === s
                          ? "bg-orange-500 text-white"
                          : idx < (["shipping", "payment", "confirmation"] as const).indexOf(step)
                            ? "bg-green-600 text-white"
                            : "bg-slate-600 text-slate-300"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span className="capitalize font-semibold hidden sm:inline text-white">{s}</span>
                    {idx < 2 && <div className="flex-grow hidden lg:block h-1 bg-slate-700" />}
                  </div>
                ))}
              </div>

              {/* Shipping Form */}
              {step === "shipping" && (
                <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
                  <h2 className="text-2xl font-bold mb-6 text-white">Shipping Information</h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">First Name</label>
                        <Input
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">Last Name</label>
                        <Input
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-300">Email</label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-300">Phone Number</label>
                      <Input
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-300">Address</label>
                      <Input
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">City</label>
                        <Input
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">State</label>
                        <Input
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-300">Zip Code</label>
                      <Input
                        required
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Continue to Payment
                    </Button>
                  </form>
                </div>
              )}

              {step === "payment" && (
                <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
                  <h2 className="text-2xl font-bold mb-6 text-white">Payment Method</h2>

                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 rounded-lg border-2 flex items-center gap-3 transition ${
                        paymentMethod === "card"
                          ? "border-orange-500 bg-slate-700"
                          : "border-slate-600 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <CreditCard size={24} className="text-orange-500" />
                      <div className="text-left">
                        <p className="font-semibold text-white">Credit/Debit Card</p>
                        <p className="text-xs text-slate-400">Visa, Mastercard, etc.</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-4 rounded-lg border-2 flex items-center gap-3 transition ${
                        paymentMethod === "upi"
                          ? "border-orange-500 bg-slate-700"
                          : "border-slate-600 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <Smartphone size={24} className="text-orange-500" />
                      <div className="text-left">
                        <p className="font-semibold text-white">UPI</p>
                        <p className="text-xs text-slate-400">Google Pay, PhonePe, etc.</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("banking")}
                      className={`p-4 rounded-lg border-2 flex items-center gap-3 transition ${
                        paymentMethod === "banking"
                          ? "border-orange-500 bg-slate-700"
                          : "border-slate-600 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <Building2 size={24} className="text-orange-500" />
                      <div className="text-left">
                        <p className="font-semibold text-white">Online Banking</p>
                        <p className="text-xs text-slate-400">Direct bank transfer</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("cash")}
                      className={`p-4 rounded-lg border-2 flex items-center gap-3 transition ${
                        paymentMethod === "cash"
                          ? "border-orange-500 bg-slate-700"
                          : "border-slate-600 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <Banknote size={24} className="text-orange-500" />
                      <div className="text-left">
                        <p className="font-semibold text-white">Cash on Delivery</p>
                        <p className="text-xs text-slate-400">Pay when you receive</p>
                      </div>
                    </button>
                  </div>

                  {/* Payment Details Form */}
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    {paymentMethod === "card" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-slate-300">Card Number</label>
                          <Input
                            required
                            placeholder="1234 5678 9012 3456"
                            value={cardData.cardNumber}
                            onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-slate-300">Expiry Date</label>
                            <Input
                              required
                              placeholder="MM/YY"
                              value={cardData.expiryDate}
                              onChange={(e) => setCardData({ ...cardData, expiryDate: e.target.value })}
                              className="bg-slate-700 border-slate-600 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-slate-300">CVV</label>
                            <Input
                              required
                              placeholder="123"
                              value={cardData.cvv}
                              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                              className="bg-slate-700 border-slate-600 text-white"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {paymentMethod === "upi" && (
                      <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">UPI ID</label>
                        <Input
                          required
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    )}

                    {paymentMethod === "banking" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-slate-300">Account Holder Name</label>
                          <Input
                            required
                            placeholder="John Doe"
                            value={bankingDetails.accountHolder}
                            onChange={(e) => setBankingDetails({ ...bankingDetails, accountHolder: e.target.value })}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-slate-300">Account Number</label>
                          <Input
                            required
                            placeholder="1234567890"
                            value={bankingDetails.accountNumber}
                            onChange={(e) => setBankingDetails({ ...bankingDetails, accountNumber: e.target.value })}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-slate-300">IFSC Code</label>
                          <Input
                            required
                            placeholder="SBIN0001234"
                            value={bankingDetails.ifscCode}
                            onChange={(e) => setBankingDetails({ ...bankingDetails, ifscCode: e.target.value })}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                      </>
                    )}

                    {paymentMethod === "cash" && (
                      <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                        <p className="text-slate-300">
                          <Truck size={18} className="inline mr-2 text-orange-500" />
                          You will pay ₹{Math.round(total).toLocaleString()} when your order is delivered.
                        </p>
                      </div>
                    )}

                    <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Complete Purchase
                    </Button>
                  </form>
                </div>
              )}

              {/* Order Confirmation */}
              {step === "confirmation" && (
                <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 text-center">
                  <div className="mb-6">
                    <div className="text-6xl mb-4 animate-bounce">✓</div>
                    <h2 className="text-3xl font-bold mb-2 text-white">Order Confirmed!</h2>
                    <p className="text-slate-400">Thank you for your purchase. Your order has been received.</p>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-6 mb-6 text-left border border-slate-600">
                    <p className="text-sm text-slate-400 mb-1">Order Number</p>
                    <p className="font-mono text-lg font-bold text-white">
                      #ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </p>
                  </div>
                  <p className="text-sm text-slate-400 mb-6">
                    You will receive an email confirmation shortly. Track your order in your dashboard.
                  </p>
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <Button
                      onClick={() => router.push("/dashboard")}
                      size="lg"
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Go to Dashboard
                    </Button>
                    <Button
                      onClick={() => router.push("/")}
                      variant="outline"
                      size="lg"
                      className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4 text-white">Order Summary</h3>
                <div className="space-y-4 mb-6 pb-6 border-b border-slate-700 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                      <div className="w-16 h-16 bg-slate-700 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.product!.image || "/placeholder.svg"}
                          alt={item.product!.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow text-sm">
                        <p className="font-semibold line-clamp-1 text-white">{item.product!.name}</p>
                        <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                        <p className="font-semibold text-orange-500">
                          ₹{(item.product!.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="text-white">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Shipping</span>
                    <span className="text-white">{shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Tax (18%)</span>
                    <span className="text-white">₹{Math.round(tax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-slate-600 pt-3">
                    <span className="text-white">Total</span>
                    <span className="text-orange-500">₹{Math.round(total).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
