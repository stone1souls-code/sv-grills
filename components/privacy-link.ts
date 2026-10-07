"use client"

import { useEffect } from "react"

export function PrivacyLink() {
  useEffect(() => {
    // Чекаємо 1.5 секунди, щоб React повністю намалював підвал сайту
    const timer = setTimeout(() => {
      // 🎯 ЦІЛЬОВИЙ ПОШУК: Шукаємо елементи ТІЛЬКИ всередині підвалу (тегу footer)
      const footer = document.querySelector("footer")
      if (!footer) return

      // Шукаємо текстові блоки p або span строго всередині цього футера
      const footerTexts = footer.querySelectorAll("p, span")
      let linkAdded = false

      footerTexts.forEach((el) => {
        if (linkAdded) return

        const text = el.textContent || ""
        
        // Знаходимо саме рядок з роком та значком ©
        if (text.includes("©") || text.includes("2026") || text.includes("Всі права захищені")) {
          if (!footer.querySelector(".custom-privacy-link")) {
            // Створюємо наше єдине акуратне посилання
            const link = document.createElement("a")
            link.href = "/privacy"
            link.textContent = "Політика конфіденційності"
            link.className = "custom-privacy-link"
            
            // Солідні стилі під чорний преміум-дизайн
            link.style.color = "#71717a" // Тьмяно-сірий, як оригінальний копірайт
            link.style.fontSize = "12px"
            link.style.textDecoration = "underline"
            link.style.marginLeft = "16px"
            link.style.transition = "color 0.2s"
            link.style.cursor = "pointer"
            link.style.display = "inline-block"
            
            // Ефект підсвічування помаранчевим при наведенні
            link.addEventListener("mouseover", () => link.style.color = "#f97316")
            link.addEventListener("mouseout", () => link.style.color = "#71717a")
            
            // Вставляємо посилання строго праворуч від тексту копірайту внизу
            el.after(link)
            linkAdded = true
          }
        }
      })
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return null
}
