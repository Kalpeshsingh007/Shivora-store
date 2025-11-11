"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Package, MapPin, Calendar, DollarSign, LogOut } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, orders, setUser } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const handleLogout = () => {
    setUser(null)
    router.push("/")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}!</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="lg"
              className="flex items-center gap-2 bg-transparent"
            >
              <LogOut size={20} />
              Logout
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Orders</p>
                  <p className="text-3xl font-bold mt-2">{orders.length}</p>
                </div>
                <Package size={32} className="text-primary opacity-20" />
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Spent</p>
                  <p className="text-3xl font-bold mt-2">
                    ₹{orders.reduce((sum, order) => sum + order.totalPrice, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign size={32} className="text-accent opacity-20" />
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Delivered</p>
                  <p className="text-3xl font-bold mt-2">{orders.filter((o) => o.status === "delivered").length}</p>
                </div>
                <MapPin size={32} className="text-green-600 opacity-20" />
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Order History</h2>
            {orders.length === 0 ? (
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <Package size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-lg text-muted-foreground mb-6">No orders yet</p>
                <Link href="/">
                  <Button>Start Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Order ID</p>
                        <p className="font-mono text-sm font-bold">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Date</p>
                        <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Total</p>
                        <p className="text-lg font-bold text-accent">
                          ₹{Math.round(order.totalPrice).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Status</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${getStatusColor(
                            order.status,
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-border pt-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        <MapPin size={16} className="inline mr-1" />
                        {order.shippingAddress}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        <Calendar size={16} className="inline mr-1" />
                        Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString("en-IN")}
                      </p>
                      <p className="text-sm font-medium mb-3">
                        Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {order.status !== "delivered" && (
                          <Button variant="outline" size="sm">
                            Track Order
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
