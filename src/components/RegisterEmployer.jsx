import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterEmployer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "Male",
    image: null,
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    aadharNumber: "",
    address: "",
    city: "",
    jobDescription: "",
    offerSalary: "",
    salaryPeriod: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    try {
      const response = await axios.post(
        "https://house-help-server.onrender.com/api/register/employer",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        const {
          name,
          email,
          phoneNumber,
          userId,
          offerSalary,
          token,
          userType,
          image,
          jobDescription,
          city,
        } = response.data;
        localStorage.setItem(
          "loggedUser",
          JSON.stringify({
            name,
            userId,
            email,
            phoneNumber,
            offerSalary,
            token,
            userType,
            jobDescription,
            city,
            image,
          })
        );
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 500) {
        return alert(error.response.data.message.message);
      }
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <>
      <style>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>

      <section
        style={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 38%, rgba(0,212,255,1) 100%)",
        }}
        className="py-16 min-h-screen flex items-center justify-center"
      >
        <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg p-10">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
            Register as an Employer
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              placeholder="Full Name"
              className={inputClass}
            />
            <select
              name="gender"
              required
              onChange={handleChange}
              className={inputClass}
            >
              <option disabled>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              placeholder="Email"
              className={inputClass}
            />
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              placeholder="Password"
              className={inputClass}
            />
            <input
              type="password"
              name="confirmPassword"
              required
              onChange={handleChange}
              placeholder="Confirm Password"
              className={inputClass}
            />
            <input
              type="tel"
              name="phoneNumber"
              required
              onChange={handleChange}
              placeholder="Phone Number"
              className={inputClass}
            />
            <input
              type="text"
              name="aadharNumber"
              required
              onChange={handleChange}
              placeholder="Aadhar Number"
              className={inputClass}
            />
            <input
              type="text"
              name="address"
              required
              onChange={handleChange}
              placeholder="Address"
              className={inputClass}
            />
            <input
              type="text"
              name="city"
              required
              onChange={handleChange}
              placeholder="City"
              className={inputClass}
            />
            <textarea
              name="jobDescription"
              required
              onChange={handleChange}
              placeholder="Job Description"
              className={inputClass}
            />
            <input
              type="number"
              name="offerSalary"
              required
              onChange={handleChange}
              placeholder="Offered Salary (₹)"
              className={inputClass}
            />
            <select
              name="salaryPeriod"
              required
              value={formData.salaryPeriod}
              onChange={handleChange}
              className={inputClass}
            >
              <option>Salary Period</option>
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Daily</option>
            </select>
            <button
              type="submit"
              className="col-span-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md mt-4"
            >
              Register
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default RegisterEmployer;
