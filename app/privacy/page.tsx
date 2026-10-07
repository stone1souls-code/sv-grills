import Link from "next/link"
import { ChevronLeft, Scale } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Кнопка повернення назад */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-orange-500 hover:text-white uppercase tracking-wider transition mb-10">
          <ChevronLeft size={16} /> На головну
        </Link>
        
        <h1 className="text-3xl font-black uppercase text-white tracking-tight mb-4">
          Політика <span className="text-orange-500">конфіденційності</span>
        </h1>
        <p className="text-xs text-zinc-500 mb-8 uppercase tracking-wider font-bold">Мінімальний збір даних для зв'язку</p>

        {/* Офіційне посилання на Закон України */}
        <div className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl text-sm mb-8">
          <Scale className="w-5 h-5 text-orange-500 flex-shrink-0" />
          <p className="text-xs text-zinc-400 font-medium">
            Складено відповідно до чинного законодавства України, зокрема{" "}
            <a 
              href="https://rada.gov.ua" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-orange-500 underline hover:text-white transition"
            >
              Закону України «Про захист персональних даних» № 2297-VI
            </a>.
          </p>
        </div>

        {/* Чесний та прозорий текст інтернет-магазину */}
        <div className="space-y-6 text-sm leading-relaxed font-medium text-zinc-400">
          <p>
            Ми поважаємо приватність наших клієнтів і зводимо збір інформації до абсолютного мінімуму, необхідного лише для прорахунку комплектації та підтвердження замовлення.
          </p>
          
          <h2 className="text-base font-bold text-white uppercase tracking-wide mt-8">1. Які дані ми збираємо</h2>
          <p>
            У нашому конфігураторі вартості ми просимо вас вказати **виключно**:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-300">
            <li><strong className="text-white">Ваше ім’я</strong> — щоб ми знали, як до вас звертатися під час дзвінка.</li>
            <li><strong className="text-white">Номер телефону</strong> — для зворотного зв'язку та підтвердження деталей замовлення.</li>
            <li><strong className="text-white">Коментар (за бажанням)</strong> — якщо ви хочете вказати додаткові побажання до конструкції чи комплектації мангала.</li>
          </ul>
          <p className="bg-zinc-900/40 border border-dashed border-zinc-800 p-3 rounded-lg text-xs text-orange-400 mt-2">
            ⚠️ <strong>Важливо:</strong> Ми **НЕ просимо, НЕ збираємо і НЕ вимагаємо** жодних інших конфіденційних чи чутливих даних: адрес проживання чи реєстрації, паспортних даних, ідентифікаційних кодів, банківських виписок чи реквізитів ваших карток.
          </p>

          <h2 className="text-base font-bold text-white uppercase tracking-wide mt-8">2. Мета використання даних</h2>
          <p>
            Ці мінімальні дані потрібні нам виключно для того, щоб зв'язатися з вами, обговорити обрану вами комплектацію обладнання BBQ та погодити спосіб оплати й адресу доставки вже під час особистої розмови.
          </p>

          <h2 className="text-base font-bold text-white uppercase tracking-wide mt-8">3. Конфіденційність та безпека</h2>
          <p>
            Ваша заявка миттєво кодується і летить напряму у наш закритий приватний Telegram-бот. Ми гарантуємо, що ваші контакти ніколи не будуть передані або продані третім особам чи стороннім сервісам для розсилки спаму.
          </p>

          <h2 className="text-base font-bold text-white uppercase tracking-wide mt-8">4. Згода клієнта</h2>
          <p>
            Натискаючи кнопку «Надіслати замовлення», ви погоджуєтесь, що вказаний вами номер телефону буде використаний нами суто для дзвінка щодо вашої заявки на мангал чи гриль.
          </p>
        </div>
      </div>
    </div>
  )
}
