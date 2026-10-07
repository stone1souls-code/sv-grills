import Image from "next/image"
import { Clock, Flame } from "lucide-react"

const recipes = [
  {
    id: "shashlyk",
    title: "Класичний шашлик зі свинини",
    equipment: "Мангал",
    time: "40 хв + маринування",
    image: "/images/recipe-shashlyk.png",
    steps: [
      "Наріжте свинячу шию кубиками 4–5 см.",
      "Замаринуйте з цибулею, сіллю, перцем і мінеральною водою на 4–6 годин.",
      "Смажте на рівному жарі без полум’я, перевертаючи кожні 3–4 хвилини.",
    ],
  },
  {
    id: "ribs",
    title: "Свинячі ребра BBQ з глазур’ю",
    equipment: "Вугільний гриль",
    time: "2 год 30 хв",
    image: "/images/recipe-ribs.png",
    steps: [
      "Натріть ребра сумішшю паприки, коричневого цукру, часнику та солі.",
      "Готуйте непрямим жаром при 140 °C під кришкою близько 2 годин.",
      "Змастіть соусом BBQ і доведіть на прямому жарі до карамелізації.",
    ],
  },
  {
    id: "brisket",
    title: "Техаський брискет",
    equipment: "Реверсний смокер",
    time: "10–12 год",
    image: "/images/recipe-brisket.png",
    steps: [
      "Посипте яловичу грудинку крупною сіллю та чорним перцем 1:1.",
      "Коптіть на дубових дровах при 115–120 °C до внутрішніх 75 °C.",
      "Загорніть у крафт-папір, доведіть до 93 °C і дайте відпочити 1 годину.",
    ],
  },
]

export function Recipes() {
  return (
    <section id="recipes" className="scroll-mt-16 border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Рецепти</p>
        <h2 className="mt-2 font-display text-4xl uppercase md:text-5xl">Що приготувати на вогні</h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Перевірені рецепти для мангалу, гриля та смокера — від простого шашлику до 12-годинного брискету.
        </p>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Flame className="size-3.5 text-primary" aria-hidden="true" />
                      {recipe.equipment}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5 text-primary" aria-hidden="true" />
                      {recipe.time}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl uppercase">{recipe.title}</h3>
                  <ol className="mt-4 flex list-decimal flex-col gap-2 pl-5 text-sm text-muted-foreground marker:text-primary">
                    {recipe.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
