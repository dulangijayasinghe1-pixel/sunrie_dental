import {
  FiSmile,
  FiActivity,
  FiHeart,
  FiShield,
  FiSun,
  FiStar,
  FiArrowRight,
} from "react-icons/fi";

function ServicesSection() {
  const services = [
    {
      icon: FiSmile,
      title: "General Dentistry",
      description:
        "Complete dental care including regular checkups, cleanings, fillings, and preventive treatments.",
    },
    {
      icon: FiActivity,
      title: "Dental Cleaning",
      description:
        "Professional cleaning to maintain healthy teeth, gums, and a fresh, confident smile.",
    },
    {
      icon: FiHeart,
      title: "Cosmetic Dentistry",
      description:
        "Enhance your smile with personalized cosmetic dental treatments designed for you.",
    },
    {
      icon: FiShield,
      title: "Preventive Care",
      description:
        "Regular dental examinations and preventive care to protect your oral health.",
    },
    {
      icon: FiSun,
      title: "Teeth Whitening",
      description:
        "Brighten your smile with professional teeth whitening treatments in a comfortable environment.",
    },
    {
      icon: FiStar,
      title: "Family Dental Care",
      description:
        "Gentle and reliable dental care for children, adults, and the whole family.",
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-[#A8C3B2]/25 text-[#5F8D7A] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <FiHeart size={15} />
            Our Services
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26332D] leading-tight">
            Complete Care for Your

            <span className="block text-[#5F8D7A] mt-2">
              Healthy Smile
            </span>
          </h2>

          <p className="text-[#64756C] mt-5 leading-relaxed">
            We offer a wide range of dental services focused on
            keeping your smile healthy, beautiful, and confident.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="
                  group
                  relative
                  bg-[#F7F5EF]
                  rounded-[1.75rem]
                  p-7
                  border border-transparent
                  hover:border-[#A8C3B2]
                  hover:bg-white
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                {/* Number */}
                <span className="absolute top-6 right-7 text-xs font-semibold text-[#A8C3B2]">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div
                  className="
                    w-14
                    h-14
                    flex
                    items-center
                    justify-center
                    bg-white
                    group-hover:bg-[#5F8D7A]
                    text-[#5F8D7A]
                    group-hover:text-white
                    rounded-2xl
                    shadow-sm
                    group-hover:shadow-md
                    group-hover:scale-105
                    transition-all
                    duration-300
                  "
                >
                  <Icon size={27} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#26332D] mt-6">
                  {service.title}
                </h3>

                <p className="text-[#64756C] text-sm leading-6 mt-3">
                  {service.description}
                </p>

                {/* Bottom Line */}
                <div
                  className="
                    w-10
                    h-1
                    bg-[#A8C3B2]
                    rounded-full
                    mt-6
                    group-hover:w-16
                    group-hover:bg-[#5F8D7A]
                    transition-all
                    duration-300
                  "
                />

                {/* Learn More */}
                <div className="flex items-center gap-2 mt-5 text-sm font-semibold text-[#5F8D7A] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More
                  <FiArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="relative overflow-hidden mt-14 bg-[#5F8D7A] rounded-[2rem] p-8 lg:p-10 text-center shadow-lg">

          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

          <div className="absolute -bottom-20 -left-16 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/15 text-white rounded-xl mb-4">
              <FiHeart size={23} />
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              Your Smile Deserves the Best Care
            </h3>

            <p className="text-white/80 mt-3 max-w-2xl mx-auto leading-6">
              Our team is committed to providing comfortable,
              personalized, and professional dental care for every patient.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;