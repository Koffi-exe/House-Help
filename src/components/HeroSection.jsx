import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        background:
          "linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 38%, rgba(0, 212, 255, 1) 100%)",
      }}
      className="min-h-[50vh] text-gray-100 flex items-center justify-center px-6 sm:px-10 lg:px-12 py-16"
    >
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-20 w-full max-w-7xl font-sans">
        {/* Left: Main Content */}
        <div className="flex flex-col text-center lg:text-left items-center lg:items-start">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 max-w-xl leading-tight">
            Find trusted house help
          </h1>
          <p className="max-w-xl text-lg sm:text-xl">
            Connect with experienced professionals or find employment opportunities
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-8">
            <button
              onClick={() => navigate("/registeremployer")}
              className="bg-blue-600 px-6 sm:px-8 py-3 rounded-md text-base sm:text-lg font-semibold transition hover:bg-blue-700"
            >
              Find House Help
            </button>
            <button
              onClick={() => navigate("/registeremployee")}
              className="border border-white bg-white bg-opacity-0 px-6 sm:px-8 py-3 rounded-md text-base sm:text-lg font-semibold transition hover:bg-opacity-30"
            >
              Become a House Help
            </button>
          </div>
        </div>

        {/* Right: Rating Box */}
        <div className="bg-white rounded-lg px-6 py-3 flex items-center space-x-3 text-gray-700 text-base sm:text-lg shadow-md">
          <span className="text-yellow-400 text-xl">★</span>
          <span className="font-medium">4.5/5</span>
          <span>| 500+ Verified Professionals</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
