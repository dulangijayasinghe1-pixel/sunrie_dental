import {
  FiCheckCircle,
  FiHeart,
  FiUsers,
  FiAward,
} from "react-icons/fi";

import aboutImage from "../../assets/about.png";

function AboutSection() {
  const features = [
    "Experienced dental professionals",
    "Modern and comfortable environment",
    "Personalized treatment for every patient",
    "Friendly and caring service",
  ];

  return (
    <section className="bg-[#F7F5EF] py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left - Image */}
          <div className="relative">

            {/* Decorative background shapes */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#A8C3B2]/40 rounded-full blur-2xl" />

            <div className="absolute -bottom-10 -right-8 w-40 h-40 bg-[#5F8D7A]/20 rounded-full blur-3xl" />

            {/* Main Image Card */}
            <div className="relative bg-white p-3 rounded-[2rem] shadow-xl">

              <img
                src={aboutImage}
                alt="About Sunrise Dental Clinic"
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-[1.5rem]"
              />

            </div>

            {/* Experience Card */}
            <div className="absolute bottom-6 right-4 lg:-right-6 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4">
              <div className="bg-[#A8C3B2]/30 text-[#5F8D7A] p-3 rounded-xl">
                <FiAward size={25} />
              </div>

              <div>
                <p className="text-2xl font-bold text-[#26332D]">
                  10+
                </p>

                <p className="text-sm text-[#64756C]">
                  Years of Care
                </p>
              </div>
            </div>

          </div>

          {/* Right - Content */}
          <div>

            {/* Label */}
            <span className="inline-flex items-center gap-2 bg-white text-[#5F8D7A] text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
              <FiHeart size={16} />
              About Sunrise Dental
            </span>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26332D] leading-tight mt-5">
              Caring for Your Smile

              <span className="block text-[#5F8D7A] mt-2">
                Every Step of the Way
              </span>
            </h2>

            {/* Description */}
            <p className="text-[#64756C] leading-7 mt-6">
              At Sunrise Dental Clinic, we believe that excellent dental
              care is about more than just treating teeth. It is about
              creating a comfortable experience and helping every patient
              maintain a healthy and confident smile.
            </p>

            <p className="text-[#64756C] leading-7 mt-4">
              Our dedicated team focuses on personalized care, modern
              dental practices, and a friendly environment where patients
              can feel comfortable throughout their treatment journey.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mt-7">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 text-[#5F8D7A]">
                    <FiCheckCircle size={19} />
                  </div>

                  <span className="text-sm text-[#26332D] font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Small Stats */}
            <div className="grid grid-cols-2 gap-4 mt-9">

              {/* Patients */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-[#A8C3B2]/30 text-[#5F8D7A] p-2.5 rounded-xl">
                    <FiUsers size={21} />
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-[#26332D]">
                      1K+
                    </p>

                    <p className="text-xs text-[#64756C]">
                      Happy Patients
                    </p>
                  </div>
                </div>
              </div>

              {/* Patient Care */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-[#A8C3B2]/30 text-[#5F8D7A] p-2.5 rounded-xl">
                    <FiHeart size={21} />
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-[#26332D]">
                      100%
                    </p>

                    <p className="text-xs text-[#64756C]">
                      Patient Care
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;