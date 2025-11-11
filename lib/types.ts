export interface Product {
  id: string
  name: string
  category: "night-pants" | "t-shirts" | "jackets" | "track-pants" | "hoodies" | "shorts"
  price: number
  images: string[] // Changed from single image to array of images
  description: string
  sizes: string[]
  colors: string[]
  rating: number
}

export interface CartItem {
  productId: string
  quantity: number
  size: string
  color: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalPrice: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: string
  estimatedDelivery: string
  shippingAddress: string
}

export interface User {
  id: string
  email: string
  name: string
  password: string
}
