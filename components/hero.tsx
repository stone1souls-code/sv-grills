import Image from "next/image"
import { ArrowDown } from "lucide-react"

const stats = [
  { value: "Продаємо", label: "мангали, які переходять у спадок." },
  { value: "Купуєш раз", label: "користуєшся все життя." },
  { value: "Гарантуємо", label: "якість та оригінальність" },
]

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <Image
        src="/images/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover opacity-60"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/20" />
      <div className="mx-auto flex min-h-[85svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-32">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-primary">Ручна робота · Україна</p>
        <h1 className="max-w-3xl text-balance font-display text-5xl uppercase leading-[0.95] md:text-7xl">
          Мангали, грилі та смокери, що живуть десятиліттями
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Варимо з товстої сталі під ваш двір, ресторан чи фестиваль. Оберіть модель у каталозі та зберіть
          комплектацію в калькуляторі — ціну побачите одразу.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#catalog"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Відкрити каталог
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
          <a
            href="#calculator"
            className="inline-flex items-center rounded-md border border-border px-6 py-3 font-medium transition-colors hover:bg-secondary"
          >
            Розрахувати ціну
          </a>
        </div>
        <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-border/60 pt-6">
          {stats.map((s, i) => (
  <div key={i}>

              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-2xl md:text-3xl">{s.value}</dd>
              <dd className="text-sm text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
