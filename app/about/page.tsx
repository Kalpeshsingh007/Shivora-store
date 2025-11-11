"use client"

import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Award, Zap, Heart, MapPin, Users, Shirt } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/luxury-fabric-textile-manufacturing-background.jpg"
            alt="Luxury fabric background"
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-900/90"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
              About Shivora
            </h1>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-400/20 blur-xl rounded-lg -z-5"></div>
              <p className="text-xl md:text-2xl text-slate-100 font-medium leading-relaxed backdrop-blur-sm">
                Premium quality clothing crafted with passion and precision for discerning customers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-300">
                <p>
                  Shivora was founded in 2015 with a simple vision: to create premium clothing that combines style,
                  comfort, and affordability. What started as a small boutique has grown into a trusted brand serving
                  thousands of customers across India.
                </p>
                <p>
                  Our journey is built on the foundation of quality, innovation, and customer satisfaction. Every piece
                  in our collection is designed with meticulous attention to detail, ensuring that you get the best
                  value for your investment.
                </p>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden border border-purple-500/30">
              <Image
                src="/Visiting.jpeg"
                alt="Shivora clothing craftsmanship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats with Image */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-800/50 border-y border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden border border-purple-500/30 order-last md:order-first">
              <Image src="/garment_manufacturer.webp" alt="Shivora manufacturing" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-slate-900/50 p-6 rounded-lg border border-purple-500/20">
                <Award className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Founded in 2015</h3>
                  <p className="text-slate-400">Starting with a vision to revolutionize affordable premium fashion</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-slate-900/50 p-6 rounded-lg border border-purple-500/20">
                <Users className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">300+ Team Members</h3>
                  <p className="text-slate-400">Dedicated professionals working across multiple units</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-slate-900/50 p-6 rounded-lg border border-purple-500/20">
                <Shirt className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">6 Product Lines</h3>
                  <p className="text-slate-400">Premium night pants, t-shirts, jackets, track pants, hoodies, shorts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Units */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
            Manufacturing Units
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Mumbai Unit", location: "Mumbai, Maharashtra", capacity: "5,000 units/month" },
              { name: "Bangalore Unit", location: "Bangalore, Karnataka", capacity: "4,500 units/month" },
              { name: "Delhi Unit", location: "Delhi, India", capacity: "3,500 units/month" },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-900 to-slate-800 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold text-lg">{unit.name}</h3>
                </div>
                <p className="text-sm text-slate-400 mb-2">{unit.location}</p>
                <p className="text-sm text-purple-400 font-medium">Capacity: {unit.capacity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission with Images */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-800/50 border-y border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="relative overflow-hidden rounded-lg border border-purple-500/30 h-96">
              <Image src="/vision.webp" alt="Vision" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-purple-400" />
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-slate-100">
                  To become the most trusted and preferred clothing brand in India by delivering exceptional quality,
                  innovative designs, and unparalleled customer service.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="relative overflow-hidden rounded-lg border border-purple-500/30 h-96">
              <Image src="/mission.webp" alt="Mission" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-purple-400" />
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-slate-100">
                  To craft premium quality clothing that empowers individuals. We're committed to sustainable
                  manufacturing and ethical labor standards for all stakeholders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
            Our Product Range
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {["Night Pants", "T-Shirts", "Jackets", "Track Pants", "Hoodies", "Shorts"].map((product, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-900 to-slate-800 border border-purple-500/30 rounded-lg p-6 text-center hover:border-purple-500 transition hover:shadow-lg hover:shadow-purple-500/20"
              >
                <Shirt className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <h3 className="font-semibold">{product}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Words of Director */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/50 border-y border-slate-700">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-lg border border-purple-500/30 p-8 md:p-12">
            <Image
              src="/director-leader-business-success-professional-prem.jpg"
              alt="Director's message background"
              fill
              className="object-cover -z-10 opacity-10"
            />
            <div className="relative z-10">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-purple-400">Words from Our Founder</h2>
                <p className="text-purple-300 font-semibold text-lg">Rajesh Kumar, Founder & Director</p>
              </div>
              <blockquote className="text-lg md:text-xl text-slate-100 leading-relaxed italic">
                "At Shivora, we believe that fashion is not just about clothing—it's about making people feel confident
                and comfortable in their own skin. Every piece we create is a testament to our commitment to quality and
                innovation. We started this journey with a dream to democratize premium fashion, making it accessible to
                everyone. Today, as we serve thousands of happy customers, we remain dedicated to that original mission.
                Our success is measured not by sales, but by the smiles of satisfied customers wearing our products.
                Looking forward, we are committed to sustainability, ethical practices, and continuing to set new
                standards in the Indian fashion industry."
              </blockquote>
              <div className="mt-8 flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-purple-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
            Join the Shivora Family
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Experience premium quality clothing that's affordable, stylish, and built to last. Shop now and discover why
            thousands of customers trust Shivora.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 text-white">
              Start Shopping Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
