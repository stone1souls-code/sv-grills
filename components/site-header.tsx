"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Flame, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export const OPEN_CATEGORY_EVENT = "open-category-event"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [badgeCount, setBadgeCount] = useState(0)

  // 🎯 Надійний автомат: кожні 300 мілісекунд рахує реальні галочки на екрані!
  useEffect(() => {
    const updateBadge = () => {
      // Шукаємо всі активовані галочки (чекбокси або кнопки з атрибутом checked/active)
      const checkedInputs = document.querySelectorAll('#calculator input[type="checkbox"]:checked')
      const activeButtons = document.querySelectorAll('#calculator button[aria-checked="true"]')
      const selectedIcons = document.querySelectorAll('#calculator .bg-orange-500 .lucide-check')
      
      const total = Math.max(checkedInputs.length, activeButtons.length, selectedIcons.length)
      setBadgeCount(total)
    }

    const interval = setInterval(updateBadge, 300)
    return () => clearInterval(interval)
  }, [])

  const menuItems = [
    { label: "Каталог", href: "#catalog" },
    { label: "Калькулятор", href: "#calculator" },
    { label: "Рецепти", href: "#recipes" },
    { label: "Про компанію", href: "#about" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* ЛОГОТИП БРЕНДУ */}
        <a href="#top" className="flex items-center gap-2 font-black uppercase tracking-wider text-white hover:text-orange-500 transition-colors">
          <Flame className="h-5 w-5 text-orange-500 fill-orange-500" />
          <span className="text-sm sm:text-base">
            Сідай <span className="text-orange-500">&</span> Відпочивай
          </span>
        </a>

        {/* НАВІГАЦІЯ ДЛЯ КОМП'ЮТЕРІВ */}
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

        {/* ПРАВА ЧАСТИНА: СУМКА З РОБОЧИМ ЛІЧИЛЬНИКОМ ТА БУРГЕР */}
        <div className="flex items-center gap-3">
          
          <a href="#calculator" className="relative">
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md h-9 w-9">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            {/* 🎯 НАШ ПОМАРАНЧЕВИЙ КРУЖЕЧОК-ЛІЧИЛЬНИК */}
            {badgeCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-black text-white animate-in zoom-in duration-200">
                {badgeCount}
              </span>
            )}
          </a>

          {/* КНОПКА БУРГЕРА ДЛЯ ТЕЛЕФОНІВ */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-zinc-400 hover:bg-zinc-900 hover:text-white transition md:hidden"
            aria-label="Перемикач меню"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* МОВІЛЬНЕ МЕНЮ */}
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
              onClick={() => setIsOpen(false)}
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
