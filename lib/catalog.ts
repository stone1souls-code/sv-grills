export type CategoryId = "mangals" | "grills" | "smokers"

export type Product = {
  id: string
  category: CategoryId
  name: string
  tagline: string
  price: number
  image: string
  specs: { label: string; value: string }[]
}

export type Category = {
  id: CategoryId
  title: string
  description: string
}

export type ProductOption = {
  id: string
  name: string
  description: string
  price: number
  categories: CategoryId[]
  maxQuantity?: number
}

export const categories: Category[] = [
  {
    id: "mangals",
    title: "Мангали BBQ",
    description: "Ручне зварювання, термостійке покриття 800+ °C.",
  },
  {
    id: "grills",
    title: "Вугільні грилі BBQ",
    description: "Для терас, ресторанів і великих компаній — з регулюванням тяги, збірником попелу, висувним лотком для Char Coal.",
  },
  {
    id: "smokers",
    title: "Смокери",
    description: "Reverse flow для рівномірної температури та справжнього техаського BBQ.",
  },
]

export const products: Product[] = [
  {
    id: "mangal-premium",
    category: "mangals",
    name: "Мангал «Преміум BBQ»",
    tagline: "Класика, дві бокові полиці, дві дровниці, відкидний столик, підставка, решітка",
    price: 9800,
    image: "/images/mangal-premium.jpg", // 🎯 Головне фото (саме воно показуватиметься в каталозі на сайті)
    images: [
      "/images/mangal-premium.jpg", 
      "/images/mangal-premium2.jpg"
    ], // 🎯 Масив усіх фотографій для нашої галереї зі стрілочками
    specs: [
      { label: "Сталь", value: "4 мм" },
      { label: "Шампурів", value: "9" },
      { label: "Вага", value: "45 кг" },
    ],
  },
  {
    id: "mangal-standart",
    category: "mangals",
    name: "Мангал «Стандарт BBQ»",
    tagline: "Класика, дві бокові полиці, одна дровниця",
    price: 6900,
    image: "/images/mangal-roof.png",
    specs: [
      { label: "Сталь", value: "4 мм" },
      { label: "Шампурів", value: "9" },
      { label: "Вага", value: "38 кг" },
    ],
  },
  {
    id: "mangal-mini",
    category: "mangals",
    name: "Мангал «Похідний»",
    tagline: "Розбірний, для виїздів на природу",
    price: 3500,
    image: "/images/mangal-camping.jpg", // 🎯 Головне фото (саме воно показуватиметься в каталозі на сайті)
    images: [
      "/images/mangal-camping.jpg", 
      "/images/mangal-camping2.jpg"
    ],
    specs: [
      { label: "Сталь", value: "3 мм" },
      { label: "Шампурів", value: "7" },
      { label: "Вага", value: "13,5 кг" },
    ],
  },
    {
    id: "grill-street",
    category: "grills",
    name: "Гриль «Chud Box 80»",
    tagline: "Дві стальні решітки, кришка, колеса",
    price: 30000,
    image: "/images/ChudBox.jpg", // 🎯 Головне фото (саме воно показуватиметься в каталозі на сайті)
    images: [
      "/images/ChudBox.jpg", 
      "/images/ChudBox2.jpg"
    ], // 🎯 Масив усіх фотографій для нашої галереї зі стрілочками
    specs: [
      { label: "Решітка велика", value: "78×43 см" },
      { label: "Решітка мала", value: "78×29 см" },
      { label: "Матеріал", value: "Сталь 3 мм" },
      { label: "Вага", value: "80 кг" },
    ],
  },
  {
    id: "grill-santa-maria",
    category: "grills",
    name: "Гриль «Санта-Марія & Chud Box»",
    tagline: "Підйомна решітка зі штурвалом",
    price: 27400,
    image: "/images/grill-santa-maria.png",
    specs: [
      { label: "Решітка", value: "90×50 см" },
      { label: "Ліфт", value: "Штурвал" },
      { label: "Вага", value: "95 кг" },
    ],
  },
  {
    id: "smoker-reverse-900",
    category: "smokers",
    name: "Смокер «Reverse Offset»",
    tagline: "Реверсний потік, камера-900 мм, термостійке покриття 800+ °C",
    price: 58000,
    image: "/images/smoker-reverse.jpg", // 🎯 Головне фото (саме воно показуватиметься в каталозі на сайті)
    images: [
      "/images/smoker-reverse.jpg", 
      "/images/smoker-reverse2.jpg",
      "/images/smoker-reverse3.jpg",
      "/images/smoker-reverse4.jpg",
      "/images/smoker-reverse5.jpg",
      "/images/smoker-reverse6.jpg",
      "/images/smoker-reverse7.jpg"
    ], // 🎯 Масив усіх фотографій для нашої галереї зі стрілочками
    specs: [
      { label: "Камера", value: "L-900 мм" },
      { label: "Сталь", value: "3-4 мм" },
      { label: "Вага", value: "180 кг" },
      { label: "Колір", value: "червоний, чорний" },
    ],
  },
  {
    id: "smoker-trailer",
    category: "smokers",
    name: "Смокер «Техас» на причепі",
    tagline: "Для кейтерингу та фестивалів",
    price: 148000,
    image: "/images/smoker-trailer.png",
    specs: [
      { label: "Камера", value: "Ø 800 мм" },
      { label: "Сталь", value: "10 мм" },
      { label: "Вага", value: "690 кг" },
    ],
  },
]

