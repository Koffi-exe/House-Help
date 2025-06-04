import React from "react";

const steps = [
  {
    title: "Browse",
    description: "Explore a wide range of house help services based on your needs.",
    icon: "🔍",
  },
  {
    title: "Review Ratings",
    description: "Check verified reviews and ratings from other users.",
    icon: "⭐",
  },
  {
    title: "Ask for Contact Info",
    description: "Send a request to the house help to share their contact details.",
    icon: "📨",
  },
  {
    title: "Contact Directly",
    description: "Connect with them directly through call or message.",
    icon: "📞",
  },
  {
    title: "Done!",
    description: "Hire confidently and get the help you need, fast and secure.",
    icon: "✅",
  },
];

const HowItWorks = () => {
  return (
    <section
      style={{
        background:
          "linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 38%, rgba(0, 212, 255, 1) 100%)",
      }}
      className="py-20 px-10 text-white"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-12">How It Works</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 rounded-xl p-6 hover:bg-opacity-20 transition duration-300 flex flex-col items-center text-center"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{`${index + 1}. ${step.title}`}</h3>
              <p className="text-sm text-white text-opacity-90">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
