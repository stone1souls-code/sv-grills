import { Hammer, ShieldCheck, Ruler, Truck } from "lucide-react"

const features = [
  { icon: Hammer, title: "Ручне зварювання", text: "Кожен шов ідеальний. Без прогарів і деформацій." },
  { icon: Ruler, title: "Під ваш розмір", text: "Універсальна конструкція, яка підходить під будь-який простір." },
  { icon: ShieldCheck, title: "Гарантуємо", text: "Цей мангал переживе всі інші." },
  { icon: Truck, title: "Доставка по Україні", text: "Надійно запакуємо, швидко відправимо, а перший розпал — за вами! " },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-16 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Про майстерню</p>
        <h2 className="mt-2 max-w-2xl text-balance font-display text-4xl uppercase md:text-5xl">
          Метал, вогонь і повага до м’яса
        </h2>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <li key={title} className="border-t border-border pt-6">
              <Icon className="size-7 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl uppercase">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
