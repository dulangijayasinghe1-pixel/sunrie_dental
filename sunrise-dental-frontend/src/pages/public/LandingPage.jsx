import PublicNavbar from "../../components/public/PublicNavabar";
import HeroSection from "../../components/public/HeroSection";
import ServicesSection from "../../components/public/ServicesSection";
import AboutSection from "../../components/public/AboutSection";
import ContactSection from "../../components/public/ContactSection";
import Footer from "../../components/public/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7F5EF]">
      <PublicNavbar />

      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;