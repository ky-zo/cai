import { TopBar } from "@/components/top-bar";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { GoalSection } from "@/components/goal-section";
import { OffersSection } from "@/components/offers-section";
import { ImpactSectionWrapper } from "@/components/impact-section-wrapper";
import { TestimonialSection } from "@/components/testimonial-section";
import { FitSection } from "@/components/fit-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { FooterSection } from "@/components/footer-section";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <main className="w-full mx-auto px-6 sm:px-8">
        <TopBar />
        <HeroSection />

        <div className="max-w-3xl mx-auto">
          <ProblemSection />
          <GoalSection />
          <OffersSection />
          <ImpactSectionWrapper />
          <TestimonialSection />
          <FitSection />
          <FAQSection />
          <CTASection />
          <FooterSection />
        </div>
      </main>
    </div>
  );
}
