"use client"

import { useActionState, useMemo, useState } from "react"
import Image from "next/image"
import { Check, Minus, Plus } from "lucide-react"
import { categories, getOptionsForCategory, getProduct, products, formatPrice } from "@/lib/catalog"
import { useOrder } from "@/components/order-provider"
import { submitOrder, type OrderState } from "@/app/actions"
import { cn } from "@/lib/utils"

const initialState: OrderState = { status: "idle" }

export function Calculator() {
  const { productId, selectProduct } = useOrder()
  // 🎯 Якщо покупець обрав пункт "none", створюємо віртуальний товар із ціною 0 грн!
  const product = productId === "none"
    ? { id: "none", category: "mangals" as const, name: "ПУСТО", tagline: "", price: 0, image: "", specs: [] }
    : (getProduct(productId) ?? products[0])

  const options = useMemo(() => {
    // 🎯 Перевіряємо напряму черезproductId системи
    if (productId === "none") {
      const allAddons = getOptionsForCategory("mangals")
        .concat(getOptionsForCategory("grills"))
        .concat(getOptionsForCategory("smokers"))
      return allAddons.filter((opt, index, self) => index === self.findIndex((t) => t.id === opt.id))
    }
    
    // Для всіх інших звичайних моделей фільтруємо допи як завжди
    const baseOptions = getOptionsForCategory(product.category)
    return baseOptions.filter((option: any) => {
      if (option.productId) {
        return option.productId === productId
      }
      return true
    })
  }, [product.category, productId])

  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [state, formAction, pending] = useActionState(submitOrder, initialState)

  const setQty = (id: string, qty: number) => setQuantities((prev) => ({ ...prev, [id]: qty }))

  const selected = options.filter((o) => (quantities[o.id] ?? 0) > 0)
  const optionsTotal = selected.reduce((sum, o) => sum + o.price * (quantities[o.id] ?? 0), 0)
  const total = product.price + optionsTotal

  return (
    <section id="calculator" className="scroll-mt-16 border-y border-border bg-card/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Калькулятор</p>
        <h2 className="mt-2 font-display text-4xl uppercase md:text-5xl">Зберіть комплектацію</h2>

        <form action={formAction} className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-8">
            <div>
              <label htmlFor="product" className="mb-2 block text-sm font-medium">
                Модель
              </label>
              <select
                id="product"
                name="productId"
                value={productId || "none"}
                onChange={(e) => selectProduct(e.target.value)}
                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-base text-white font-medium focus:border-orange-500 focus:outline-none"
                style={{ backgroundColor: '#18181b', color: '#ffffff' }}
              >
                {/* НАШ ГОЛОВНИЙ ПУНКТ */}
                <option value="none" style={{ backgroundColor: '#18181b', color: '#f97316' }} className="font-bold text-orange-500 bg-zinc-900">
                  ПУСТО — 0 грн
                </option>

                {categories.map((c) => (
                  <optgroup 
                    key={c.id} 
                    label={c.title} 
                    style={{ backgroundColor: '#18181b', color: '#ffffff', fontQuantity: 'bold' }} 
                    className="bg-zinc-900 text-white font-bold uppercase tracking-wider text-xs"
                  >
                    {products
                      .filter((p) => p.category === c.id)
                      .map((p) => (
                        <option key={p.id} value={p.id} style={{ backgroundColor: '#18181b', color: '#e4e4e7' }} className="bg-zinc-900 text-zinc-200 font-medium normal-case text-base">
                          {p.name} — {formatPrice(p.price)}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-medium">Додаткові опції</legend>
              <ul className="grid gap-3 sm:grid-cols-2">
                {options.map((option) => {
                  const qty = quantities[option.id] ?? 0
                  const active = qty > 0
                  const max = option.maxQuantity ?? 1
                  return (
                    <li
                      key={option.id}
                      className={cn(
                        "flex items-start gap-3 rounded-lg border bg-background p-4 transition-colors",
                        active ? "border-primary" : "border-border",
                      )}
                    >
                      <input type="hidden" name={`option-${option.id}`} value={qty} />
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={active}
                        aria-label={option.name}
                        onClick={() => setQty(option.id, active ? 0 : 1)}
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors",
                          active ? "border-primary bg-primary text-primary-foreground" : "border-input",
                        )}
                      >
                        {active && <Check className="size-3.5" aria-hidden="true" />}
                      </button>
                                      {/* 🎯 КАРТИНКА ДОПУ З ГЛОБАЛЬНИМ КЛІКОМ ЗБІЛЬШЕННЯ */}
                  <img 
                    src={`/images/${option.id}.jpg`} 
                    alt={option.name} 
                    className="w-20 h-20 rounded-xl object-cover border border-zinc-800 bg-black shrink-0 ml-4 mr-2 cursor-zoom-in hover:scale-105 transition-transform duration-200" 
                    onError={(e) => e.currentTarget.style.display = 'none'}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Надсилаємо глобальну подію для нашого Lightbox
                      if (typeof window !== 'undefined') {
                        window.dispatchEvent(new CustomEvent('open-lightbox', { detail: e.currentTarget.src }));
                      }
                    }}
                  />

                      <div className="flex-1">
                        <button
                          type="button"
                          onClick={() => setQty(option.id, active ? 0 : 1)}
                          className="text-left font-medium"
                          tabIndex={-1}
                        >
                          {option.name}
                        </button>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-primary">+{formatPrice(option.price)}</span>
                          {max > 1 && active && (
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setQty(option.id, qty - 1)}
                                className="rounded border border-border p-1 hover:bg-secondary"
                                aria-label={`Зменшити кількість: ${option.name}`}
                              >
                                <Minus className="size-3.5" aria-hidden="true" />
                              </button>
                              <span className="w-5 text-center text-sm tabular-nums" aria-live="polite">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => setQty(option.id, Math.min(max, qty + 1))}
                                disabled={qty >= max}
                                className="rounded border border-border p-1 hover:bg-secondary disabled:opacity-40"
                                aria-label={`Збільшити кількість: ${option.name}`}
                              >
                                <Plus className="size-3.5" aria-hidden="true" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </fieldset>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-lg border border-border bg-background">
              <div className="flex items-center gap-4 border-b border-border p-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-md">
                  <Image src={product.image || "/placeholder.svg"} alt="" fill sizes="64px" className="object-cover" />
                </div>
                <div>
                  <p className="font-display text-lg uppercase leading-tight">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                </div>
              </div>

              <div className="p-4">
                {selected.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Опції не обрано — базова комплектація.</p>
                ) : (
                  <ul className="flex flex-col gap-2 text-sm">
                    {selected.map((o) => (
                      <li key={o.id} className="flex justify-between gap-3">
                        <span className="text-muted-foreground">
                          {o.name}
                          {(quantities[o.id] ?? 0) > 1 && ` × ${quantities[o.id]}`}
                        </span>
                        <span className="shrink-0 tabular-nums">
                          {formatPrice(o.price * (quantities[o.id] ?? 0))}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                  <span className="text-sm text-muted-foreground">Разом</span>
                  <output className="font-display text-3xl text-primary tabular-nums" aria-live="polite">
                    {formatPrice(total)}
                  </output>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-border p-4">
                <label htmlFor="name" className="sr-only">
                  Ім’я
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Ваше ім’я"
                  className="rounded-md border border-input bg-card px-4 py-3"
                />
                <label htmlFor="phone" className="sr-only">
                  Телефон
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+38 0__ ___ __ __"
                  className="rounded-md border border-input bg-card px-4 py-3"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {pending ? "Надсилаємо…" : "Замовити"}
                </button>
                {state.status !== "idle" && (
                  <p
                    role="status"
                    className={cn("text-sm", state.status === "error" ? "text-destructive" : "text-foreground")}
                  >
                    {state.message}
                    {state.status === "success" && state.total !== undefined && (
                      <> Сума замовлення: {formatPrice(state.total)}.</>
                    )}
                  </p>
                )}
              </div>
            </div>
          </aside>
        </form>
      </div>
    </section>
  )
}
