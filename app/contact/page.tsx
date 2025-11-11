"use client"

import type React from "react"

import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center hover:border-orange-500 transition">
              <Mail className="w-8 h-8 mx-auto mb-3 text-orange-500" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-slate-400 text-sm">contact@shivorastore.com</p>
              <p className="text-slate-400 text-sm">contact@shivorastore.com</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center hover:border-orange-500 transition">
              <Phone className="w-8 h-8 mx-auto mb-3 text-orange-500" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-slate-400 text-sm">+91 7408975611</p>
              <p className="text-slate-400 text-sm">+91 7408975611</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center hover:border-orange-500 transition">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-orange-500" />
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-slate-400 text-sm">lalpur Nigohan Raebareli Road opposite BSNL Double Tower</p>
              <p className="text-slate-400 text-sm">Lucknow, UP 226302</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center hover:border-orange-500 transition">
              <Clock className="w-8 h-8 mx-auto mb-3 text-orange-500" />
              <h3 className="font-semibold mb-2">Hours</h3>
              <p className="text-slate-400 text-sm">Mon - Fri: 9 AM - 6 PM</p>
              <p className="text-slate-400 text-sm">Sat - Sun: 10 AM - 4 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-800/50 border-y border-slate-700">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your message here..."
                className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg p-3 focus:outline-none focus:border-orange-500"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:opacity-90 text-white"
            >
              {submitted ? "Message Sent Successfully!" : "Send Message"}
            </Button>

            {submitted && (
              <div className="mt-4 bg-green-900/30 border border-green-700 rounded-lg p-4 text-center text-green-300">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "What is the delivery time?",
                a: "We typically deliver within 5-7 business days. Premium shipping is available for faster delivery.",
              },
              {
                q: "Can I return products?",
                a: "Yes, we offer 30-day returns on all items. Products must be unworn and in original packaging.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept Credit/Debit Cards, UPI, Online Banking, and Cash on Delivery.",
              },
              {
                q: "How can I track my order?",
                a: "You can track your order in real-time from your dashboard after placing the order.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-orange-500 transition"
              >
                <h3 className="font-semibold mb-2 text-orange-400">{faq.q}</h3>
                <p className="text-slate-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
