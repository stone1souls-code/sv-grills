"use client"

import { useEffect } from "react"

export function Platforms() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const footer = document.querySelector("footer")
      if (!footer) return

      // 🎯 ЦІЛЬОВИЙ ПОШУК: Шукаємо блок з описом компанії (текст про крафтові мангали)
      const footerTexts = footer.querySelectorAll("p")
      let targetContainer = null

      footerTexts.forEach((p) => {
        const text = p.textContent || ""
        if (text.includes("Крафтові мангали") || text.includes("вугільні грилі") || text.includes("оффсетні реверсні смокери")) {
          targetContainer = p
        }
      })

      // Якщо знайшли потрібний параграф опису і блок ще не додано
      if (targetContainer && !footer.querySelector(".custom-social-block")) {
        const socialContainer = document.createElement("div")
        socialContainer.className = "custom-social-block"
        
        // Налаштовуємо стилі під лівий куток (вирівнювання по лівому краю)
        socialContainer.style.display = "flex"
        socialContainer.style.flexDirection = "column"
        socialContainer.style.alignItems = "flex-start"
        socialContainer.style.gap = "16px"
        socialContainer.style.marginTop = "20px"
        socialContainer.style.width = "100%"

        socialContainer.innerHTML = `
          <!-- Рядок значків соцмереж -->
          <div style="display: flex; gap: 20px; align-items: center;">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Ми у Facebook" style="color: #71717a; transition: color 0.2s; cursor: pointer;">
              <svg xmlns="http://w3.org" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="Ми у YouTube" style="color: #71717a; transition: color 0.2s; cursor: pointer;">
              <svg xmlns="http://w3.org" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Ми у Instagram" style="color: #71717a; transition: color 0.2s; cursor: pointer;">
              <svg xmlns="http://w3.org" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>

          <!-- Рядок пошти для співпраці -->
          <div style="display: flex; gap: 8px; align-items: center; background-color: rgba(24, 24, 27, 0.3); border: 1px solid #1c1c1f; padding: 8px 14px; border-radius: 10px; margin-top: 4px;">
            <svg xmlns="http://w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span style="font-size: 12px; color: #71717a; font-weight: 500; tracking-wide">Співпраця:</span>
            <a href="mailto:sidvidgrills@gmail.com" style="font-size: 12px; color: #a1a1aa; font-weight: 700; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#f97316'" onmouseout="this.style.color='#a1a1aa'">
              sidvidgrills@gmail.com
            </a>
          </div>
        `

        // Додаємо ефекти підсвічування значків
        const icons = socialContainer.querySelectorAll("a")
        icons.forEach(link => {
          if (link.getAttribute("href")?.startsWith("mailto:")) return
          link.addEventListener("mouseover", () => link.style.color = "#f97316")
          link.addEventListener("mouseout", () => link.style.color = "#71717a")
        })

        // Вставляємо блок рівно ПІД параграфом опису компанії
        ;(targetContainer as HTMLElement).after(socialContainer)
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return null
}
