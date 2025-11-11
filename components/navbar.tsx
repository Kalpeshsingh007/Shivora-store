"use client"

import Link from "next/link"
import { useStore } from "@/lib/store"
import { ShoppingCart, User, LogOut, Menu, X, Heart, SearchIcon } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function Navbar() {
  const { user, cart, setUser } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    setUser(null)
    setMobileMenuOpen(false)
  }

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-red-950 via-purple-900 to-purple-950 text-white shadow-2xl border-b border-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <Image src="/mastercard.png" alt="Shivora Logo" width={40} height={40} className="rounded-lg shadow-md" />
            <span className="hidden sm:inline text-2xl font-bold tracking-widest bg-gradient-to-r from-blue-400 to-yellow-500 bg-clip-text text-transparent">
              SHIVORA
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700/50 transition">
              Shop
            </Link>
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700/50 transition">
              New Arrivals
            </Link>
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700/50 transition">
              Sale
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700/50 transition">
              About Us
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700/50 transition"
            >
              Contact Us
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-purple-700/50 rounded-full transition" title="Search">
              <SearchIcon size={20} />
            </button>
            <button className="p-2 hover:bg-purple-700/50 rounded-full transition" title="Wishlist">
              <Heart size={20} />
            </button>
            <Link
              href="/cart"
              className="relative p-2 hover:bg-purple-700/50 rounded-full transition"
              title="Shopping Cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-purple-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/dashboard"
                  className="p-2 hover:bg-purple-700/50 rounded-full transition"
                  title="Dashboard"
                >
                  <User size={20} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-purple-700/50 rounded-full transition"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart" className="relative p-2" title="Shopping Cart">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-purple-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-purple-800/50 border-t border-purple-700">
            <Link href="/" className="block px-3 py-2 rounded-md hover:bg-purple-700/50 transition">
              Shop
            </Link>
            <Link href="/" className="block px-3 py-2 rounded-md hover:bg-purple-700/50 transition">
              New Arrivals
            </Link>
            <Link href="/" className="block px-3 py-2 rounded-md hover:bg-purple-700/50 transition">
              Sale
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-md hover:bg-purple-700/50 transition">
              About Us
            </Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md hover:bg-purple-700/50 transition">
              Contact Us
            </Link>
            <button className="w-full text-left px-3 py-2 rounded-md hover:bg-purple-700/50 transition flex items-center gap-2">
              <Heart size={18} /> Wishlist
            </button>
            {user ? (
              <>
                <Link href="/dashboard" className="block px-3 py-2 rounded-md hover:bg-purple-700/50 transition">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-purple-700/50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-md font-medium hover:opacity-90 transition"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
