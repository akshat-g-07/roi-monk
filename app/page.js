import Features from "@/components/landing-page/features";
import HeroSection from "@/components/landing-page/hero-section";
import NavBar from "@/components/landing-page/navbar";

export default function Page() {
  return (
    <>
      <div className="w-full h-full max-w-7xl">
        <NavBar />
        <HeroSection />
        <Features />
        pricing faq policies
      </div>
    </>
  );
}
