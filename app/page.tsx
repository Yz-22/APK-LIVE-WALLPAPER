import Hero from "@/components/home/Hero"
import Services from "@/components/home/Services"
import FeaturedProjects from "@/components/home/FeaturedProjects"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import WhyChooseUs from "@/components/home/WhyChooseUs"
import ContactSection from "@/components/home/ContactSection"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <FeaturedProjects />
      <FeaturedProducts />
      <WhyChooseUs />
      <ContactSection />
    </main>
  )
}
