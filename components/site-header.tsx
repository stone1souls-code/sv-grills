"use client"

import { useEffect, useId, useRef, useState, type ReactNode } from "react"
import { ChevronDown, Flame, MapPin, Phone } from "lucide-react"
import { categories, type CategoryId } from "@/lib/catalog"
import { BRAND_NAME, contacts } from "@/lib/contacts"
import { cn } from "@/lib/utils"

export const OPEN_CATEGORY_EVENT = "catalog:open"

type MenuId = "catalog" | "contacts"

const navButtonClass =
  "flex items-center gap-1 rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:px-3"

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!openMenu) return
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [openMenu])

  const toggle = (id: MenuId) => setOpenMenu((cur) => (cur === id ? null : id))

  const openCategory = (id: CategoryId) => {
    setOpenMenu(null)
    window.dispatchEvent(new CustomEvent<CategoryId>(OPEN_CATEGORY_EVENT, { detail: id }))
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 md:h-16 md:py-0">
        <a href="#top" className="flex items-center gap-2">
          <Flame className="size-6 text-primary" aria-hidden="true" />
          <span className="font-display text-lg uppercase tracking-wider md:text-xl">{BRAND_NAME}</span>
        </a>

        <nav ref={navRef} aria-label="Основна навігація" className="-mx-2 sm:mx-0">
          <ul className="flex items-center gap-1 md:gap-2">
            <li className="relative">
              <Dropdown
                label="Каталог"
                open={openMenu === "catalog"}
                onToggle={() => toggle("catalog")}
              >
                <ul className="flex flex-col py-1">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <a
                        href={`#category-${category.id}`}
                        onClick={(event) => {
                          event.preventDefault()
                          openCategory(category.id)
                        }}
                        className="block px-4 py-2.5 text-sm transition-colors hover:bg-secondary hover:text-primary"
                      >
                        {category.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </Dropdown>
            </li>
            <li>
              <a href="#calculator" className={navButtonClass} onClick={() => setOpenMenu(null)}>
                Калькулятор
              </a>
            </li>
            <li>
              <a href="#recipes" className={navButtonClass} onClick={() => setOpenMenu(null)}>
                Рецепти
              </a>
            </li>
            <li className="relative">
              <Dropdown
                label="Контакти"
                open={openMenu === "contacts"}
                onToggle={() => toggle("contacts")}
                align="right"
              >
                <address className="flex flex-col gap-3 p-4 text-sm not-italic">
                  <span className="flex items-center gap-2">
                    <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    {contacts.city}
                  </span>
                  <a href={contacts.phoneHref} className="flex items-center gap-2 hover:text-primary">
                    <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>
                      <span className="text-muted-foreground">Телефон: </span>
                      {contacts.phoneDisplay}
                    </span>
                  </a>
                  <a
                    href={contacts.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline"
                  >
                    <TikTokIcon className="size-4 shrink-0" />
                    {contacts.tiktokLabel}
                  </a>
                </address>
              </Dropdown>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Dropdown({
  label,
  open,
  onToggle,
  align = "left",
  children,
}: {
  label: string
  open: boolean
  onToggle: () => void
  align?: "left" | "right"
  children: ReactNode
}) {
  const panelId = useId()

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(navButtonClass, open && "text-foreground")}
      >
        {label}
        <ChevronDown
          className={cn("size-4 transition-transform duration-200", open && "rotate-180 text-primary")}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className={cn(
          "absolute top-full mt-2 w-60 overflow-hidden rounded-lg border border-border bg-card shadow-xl",
          align === "right" ? "right-0" : "left-0",
        )}
      >
        {children}
      </div>
    </>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2V2h-3.4v13.4a2.9 2.9 0 1 1-2-2.7V9.2a6.3 6.3 0 1 0 5.4 6.2V8.6a8.2 8.2 0 0 0 3.8 1.2V6.7Z" />
    </svg>
  )
}
