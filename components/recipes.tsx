"use client"

import { useRef } from "react"
import Image from "next/image"
import { Clock, Flame, ChevronLeft, ChevronRight } from "lucide-react"

const recipes = [
  {
    id: "brisket",
    title: "Техаський брискет",
    tag: "Low & Slow 🇺🇸",
    equipment: "Реверсний смокер",
    time: "10–12 год",
    image: "/images/recipe-brisket.png",
    bgClass: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-950/30 via-zinc-900 to-black border-red-900/20",
    steps: [
      "Посипте яловичу грудинку крупною сіллю та чорним перцем 1:1, можна паприкою та сухим часником.",
      "Коптіть на дубових дровах при 115–120 °C до внутрішніх 75 °C.",
      "Загорніть у крафт-папір, доведіть до 93 °C і дайте відпочити 1 годину.",
    ],
  },
  {
    id: "ribs",
    title: "Свинячі ребра Buffalo з глазур’ю",
    tag: "Реберця 🪵",
    equipment: "Вугільний гриль",
    time: "2 год 30 хв",
    image: "/images/recipe-ribs.png",
    bgClass: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-950/30 via-zinc-900 to-black border-orange-900/20",
    steps: [
      "Натріть ребра сумішшю паприки, коричневого цукру, часнику та солі.",
      "Готуйте непрямим жаром при 140 °C під кришкою близько 2-2.5 годин.",
      "Змастіть соусом Баффало і доведіть на прямому жарі до карамелізації 5-7хв.",
    ],
  },
  {
    id: "wings",
    title: "Хрусткі крильця Buffalo",
    tag: "Птиця 🔥",
    equipment: "Мангал / Гриль",
    time: "45 хв",
    image: "/images/recipe-wings.png",
    bgClass: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-950/30 via-zinc-900 to-black border-amber-900/20",
    steps: [
      "Обваляйте крила в кукурудзяному крохмалі з сухим часником та паприкою.",
      "Запікайте на середньому жарі, часто перевертаючи до золотистої скоринки.",
      "Гарячими змішайте у мисці з вершковим соусом Баффало.",
    ],
  },
  {
    id: "sauce",
    title: "Фірмовий соус BBQ на бурбоні",
    tag: "Соуси 🥃",
    equipment: "Плита / Полка",
    time: "25  хв",
    image: "/images/recipe-sauce.jpg",
    bgClass: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/30 via-zinc-900 to-black border-zinc-700/20",
    steps: [
      "Обсмажте цибулю та часник, додайте 50 мл бурбону і випаріть алкоголь.",
      "2. Додайте кетчуп, томатну пасту, яблучний оцет, вустерський соус та коричневий цукор. Додайте сухі спеції, мед і рідкий дим. Добре перемішайте.",
      "Уварюйте на повільному вогні 15 хвилин. Перелийте у скляну тару.",
    ],
  },
  {
    id: "shashlyk",
    title: "Класичний шашлик зі свинини",
    tag: "Класика 🥩",
    equipment: "Мангал",
    time: "40 хв + маринування",
    image: "/images/recipe-shashlyk.png",
    bgClass: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stone-900 via-zinc-900 to-black border-stone-800/40",
    steps: [
      "Наріжте рівними середніми шматками свинячу шию, 2-2.5кг.",
      "Замаринуйте з цибулею, сіллю, перцем, гірчицею, лимонним соком та улюбленою приправою до шашлика. Додайте 2-3ст.л. олії, помасажуйте. Залиште в холодильнику на всю ніч.",
      "Смажте на рівному жарі без полум’я, перевертаючи кожні 3–4 хвилини.",
    ],
  },
]

export function Recipes() {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Функція для плавного гортання кнопками зліва направо на комп'ютері
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.7 : scrollLeft + clientWidth * 0.7
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  return (
    <section id="recipes" className="scroll-mt-16 border-t border-zinc-900 bg-zinc-950 py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ВЕРХНЯ ЧАСТИНА: ТЕКСТ ТА СТРІЛОЧКИ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500 font-bold">Рецепти</p>
            <h2 className="mt-2 font-display text-4xl uppercase md:text-5xl text-white">
              Що приготувати <span className="text-orange-500">на вогні</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Перевірені рецепти для мангалу, гриля та смокера — від простого шашлику до 12-годинного брискету.
            </p>
          </div>

          {/* НАВІГАЦІЙНІ СТРІЛОЧКИ ДЛЯ КОМП'ЮТЕРА */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-orange-500 hover:text-white transition"
              aria-label="Назад"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-orange-500 hover:text-white transition"
              aria-label="Вперед"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ГОРТИННА СТРІЧКА ЗЛІВА НАПРАВО (ДЛЯ SWIPE ПАЛЬЦЕМ ТА СКРОЛУ МИШКОЮ) */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory pr-4 select-none"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`w-[290px] sm:w-[380px] shrink-0 snap-start rounded-xl border flex flex-col overflow-hidden bg-card transition-all duration-300 hover:border-orange-500/30 group ${recipe.bgClass}`}
            >
              {/* КАРТИНКА СТРАВИ З ФІКСОВАНИМ ПРЕVIEW */}
              <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-zinc-900/60">
                <Image
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* МІТКА КАТЕГОРІЇ (TAG) ЗВЕРХУ КАРТИНКИ */}
                <span className="absolute top-3 left-3 rounded bg-zinc-950/90 border border-zinc-800 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-orange-500">
                  {recipe.tag}
                </span>
              </div>

              {/* КОНТЕНТНА ЧАСТИНА КАРТКИ */}
              <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between">
                <div>
                  {/* ТЕХНІЧНІ ДАНІ (МАНГАЛ/ЧАС) */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground uppercase font-bold tracking-wider">
                    <span className="flex items-center gap-1">
                      <Flame className="size-3.5 text-orange-500" aria-hidden="true" />
                      {recipe.equipment}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5 text-orange-500" aria-hidden="true" />
                      {recipe.time}
                    </span>
                  </div>

                  {/* НАЗВА СТРАВИ */}
                  <h3 className="mt-3 font-display text-xl uppercase text-white group-hover:text-orange-500 transition-colors duration-300">
                    {recipe.title}
                  </h3>

                  {/* КРОКИ ПРИГОТУВАННЯ */}
                  <ol className="mt-4 flex list-decimal flex-col gap-2 pl-5 text-sm text-zinc-400 font-medium marker:text-orange-500 marker:font-black">
                    {recipe.steps.map((step, idx) => (
                      <li key={idx} className="pl-1 leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
