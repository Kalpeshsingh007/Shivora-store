import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, User, Order } from "./types"

interface StoreState {
  user: User | null
  cart: CartItem[]
  orders: Order[]
  registeredUsers: User[] // Added registered users storage
  setUser: (user: User | null) => void
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  updateCartItem: (productId: string, quantity: number) => void
  clearCart: () => void
  addOrder: (order: Order) => void
  getOrders: () => Order[]
  getRegisteredUsers: () => User[] // New method to get registered users
  addRegisteredUser: (user: User) => void // New method to add registered user
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: null,
      cart: [],
      orders: [],
      registeredUsers: [], // Initialize empty registered users
      setUser: (user) => set({ user }),
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find(
            (cartItem) =>
              cartItem.productId === item.productId && cartItem.size === item.size && cartItem.color === item.color,
          )
          if (existing) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem === existing ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem,
              ),
            }
          }
          return { cart: [...state.cart, item] }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.productId !== productId),
        })),
      updateCartItem: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        })),
      clearCart: () => set({ cart: [] }),
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),
      getOrders: () => get().orders,
      getRegisteredUsers: () => get().registeredUsers, // New implementation
      addRegisteredUser: (user) =>
        set((state) => ({
          registeredUsers: [...state.registeredUsers, user],
        })),
    }),
    {
      name: "shivora-store",
    },
  ),
)
