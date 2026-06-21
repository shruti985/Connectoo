import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CommunitiesSection from "@/components/CommunitiesSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const SPLASH_KEY = "connecto-splash-shown";

const Index = () => {
  const [showSplash, setShowSplash] = useState(() => {
    return localStorage.getItem(SPLASH_KEY) !== "true";
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem(SPLASH_KEY, "true");
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      <div className={showSplash ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        <Navbar />
        <main>
          <HeroSection />
          <CommunitiesSection />
          <FeatureHighlights />
          <FeaturesSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
