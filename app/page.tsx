import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Catalog } from "@/components/catalog"
import { Calculator } from "@/components/calculator"
import { About } from "@/components/about"
import { Recipes } from "@/components/recipes"
import { SiteFooter } from "@/components/site-footer"
import { OrderProvider } from "@/components/order-provider"
import { Lightbox } from "@/components/lightbox"
import { PrivacyLink } from "@/components/privacy-link"
import { Platforms } from "@/components/platforms"

export default function Page() {
  return (
    <OrderProvider> {/* 🎯 ПЕРЕНЕСЛИ СЮДИ: Тепер кошик доступний по всьому сайту, включаючи шапку! */}
      <SiteHeader />
      <main>
        <Hero />
        <Catalog />
        <Calculator />
        <Recipes />
        <About />
      </main>
      <SiteFooter />
      <Lightbox />
      <PrivacyLink />
      <Platforms />
    </OrderProvider>
  )
}
