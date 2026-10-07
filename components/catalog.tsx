"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { categories, products, formatPrice, type Category, type CategoryId, type Product } from "@/lib/catalog"
import { OPEN_CATEGORY_EVENT } from "@/components/site-header"
import { useOrder } from "@/components/order-provider"
import { cn } from "@/lib/utils"

export function Catalog() {
  const [openId, setOpenId] = useState<string | null>(categories[0].id)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<CategoryId>).detail
      setOpenId(id)
      const scrollToCategory = () =>
        document.getElementById(`category-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
      scrollToCategory()
      clearTimeout(timer)
      // Re-align once the neighbouring panels finish their 500ms collapse animation.
      timer = setTimeout(scrollToCategory, 550)
    }
    window.addEventListener(OPEN_CATEGORY_EVENT, onOpen)
    return () => {
      window.removeEventListener(OPEN_CATEGORY_EVENT, onOpen)
      clearTimeout(timer)
    }
  }, [])

  return (
    <section id="catalog" className="scroll-mt-16 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Каталог</p>
        <h2 className="mt-2 font-display text-4xl uppercase md:text-5xl">Оберіть свій вогонь</h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Розкрийте категорію та гортайте моделі. Натисніть «Налаштувати», щоб додати опції в калькуляторі.
        </p>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {categories.map((category, index) => (
            <CategoryPanel
              key={category.id}
              index={index}
              category={category}
              items={products.filter((p) => p.category === category.id)}
              open={openId === category.id}
              onToggle={() => setOpenId((cur) => (cur === category.id ? null : category.id))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryPanel({
  category,
  items,
  index,
  open,
  onToggle,
}: {
  category: Category
  items: Product[]
  index: number
  open: boolean
  onToggle: () => void
}) {
  const panelId = `panel-${category.id}`
  const buttonId = `button-${category.id}`
  const fromPrice = Math.min(...items.map((i) => i.price))

  return (
    <div id={`category-${category.id}`} className="scroll-mt-28 md:scroll-mt-16">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center gap-4 py-6 text-left md:gap-8"
        >
          <span className="font-display text-lg text-muted-foreground">0{index + 1}</span>
          <span className="flex-1">
            <span className="block font-display text-2xl uppercase transition-colors group-hover:text-primary md:text-3xl">
              {category.title}
            </span>
            <span className="mt-1 block text-sm text-muted-foreground">
              {items.length} моделі · від {formatPrice(fromPrice)}
            </span>
          </span>
          <ChevronDown
            className={cn("size-6 shrink-0 transition-transform duration-300", open && "rotate-180 text-primary")}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden" inert={!open}>
          <p className="mb-6 max-w-2xl text-pretty text-muted-foreground">{category.description}</p>
          <ProductScroller items={items} />
        </div>
      </div>
    </div>
  )
}

function ProductScroller({ items }: { items: Product[] }) {
  const trackRef = useRef<HTMLUListElement>(null)

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" })
  }

  return (
    <div className="pb-8">
      <ul
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:thin]"
      >
        {items.map((product) => (
          <li key={product.id} className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[32%]">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          className="rounded-md border border-border p-2 transition-colors hover:bg-secondary"
          aria-label="Попередні моделі"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          className="rounded-md border border-border p-2 transition-colors hover:bg-secondary"
          aria-label="Наступні моделі"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const { selectProduct } = useOrder()

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative aspect-square">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 80vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-display text-xl uppercase">{product.name}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
        <dl className="mt-4 grid grid-cols-3 gap-2 border-y border-border py-3 text-sm">
          {product.specs.map((spec) => (
            <div key={spec.label}>
              <dt className="text-xs text-muted-foreground">{spec.label}</dt>
              <dd className="font-medium">{spec.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="font-display text-2xl text-primary">{formatPrice(product.price)}</span>
          <button
            type="button"
            onClick={() => selectProduct(product.id, true)}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Налаштувати
          </button>
        </div>
      </div>
    </article>
  )
}
