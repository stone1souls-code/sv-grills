"use client"

import { useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const customGalleries: Record<string, string[]> = {
  "/images/ChudBox.jpg": [
    "/images/ChudBox.jpg", 
    "/images/ChudBox2.jpg"
  ],
  "/images/mangal-premium.jpg": [
    "/images/mangal-premium.jpg", 
    "/images/mangal-premium2.jpg"
  ],
    "/images/mangal-camping.jpg": [
    "/images/mangal-camping.jpg", 
    "/images/mangal-camping2.jpg"
  ],
    "/images/smoker-reverse.jpg": [
    "/images/smoker-reverse.jpg", 
    "/images/smoker-reverse2.jpg",
    "/images/smoker-reverse3.jpg", 
    "/images/smoker-reverse4.jpg",
    "/images/smoker-reverse5.jpg", 
    "/images/smoker-reverse6.jpg",
    "/images/smoker-reverse7.jpg"
  ]
}

export function Lightbox() {
  const [imagesList, setImagesList] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(-1)

  useEffect(() => {
    // 🎯 СЛУХАЧ ДЛЯ КАРТИНOК ДОПІВ З КАЛЬКУЛЯТОРА
    const handleGlobalOpen = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      setImagesList([customEvent.detail])
      setCurrentIndex(0)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("open-lightbox", handleGlobalOpen)
    }

    const timer = setTimeout(() => {
      const catalogContainer = document.getElementById("catalog") || document.body
      if (!catalogContainer) return

      const productImages = catalogContainer.querySelectorAll("img")

      productImages.forEach((img) => {
        const imgElement = img as HTMLImageElement
        if (imgElement.closest("#calculator")) return

        imgElement.style.cursor = "zoom-in"
        imgElement.style.transition = "transform 0.2s ease"

        imgElement.addEventListener("mouseover", () => { imgElement.style.transform = "scale(1.03)" })
        imgElement.addEventListener("mouseout", () => { imgElement.style.transform = "scale(1)" })
        
        imgElement.addEventListener("click", (e) => {
          e.preventDefault()
          e.stopPropagation()
          const currentSrc = imgElement.getAttribute("src") || ""
          const gallery = customGalleries[currentSrc] || [currentSrc]
          setImagesList(gallery)
          setCurrentIndex(0)
        })
      })
    }, 1500)

    return () => {
      clearTimeout(timer)
      if (typeof window !== "undefined") {
        window.removeEventListener("open-lightbox", handleGlobalOpen)
      }
    }
  }, [])

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % imagesList.length)
  }

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length)
  }

  if (currentIndex === -1 || imagesList.length === 0) return null

  return (
    <div
      onClick={() => setCurrentIndex(-1)}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "zoom-out",
        userSelect: "none"
      }}
    >
      <button
        onClick={() => setCurrentIndex(-1)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "none",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          padding: "8px",
          zIndex: 100000
        }}
      >
        <X size={32} />
      </button>

      {imagesList.length > 1 && (
        <button
          onClick={showPrev}
          style={{
            position: "absolute",
            left: "20px",
            background: "rgba(22, 22, 22, 0.6)",
            border: "1px solid #262626",
            color: "#fff",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 100000
          }}
        >
          <ChevronLeft size={28} />
        </button>
      )}

      <div style={{ position: "relative", maxWidth: "80%", maxHeight: "80%", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }} onClick={(e) => e.stopPropagation()}>
        <img
          src={imagesList[currentIndex]}
          alt="Фото BBQ"
          style={{
            maxWidth: "95vw",
            maxHeight: "85vh",
            border: "1px solid #262626",
            borderRadius: "16px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)",
            objectFit: "contain",
            cursor: "default"
          }}
        />
        {imagesList.length > 1 && (
          <div style={{ color: "#a1a1aa", fontSize: "14px", fontWeight: "600", backgroundColor: "rgba(0,0,0,0.5)", padding: "4px 12px", borderRadius: "20px" }}>
            {currentIndex + 1} із {imagesList.length}
          </div>
        )}
      </div>

      {imagesList.length > 1 && (
        <button
          onClick={showNext}
          style={{
            position: "absolute",
            right: "20px",
            background: "rgba(22, 22, 22, 0.6)",
            border: "1px solid #262626",
            color: "#fff",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 100000
          }}
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  )
}
