"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingBag, Flame, Menu, X } from "lucide-react"
import { useOrder } from "@/components/order-provider"
import { Button } from "@/components/ui/button"

// 🎯 ВАЖЛИВО: Повертаємо технічну константу для роботи каталогу товарів
export const OPEN_CATEGORY_EVENT = "open-category-event"

export function SiteHeader() {
  // Додаємо стан для відкриття/закриття мобільного меню
  const [isOpen, setIsOpen] = useState(false)
    // 🎯 Беремо дані з кошика з повним захистом від пустих значень
  const orderContext = useOrder()
  const currentOptions = orderContext?.options || orderContext?.selectedOptions || {}
  const totalItems = Object.values(currentOptions).reduce((sum: any, count: any) => sum + (Number(count) || 0), 0)

  const menuItems = [
    { label: "Каталог", href: "#catalog" },
    { label: "Калькулятор", href: "#calculator" },
    { label: "Рецепти", href: "#recipes" },
    { label: "Про компанію", href: "#about" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
                {/* ЛОГОТИП БРЕНДУ — ТЕПЕР ПЛАВНО ПОВЕРТАЄ НА САМИЙ ВЕРХ */}
        <a href="#top" className="flex items-center gap-2 font-black uppercase tracking-wider text-white hover:text-orange-500 transition-colors">
          <Flame className="h-5 w-5 text-orange-500 fill-orange-500" />
          <span className="text-sm sm:text-base">
            Сідай <span className="text-orange-500">&</span> Відпочивай
          </span>
        </a>


        {/* НАВІГАЦІЯ ДЛЯ КОМП'ЮТЕРІВ (hidden md:flex — ховається на телефонах) */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ПРАВА ЧАСТИНА: КОШИК ТА КНОПКА БУРГЕРА */}
        <div className="flex items-center gap-4">
          {/* КОШИК */}
          <Link href="#calculator">
            <Button variant="ghost" size="icon" className="relative text-zinc-400 hover:text-white hover:bg-zinc-900">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {/* КНОПКА БУРГЕРА ДЛЯ ТЕЛЕФОНІВ (visible тільки на мобільних завдяки md:hidden) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white transition md:hidden"
            aria-label="Перемикач меню"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* АДАПТИВНЕ МОВІЛЬНЕ МЕНЮ-ШТОРКА (плавно виїжджає на смартфонах) */}
      <div
        className={`fixed inset-x-0 top-16 z-40 h-[calc(100vh-4rem)] w-full border-t border-zinc-900 bg-zinc-950/95 p-6 backdrop-blur-md transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <nav className="flex flex-col gap-5 mt-4">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)} // Закриваємо шторку при тапі на розділ
              className="border-b border-zinc-900/60 pb-3 text-base font-black uppercase tracking-wider text-zinc-200 hover:text-orange-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
