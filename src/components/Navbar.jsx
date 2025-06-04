import axios from "axios";
import { useRef, useState } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import initApp from "../services/initApp";

const Navbar = () => {
  const navigate = useNavigate();

  const modelRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOuterClose = (e) => {
    // console.log(modelRef.current, modelRef.current.contains(e.target));
    if (modelRef.current && !modelRef.current.contains(e.target)) {
      setShowLogin(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post("http://54.175.255.7:5000/api/login", {
        password,
        email,
      });
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({
          userId: response.data.userId,
          name: response.data.name,
          email: response.data.email,
          offerSalary: response.data.offerSalary,
          phoneNumber: response.data.phoneNumber,
          token: response.data.token,
          userType:response.data.userType,
          city:response.data.city,
          jobDescription:response.data.jobDescription,
          image:response.data.image,
          skills: response.data.skills
        })
      );
      setPassword("");
      setEmail("");
      setShowLogin(false);
      setIsLoading(false);
      initApp()
      navigate("/dashboard");
    } catch (error) {
      if (error.status == 400) {
        setFormError("Invalid credentials");
      } else {
        setFormError("Internal Server Error");
      }
      setIsLoading(false);
      setTimeout(() => {
        setFormError('')
      }, 2000);
    }
  };

  const loggeduser = JSON.parse(localStorage.getItem("loggedUser"));
  // console.log("user from appbar", loggeduser);

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };
  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <>
      <header className="bg-white shadow-lg top-0 sticky z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={navigateToHome}
              className="flex-shrink-0 text-teal-700 text-2xl font-bold"
            >
              HomeHelp
            </button>

            {/* Right side links */}
            <div className="flex items-center space-x-6">
              {loggeduser && (
                <button
                  onClick={navigateToDashboard}
                  className="text-gray-700 hover:text-blue-900 "
                >
                  Dashboard
                </button>
              )}
              {!loggeduser && (
                <button
                  onClick={() => setShowLogin((prev) => !prev)}
                  className="flex text-gray-700 items-center  hover:text-blue-900 "
                >
                  <FaUser className="mr-1" />
                  Login
                </button>
              )}
              {loggeduser && (
                <button
                  onClick={() => {
                    localStorage.removeItem("loggedUser");
                    navigate("/");
                  }}
                  className="flex text-gray-700 items-center  hover:text-blue-900 "
                >
                  <FaSignOutAlt className="mr-1" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {showLogin && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={handleOuterClose}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-xl w-96"
            ref={modelRef}
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Login</h2>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter your password"
                />
              </div>
              <div className="text-sm text-red-600">{formError}</div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
