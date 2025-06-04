import React from "react";

const services = [
  { title: "Driving", icon: "🚗" },
  { title: "Cooking", icon: "🍳" },
  { title: "Cleaning", icon: "🧹" },
  { title: "Babysitting", icon: "👶" },
  { title: "Gardening", icon: "🌿" },
  { title: "Elder Care", icon: "🧓" },
];

const ServicesSection = () => {
  return (
    <section
      // style={{
      //   background:
      //     "linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 38%, rgba(0, 212, 255, 1) 100%)",
      // }}
      className="py-20 px-10 "
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              // style={{
              //   background:
              //     "linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 38%, rgba(0, 212, 255, 1) 100%)",
              // }}
              className="bg-blue-600  cursor-pointer rounded-xl p-6 flex flex-col items-center text-center hover:bg-opacity-50 transition duration-300"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