export const productOptions: ProductOption[] = [
  {
    id: "grill-grate",
    name: "Решітка гриль",
    description: "Решітка гриль до мангалу «Преміум BBQ»",
    price: 650,
    categories: ["mangals"],
    maxQuantity: 5,
    image: "/images/grill-grate.jpg",
  },
  {
    id: "sumka",
    name: "Сумка-чохол",
    description: "Міцна сумка-чохол до похідного мангала, не промокає",
    price: 900,
    categories: ["mangals"],
    image: "/images/sumka.jpg",
  },
  {
    id: "skewers",
    name: "Шампур 62см",
    description: "Нержавіюча сталь, дерев’яні ручки, гарне тиснення",
    price: 120,
    categories: ["mangals"],
    maxQuantity: 5,
    image: "/images/skewers.jpg",
  },
  {
    id: "kazan-stand",
    name: "Підставка під казан",
    description: "Знімна, для казана до 12 л, товщина: 4мм",
    price: 650,
    categories: ["mangals"],
    image: "/images/tools.jpg",
  },
  {
    id: "tools",
    name: "Кочерга + совок",
    description: "Стальні, із зручними ручками",
    price: 400,
    categories: ["mangals", "grills", "smokers"],
    image: "/images/tools.jpg",
  },
  {
    id: "wheels",
    name: "Колеса з гальмом",
    description: "Поліуретан, витримують до 300 кг",
    price: 2200,
    categories: ["mangals", "grills", "smokers"],
  },
  {
    id: "cast-iron-grate",
    name: "Додаткова чавунна решітка",
    description: "Під розмір вашої моделі",
    price: 2600,
    categories: ["grills", "smokers"],
    maxQuantity: 3,
  },
  {
    id: "thermometer",
    name: "Термометр Tel-Tru",
    description: "Встановлення на рівні решітки",
    price: 1900,
    categories: ["smokers"],
    maxQuantity: 3,
  },
  {
    id: "firebox-insulation",
    name: "Утеплення топки",
    description: "Подвійна стінка, економія дров до 30%",
    price: 7800,
    categories: ["smokers"],
  },
  {
    id: "cover",
    name: "Захисний чохол",
    description: "Oxford 600D, водонепроникний",
    price: 1300,
    categories: ["mangals", "grills", "smokers"],
  },
  {
    id: "engraving",
    name: "Лазерне гравіювання",
    description: "Ваш логотип або напис",
    price: 1500,
    categories: ["mangals", "grills", "smokers"],
  },
  {
    id: "delivery",
    name: "Доставка та збирання",
    description: "По Україні, з встановленням на місці",
    price: 2500,
    categories: ["mangals", "grills", "smokers"],
  },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export function getOptionsForCategory(category: CategoryId) {
  return productOptions.filter((o) => o.categories.includes(category))
}

export function formatPrice(value: number) {
  return `${new Intl.NumberFormat("uk-UA").format(value)} ₴`
}
