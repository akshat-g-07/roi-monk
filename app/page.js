"use client";

import Features from "@/components/landing-page/features";
import Footer from "@/components/landing-page/footer";
import HeroSection from "@/components/landing-page/hero-section";
import NavBar from "@/components/landing-page/navbar";
import OpenSource from "@/components/landing-page/open-source";
import Pricing from "@/components/landing-page/pricing";

import { useUserType } from "@/contexts/user-type";

export default function Page() {
  const userType = useUserType();
  return (
    <>
      <div className="w-full h-full max-w-7xl flex flex-col items-center *:flex *:flex-col *:items-center">
        <NavBar />
        <HeroSection />
        <Features />
        <Pricing />
        <OpenSource />
        <Footer />
      </div>
    </>
  );
}
