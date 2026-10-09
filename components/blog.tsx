"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ArrowUpRight, BookOpen, User, Calendar, X, Flame, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { blogPosts } from "./blog-data"

export function Blog() {
  const [activePost, setActivePost] = useState<any | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Функція для плавного гортання компактними картками зліва направо на комп'ютері
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.7 : scrollLeft + clientWidth * 0.7
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  return (
    <section id="blog" className="scroll-mt-16 border-t border-zinc-900 bg-zinc-950 py-20 text-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ЗАГОЛОВОК БЛОКУ З КНОПКАМИ ГОРТАННЯ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs mb-3">
              <BookOpen size={14} />
              Блог майстерні
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Експертиза, <span className="text-orange-500">метал та вогонь</span>
            </h2>
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

        {/* ПЛАВНА КАРУСЕЛЬ СТАТЕЙ (КАРТКИ КРАСИВО ЗАЙМАЮТЬ 1/3 ШИРИНИ НА ПК) */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory pr-4 select-none"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {blogPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="w-[290px] sm:w-[380px] md:w-[calc(33.333%-16px)] shrink-0 snap-start rounded-2xl border border-zinc-900 bg-zinc-900/10 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-orange-500/30 group"
            >
              {/* СОКОВИТЕ АКУРАТНЕ ФОТО КАРТКИ */}
              <div className="relative w-full overflow-hidden aspect-[4/3] bg-zinc-950 border-b border-zinc-900/40">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded bg-zinc-950/90 border border-zinc-800 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-orange-500 z-10">
                  {post.category}
                </span>
              </div>

              {/* ТЕКСТОВА ЧАСТИНА КАРТКИ */}
              <div className="flex-1 flex flex-col justify-between p-6 bg-zinc-900/20">
                <div>
                  <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1">
                      <User size={11} className="text-zinc-600" /> {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} className="text-zinc-600" /> {post.date}
                    </span>
                  </div>
                  <h3 className="font-black uppercase text-white text-lg group-hover:text-orange-500 transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-zinc-900/60 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                  <span>Читати статтю</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 group-hover:bg-orange-500 text-zinc-400 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ПРЕМІУМ МОДАЛЬНЕ ВІКНО ДЛЯ ПОВНОГО ТЕКСТУ СТАТТІ */}
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setActivePost(null)}>
            <div className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-2xl custom-scrollbar animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setActivePost(null)} className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"><X size={16} /></button>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-widest mb-2"><Flame size={12} /> <span>{activePost.category}</span></div>
              <h2 className="font-black uppercase text-xl sm:text-2xl text-white mb-4 leading-tight">{activePost.title}</h2>
              <div className="text-zinc-300 text-sm sm:text-base font-medium leading-relaxed space-y-4 whitespace-pre-line border-t border-zinc-900 pt-4">{activePost.content}</div>
              <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-end">
                <Button onClick={() => setActivePost(null)} className="bg-zinc-900 border border-zinc-800 hover:border-orange-500 text-zinc-200 hover:text-white uppercase font-black tracking-wider text-xs px-5 py-4 rounded-md transition duration-200">
                  Закрити статтю
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
