"use client"

import { createContext, useCallback, useContext, useState } from "react"
import { products } from "@/lib/catalog"

type OrderContextValue = {
  productId: string
  selectProduct: (id: string, scroll?: boolean) => void
}

const OrderContext = createContext<OrderContextValue | null>(null)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [productId, setProductId] = useState(products[0].id)

  const selectProduct = useCallback((id: string, scroll = false) => {
    setProductId(id)
    if (scroll) {
      document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return <OrderContext.Provider value={{ productId, selectProduct }}>{children}</OrderContext.Provider>
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error("useOrder must be used within OrderProvider")
  return ctx
}
