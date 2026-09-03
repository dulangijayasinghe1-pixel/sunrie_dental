import { Link } from "react-router-dom";

import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiHeart,
} from "react-icons/fi";

import landingImage from "../../assets/landing.png";

function HeroSection() {
  return (
    <section className="bg-[#F7F5EF] min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-16 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="max-w-2xl">

            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
              <FiHeart
                className="text-[#5F8D7A]"
                size={16}
              />

              <span className="text-sm font-medium text-[#5F8D7A]">
                Your Smile, Our Priority
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#26332D]">
              A Healthier Smile,

              <span className="block text-[#5F8D7A] mt-2">
                A Happier You
              </span>
            </h1>

            {/* Description */}
            <p className="text-[#64756C] text-base sm:text-lg leading-relaxed mt-6 max-w-xl">
              Welcome to Sunrise Dental Clinic. We provide trusted,
              comfortable, and personalized dental care for you and
              your family in a friendly environment.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2
                bg-[#5F8D7A] hover:bg-[#4F7968]
                text-white font-medium
                px-6 py-3.5 rounded-xl
                transition duration-300 shadow-sm"
              >
                <FiCalendar size={19} />
                Contact Us
                <FiArrowRight size={18} />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2
                bg-white hover:bg-[#A8C3B2]/20
                text-[#26332D] font-medium
                px-6 py-3.5 rounded-xl
                border border-[#A8C3B2]
                transition duration-300"
              >
                Learn More
              </Link>

            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8">

              <div className="flex items-center gap-2">
                <FiCheckCircle
                  className="text-[#5F8D7A]"
                  size={18}
                />

                <span className="text-sm text-[#64756C]">
                  Professional Care
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FiCheckCircle
                  className="text-[#5F8D7A]"
                  size={18}
                />

                <span className="text-sm text-[#64756C]">
                  Experienced Dentists
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FiCheckCircle
                  className="text-[#5F8D7A]"
                  size={18}
                />

                <span className="text-sm text-[#64756C]">
                  Comfortable Environment
                </span>
              </div>

            </div>
          </div>

          {/* Right Image */}
          <div className="relative">

            {/* Decorative Background */}
            <div className="absolute -top-8 -right-8 w-36 h-36 bg-[#A8C3B2]/40 rounded-full blur-3xl" />

            <div className="absolute -bottom-10 -left-8 w-44 h-44 bg-[#5F8D7A]/20 rounded-full blur-3xl" />

            {/* Image Container */}
            <div className="relative">

              <div className="bg-white p-3 rounded-[2rem] shadow-2xl">
                <img
                  src={landingImage}
                  alt="Sunrise Dental Clinic"
                  className="
                    w-full
                    h-[400px]
                    sm:h-[460px]
                    lg:h-[540px]
                    object-cover
                    rounded-[1.5rem]
                  "
                />
              </div>

              {/* Floating Card */}
              <div className="absolute bottom-6 left-4 sm:-left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="bg-[#A8C3B2]/30 text-[#5F8D7A] p-3 rounded-xl">
                  <FiHeart size={22} />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#26332D]">
                    Gentle Dental Care
                  </p>

                  <p className="text-xs text-[#64756C] mt-1">
                    Caring for every smile
                  </p>
                </div>
              </div>

              {/* Small Top Badge */}
              <div className="absolute top-6 right-5 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-4 py-3">
                <p className="text-xs text-[#64756C]">
                  Trusted Care
                </p>

                <p className="text-sm font-bold text-[#5F8D7A]">
                  For Your Family
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;