import { Flame, MapPin, Phone } from "lucide-react"
import { BRAND_NAME, contacts } from "@/lib/contacts"

export function SiteFooter() {
  return (
    <footer id="contacts" className="scroll-mt-16 border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="size-6 text-primary" aria-hidden="true" />
            <span className="font-display text-xl uppercase tracking-wider">{BRAND_NAME}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Крафтові мангали, вугільні грилі BBQ та оффсетні реверсні смокери ручної роботи.
          </p>
        </div>
        <address className="flex flex-col gap-3 text-sm not-italic">
          <span className="flex items-center gap-2">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            {contacts.city}
          </span>
          <a href={contacts.phoneHref} className="flex items-center gap-2 hover:text-primary">
            <Phone className="size-4 text-primary" aria-hidden="true" />
            Телефон: {contacts.phoneDisplay}
          </a>
          <a
            href={contacts.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {contacts.tiktokLabel}
          </a>
        </address>
        <div className="text-sm text-muted-foreground md:text-right">
          <p>Пн–Нд: 10:00 – 19:00</p>
          <p className="mt-6">
            © {new Date().getFullYear()} {BRAND_NAME}
          </p>
        </div>
      </div>
    </footer>
  )
}
