"use server"

import { formatPrice, getOptionsForCategory, getProduct } from "@/lib/catalog"

export type OrderState = {
  status: "idle" | "success" | "error"
  message?: string
  total?: number
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

async function sendTelegramMessage(text: string) {
  	const token = "8880577304:AAGk_rtDKbwvX4-A6orU_oZ9-a0AXMYST2w"
	const chatId = "8246337039"

  if (!token || !chatId) {
    console.error("Telegram is not configured: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing")
    return false
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      cache: "no-store",
    })
    if (!response.ok) {
      console.error("Telegram API error:", response.status, await response.text())
      return false
    }
    return true
  } catch (error) {
    console.error("Telegram request failed:", error)
    return false
  }
}

export async function submitOrder(_prev: OrderState, formData: FormData): Promise<OrderState> {
  const name = String(formData.get("name") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const productId = String(formData.get("productId") ?? "")
  const product = getProduct(productId)

  if (name.length < 2 || name.length > 80) {
    return { status: "error", message: "Вкажіть, будь ласка, ваше ім’я." }
  }
  if (!/^\+?[\d\s()-]{10,18}$/.test(phone)) {
    return { status: "error", message: "Вкажіть коректний номер телефону." }
  }
  if (!product) {
    return { status: "error", message: "Оберіть модель із каталогу." }
  }

  let total = product.price
  const selectedLines: string[] = []
  for (const option of getOptionsForCategory(product.category)) {
    const raw = Number(formData.get(`option-${option.id}`) ?? 0)
    if (!Number.isInteger(raw) || raw <= 0) continue
    const qty = Math.min(raw, option.maxQuantity ?? 1)
    total += qty * option.price
    selectedLines.push(
      `• ${escapeHtml(option.name)}${qty > 1 ? ` × ${qty}` : ""} — ${formatPrice(qty * option.price)}`,
    )
  }

  const message = [
    "<b>Нове замовлення — Сідай &amp; Відпочивай</b>",
    "",
    `<b>Ім’я:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    "",
    `<b>Модель:</b> ${escapeHtml(product.name)} — ${formatPrice(product.price)}`,
    selectedLines.length > 0 ? `<b>Додаткові опції:</b>\n${selectedLines.join("\n")}` : "<b>Додаткові опції:</b> немає",
    "",
    `<b>Разом:</b> ${formatPrice(total)}`,
  ].join("\n")

  const sent = await sendTelegramMessage(message)
  if (!sent) {
    return {
      status: "error",
      message: "Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам: +38096 780 60 45.",
    }
  }

  return {
    status: "success",
    total,
    message: `Дякуємо, ${name}! Ми зателефонуємо вам найближчим часом, щоб узгодити деталі замовлення.`,
  }
}
