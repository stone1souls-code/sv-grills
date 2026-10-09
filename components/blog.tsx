"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight, BookOpen, User, Calendar, X, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { blogPosts } from "./blog-data" // Імпортуємо наші статті з сусіднього файлу

export function Blog() {
  const [activePost, setActivePost] = useState<any | null>(null)

  return (
    <section id="blog" className="scroll-mt-16 border-t border-zinc-900 bg-zinc-950 py-20 text-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs mb-3">
            <BookOpen size={14} />
            Блог майстерні
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Експертиза, <span className="text-orange-500">метал та вогонь</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className={`group relative rounded-2xl border border-zinc-900 bg-zinc-900/10 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-orange-500/30 ${
                post.isLarge ? "lg:col-span-7 min-h-[450px]" : "lg:col-span-5"
              }`}
            >
              <div className="relative w-full overflow-hidden aspect-video flex-1 bg-zinc-950">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <span className="absolute top-4 left-4 rounded bg-zinc-950/90 border border-zinc-800 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-orange-500">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-col justify-between p-6 bg-zinc-900/20 border-t border-zinc-900/40">
                <div>
                  <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1"><User size={11} /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
                  </div>
                  <h3 className="font-black uppercase text-white text-lg group-hover:text-orange-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400 line-clamp-2">{post.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-900/60 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">
                  <span>Читати статтю</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 group-hover:bg-orange-500 text-zinc-400 group-hover:text-white">
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md" onClick={() => setActivePost(null)}>
            <div className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setActivePost(null)} className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"><X size={16} /></button>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-widest mb-2"><Flame size={12} /> <span>{activePost.category}</span></div>
              <h2 className="font-black uppercase text-xl sm:text-2xl text-white mb-4">{activePost.title}</h2>
              <div className="text-zinc-300 text-sm font-medium leading-relaxed space-y-4 whitespace-pre-line border-t border-zinc-900 pt-4">{activePost.content}</div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
