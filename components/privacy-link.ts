"use client"

import { useEffect } from "react"

export function PrivacyLink() {
  useEffect(() => {
    // 🎯 ЗАХИСТ №1: Якщо ми НЕ на головній сторінці — миттєво зупиняємо скрипт
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      return;
    }

    // Чекаємо 1.5 секунди, щоб React повністю намалював підвал сайту
    const timer = setTimeout(() => {
      // 🎯 ЗАХИСТ №2: Додаткова перевірка всередині самого таймера перед виконанням
      if (typeof window !== "undefined" && window.location.pathname !== "/") return;

      const footer = document.querySelector("footer")
      if (!footer) return

      const footerTexts = footer.querySelectorAll("p, span")
      let linkAdded = false

      footerTexts.forEach((el) => {
        if (linkAdded) return

        const text = el.textContent || ""
        
        if (text.includes("Всі права захищено") || text.includes("Всі права захищені")) {
          if (!footer.querySelector(".custom-privacy-link")) {
            const link = document.createElement("a")
            link.href = "/privacy"
            link.textContent = "Політика конфіденційності"
            link.className = "custom-privacy-link"
            
            link.style.color = "#71717a" 
            link.style.fontSize = "12px"
            link.style.textDecoration = "underline"
            link.style.transition = "color 0.2s"
            link.style.cursor = "pointer"
            link.style.display = "block"   
            link.style.marginTop = "8px"   
            link.style.marginLeft = "0px"  
            
            link.addEventListener("mouseover", () => link.style.color = "#f97316")
            link.addEventListener("mouseout", () => link.style.color = "#71717a")
            
            el.after(link)
            linkAdded = true
          }
        }
      })
    }, 1500)

    // 🎯 ЗАЛІЗОБЕТОННЕ ОЧИЩЕННЯ ТАЙМЕРА ПРИ ЗМІНІ СТОРІНКИ
    return () => {
      clearTimeout(timer);
    };
  }, [])

  return null
}
