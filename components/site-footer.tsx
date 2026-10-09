import { Flame, MapPin, Phone, Clock } from "lucide-react"
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
            {contacts.phoneDisplay}
          </a>
          
          {/* Графік роботи одразу після телефону */}
          <span className="flex items-center gap-2 text-muted-foreground">
            <Clock className="size-4 text-primary" aria-hidden="true" />
            {contacts.schedule}
          </span>
          
          {/* Безпечний та валідний блок TikTok з офіційною іконкою та кольором */}
          <a
            href={contacts.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center gap-2 font-medium underline-offset-4 hover:underline"
            style={{ color: contacts.tiktokAccentColor || "#00f2fe" }}
          >
            <svg 
              xmlns="http://w3.org" 
              viewBox="0 0 448 512" 
              fill="currentColor" 
              className="size-4"
              aria-hidden="true"
            >
              <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a73.2,73.2,0,1,0,57.75,71.18V0h92.33a109.11,109.11,0,0,0,72.92,109.91Z"/>
            </svg>
            {contacts.tiktokLabel}
          </a>
        </address>
                <div className="text-sm text-muted-foreground md:text-right flex flex-col justify-start md:pt-1">
          <div className="flex flex-col gap-1 md:items-end">
            <span>© {new Date().getFullYear()} {BRAND_NAME}</span>
            <span className="text-xs text-muted-foreground/80 font-normal">Всі права захищено.</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
