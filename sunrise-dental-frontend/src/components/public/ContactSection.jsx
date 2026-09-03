import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";

function ContactSection() {
  const contactItems = [
    {
      icon: FiMapPin,
      title: "Our Location",
      content: (
        <>
          Sunrise Dental Clinic
          <br />
          Colombo, Sri Lanka
        </>
      ),
    },
    {
      icon: FiPhone,
      title: "Phone",
      content: "+94 11 234 5678",
    },
    {
      icon: FiMail,
      title: "Email",
      content: "info@sunrisedental.lk",
    },
    {
      icon: FiClock,
      title: "Opening Hours",
      content: (
        <>
          Monday - Saturday: 8:00 AM - 6:00 PM
          <br />
          Sunday: Closed
        </>
      ),
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center bg-[#A8C3B2]/25 text-[#5F8D7A] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Contact Us
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26332D] leading-tight">
            We’re Here to Care

            <span className="block text-[#5F8D7A] mt-2">
              for Your Smile
            </span>
          </h2>

          <p className="text-[#64756C] mt-5 leading-relaxed">
            Have a question or need more information? Get in touch
            with our friendly dental clinic team.
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">

          {/* Contact Information */}
          <div className="relative overflow-hidden bg-[#F7F5EF] rounded-[2rem] p-8 lg:p-10">

            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#A8C3B2]/30 rounded-full blur-2xl" />

            <div className="absolute -bottom-20 -left-16 w-44 h-44 bg-[#5F8D7A]/10 rounded-full blur-3xl" />

            <div className="relative">

              <div className="mb-8">
                <span className="text-sm font-semibold text-[#5F8D7A]">
                  SUNRISE DENTAL CLINIC
                </span>

                <h3 className="text-2xl lg:text-3xl font-bold text-[#26332D] mt-2">
                  Get in Touch
                </h3>

                <p className="text-sm text-[#64756C] mt-2 leading-6">
                  We’re always happy to hear from you. Reach out to
                  us for appointments, questions, or any dental
                  assistance.
                </p>
              </div>

              {/* Contact Items */}
              <div className="space-y-4">
                {contactItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="group bg-white/80 hover:bg-white rounded-2xl p-4 flex gap-4 items-start shadow-sm hover:shadow-md transition duration-300"
                    >
                      <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-[#A8C3B2]/30 group-hover:bg-[#5F8D7A] text-[#5F8D7A] group-hover:text-white rounded-xl transition duration-300">
                        <Icon size={21} />
                      </div>

                      <div>
                        <h4 className="font-semibold text-[#26332D]">
                          {item.title}
                        </h4>

                        <p className="text-sm text-[#64756C] mt-1 leading-6">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-[#A8C3B2]/50 rounded-[2rem] p-8 lg:p-10 shadow-sm hover:shadow-lg transition duration-300">

            <div className="mb-8">
              <span className="text-sm font-semibold text-[#5F8D7A]">
                SEND A MESSAGE
              </span>

              <h3 className="text-2xl lg:text-3xl font-bold text-[#26332D] mt-2">
                How Can We Help?
              </h3>

              <p className="text-sm text-[#64756C] mt-2">
                Fill out the form below and our team will get back
                to you as soon as possible.
              </p>
            </div>

            <form className="space-y-5">

              {/* Name */}
              <div>
                <label className="block mb-2">
                  <span className="text-sm font-medium text-[#26332D]">
                    Your Name
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    bg-[#F7F5EF]
                    border border-[#A8C3B2]
                    text-[#26332D]
                    placeholder:text-[#8A9890]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#5F8D7A]/20
                    focus:border-[#5F8D7A]
                    transition
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2">
                  <span className="text-sm font-medium text-[#26332D]">
                    Email Address
                  </span>
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    bg-[#F7F5EF]
                    border border-[#A8C3B2]
                    text-[#26332D]
                    placeholder:text-[#8A9890]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#5F8D7A]/20
                    focus:border-[#5F8D7A]
                    transition
                  "
                />
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2">
                  <span className="text-sm font-medium text-[#26332D]">
                    Message
                  </span>
                </label>

                <textarea
                  placeholder="Write your message..."
                  className="
                    w-full
                    h-32
                    px-4
                    py-3
                    rounded-xl
                    bg-[#F7F5EF]
                    border border-[#A8C3B2]
                    text-[#26332D]
                    placeholder:text-[#8A9890]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#5F8D7A]/20
                    focus:border-[#5F8D7A]
                    resize-none
                    transition
                  "
                />
              </div>

              {/* Button */}
              <button
                type="button"
                className="
                  w-full
                  bg-[#5F8D7A]
                  hover:bg-[#4F7968]
                  text-white
                  font-semibold
                  py-3.5
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-2
                  shadow-sm
                  hover:shadow-md
                  hover:-translate-y-0.5
                  transition
                  duration-300
                "
              >
                Send Message
                <FiArrowRight size={18} />
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ContactSection;