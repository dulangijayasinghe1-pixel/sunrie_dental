import PublicNavbar from "../../components/public/PublicNavabar";
import AboutSection from "../../components/public/AboutSection";
import Footer from "../../components/public/Footer";

function About() {
  return (
    <div className="min-h-screen bg-[#F7F5EF]">
      <PublicNavbar />

      <main>
        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#5F8D7A]">
              About Us
            </p>

            <h1 className="text-4xl font-bold text-[#26332D] md:text-5xl">
              Your Smile, Our Care
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[#64756C]">
              At Sunrise Dental Clinic, we are committed to providing
              comfortable, reliable, and quality dental care for every patient.
            </p>
          </div>
        </section>

        <AboutSection />
      </main>

      <Footer />
    </div>
  );
}

export default About;