"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { categories } from "@/lib/catalog"

// Системна константа, яку імпортує ваш файл catalog.tsx
export const OPEN_CATEGORY_EVENT = "open-category-event"

interface SiteHeaderProps {
  totalItems: number
}

export function SiteHeader({ totalItems }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)
  const [badgeCount, setBadgeCount] = useState(0)

  // Автономний лічильник: зчитує реальні галочки з екрана кожні 300 мілісекунд
  useEffect(() => {
    const updateBadge = () => {
      const checkedInputs = document.querySelectorAll('#calculator input[type="checkbox"]:checked')
      const activeButtons = document.querySelectorAll('#calculator button[aria-checked="true"]')
      const selectedIcons = document.querySelectorAll('#calculator .bg-orange-500 .lucide-check')
      
      const total = Math.max(checkedInputs.length, activeButtons.length, selectedIcons.length)
      setBadgeCount(total)
    }

    const interval = setInterval(updateBadge, 300)
    return () => clearInterval(interval)
  }, [])

  // Функція плавного скролу та примусового відкриття потрібної вкладки
  const handleCategoryClick = (id: string) => {
    setIsCatalogOpen(false)
    setIsOpen(false)
    
    // 1. Плавно прокручуємо сторінку до каталогу
    const catalogSection = document.getElementById("catalog")
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" })
    }
    
    // 2. Через мікро-паузу (поки триває скрол) примусово тиснемо на потрібну вкладку
    setTimeout(() => {
      // Спочатку шукаємо кнопку за її системними атрибутами або значеннями
      const tabButton = document.querySelector(`#catalog button[value="${id}"], #catalog [data-value="${id}"], #catalog button[id*="${id}"]`) as HTMLButtonElement
      
      if (tabButton) {
        tabButton.click()
      } else {
        // Залізобетонний пошук кнопки за текстом всередині неї, якщо атрибути приховані
        const allButtons = document.querySelectorAll("#catalog button")
        allButtons.forEach((btn: any) => {
          const txt = btn.textContent ? btn.textContent.toLowerCase() : ""
          if ((id === "mangals" && txt.includes("манг")) || 
              (id === "grills" && txt.includes("гриль")) || 
              (id === "smokers" && txt.includes("смок"))) {
            btn.click()
          }
        })
      }
    }, 250) // Оптимальна пауза, щоб браузер встиг доїхати до блоку
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
                {/* ЛОГОТИП БРЕНДУ — ТЕПЕР ПЛАВНО ПОВЕРТАЄ НА САМИЙ ВЕРХ СТОРІНКИ БЕЗ ЗБОЇВ */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            // Примусово скидаємо фокус з мобільних якорів
                        if (window.history && window.history.pushState) {
              window.history.pushState({}, document.title, window.location.pathname);
            }

          }}
          className="flex items-center gap-2 font-black uppercase tracking-wider text-white hover:text-orange-500 transition-colors"
        >
          <span className="text-sm sm:text-base">
            Сідай <span className="text-orange-500">&</span> Відпочивай
          </span>
        </a>


        {/* НАВІГАЦІЯ ДЛЯ КОМП'ЮТЕРІВ */}
        <nav className="hidden md:flex items-center gap-8">
          
          {/* КНОПКА «КАТАЛОГ» З ВИПАДАЮЧИМ МЕНЮ */}
          <div className="relative" onMouseEnter={() => setIsCatalogOpen(true)} onMouseLeave={() => setIsCatalogOpen(false)}>
            <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors h-16">
              <span>Каталог</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${isCatalogOpen ? "rotate-180 text-orange-500" : ""}`} />
            </button>

            {isCatalogOpen && (
              <div className="absolute top-14 left-0 w-64 rounded-xl border border-zinc-900 bg-zinc-950/95 p-4 shadow-xl backdrop-blur-md">
                <div className="flex flex-col gap-1.5">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleCategoryClick(c.id)}
                      className="w-full text-left rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
  href="#calculator"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  }}
  className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors"
>
  Калькулятор
</Link>
          <Link
  href="#recipes"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("recipes")?.scrollIntoView({ behavior: "smooth" });
  }}
  className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors"
>
  Рецепти
</Link>
          <Link
            href="#about"
            className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors"
          >
            Про компанію
          </Link>
        </nav>

        {/* ПРАВА ЧАСТИНА: СУМКА З РОБОЧИМ ЛІЧИЛЬНИКОМ ТА БУРГЕР МЕНЮ */}
        <div className="flex items-center gap-3">
          
          {/* СУМКА-КОШИК */}
          <Link href="#calculator" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-white hover:bg-zinc-900 h-9 w-9"
            >
              <ShoppingBag className="h-5 w-5" />
              {badgeCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-black text-white animate-in zoom-in duration-200">
                  {badgeCount}
                </span>
              )}
            </Button>
          </Link>

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

      {/* АДАПТИВНЕ МОВІЛЬНЕ МЕНЮ-ШТОРКА */}
      <div
        className={`fixed inset-x-0 top-16 left-0 z-40 h-[calc(100vh-4rem)] w-full border-t border-zinc-900 bg-zinc-950/95 p-6 backdrop-blur-md transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <nav className="flex flex-col gap-5 mt-4">
          <div className="flex flex-col gap-2 border-b border-zinc-900/60 pb-3">
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1 mb-1">Оберіть категорію:</div>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => handleCategoryClick(c.id)}
                className="w-full text-left rounded-md bg-zinc-900/40 border border-zinc-900 px-4 py-3 text-sm font-black uppercase tracking-wider text-zinc-200 hover:text-orange-500 transition-colors"
              >
                {c.title}
              </button>
            ))}
          </div>

          <Link href="#calculator" onClick={() => setIsOpen(false)} className="border-b border-zinc-900/60 pb-3 text-base font-black uppercase tracking-wider text-zinc-200 hover:text-orange-500 transition-colors">
            Калькулятор
          </Link>
          <Link href="#recipes" onClick={() => setIsOpen(false)} className="border-b border-zinc-900/60 pb-3 text-base font-black uppercase tracking-wider text-zinc-200 hover:text-orange-500 transition-colors">
            Рецепти
          </Link>
          <Link href="#about" onClick={() => setIsOpen(false)} className="border-b border-zinc-900/60 pb-3 text-base font-black uppercase tracking-wider text-zinc-200 hover:text-orange-500 transition-colors">
            Про компанію
          </Link>
        </nav>
      </div>
    </header>
  )
}
