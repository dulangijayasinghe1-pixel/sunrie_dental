import PublicNavbar from "../../components/public/PublicNavabar";
import ContactSection from "../../components/public/ContactSection";
import Footer from "../../components/public/Footer";

function Contact() {
  return (
    <div className="min-h-screen bg-[#F7F5EF]">
      <PublicNavbar />

      <main>
        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#5F8D7A]">
              Contact Us
            </p>

            <h1 className="text-4xl font-bold text-[#26332D] md:text-5xl">
              We Are Here For You
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[#64756C]">
              Have a question or need an appointment? Get in touch with
              Sunrise Dental Clinic.
            </p>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default Contact;