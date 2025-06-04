import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import initApp from "../services/initApp";

const skillsList = [
  "Cleaning",
  "Cooking",
  "Childcare",
  "Elderly Care",
  "Gardening",
  "Laundry",
  "Pet Care",
  "Grocery Shopping",
  "Meal Preparation",
];

const availabilities = ["Full time", "Part time", "Weekends only", "Flexible"];

const RegisterEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    image: null,
    userType: "Employee",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    aadharNumber: "",
    city: "",
    skills: ["No skill specified"],
    experience: "",
    availability: "",
    expectedSalary: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSkillChange = (skill) => {
    setFormData((prev) => {
      const updatedSkills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s != skill)
        : [...prev.skills.filter((s) => s != "No skill specified"), skill];

      return { ...prev, skills: updatedSkills };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      if (key == "skills") {
        formData.skills.forEach((skill) => form.append("skills", skill));
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        "https://house-help-server.onrender.com/api/register/employee",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.status==201) {
        const {
          name,
          email,
          phoneNumber,
          city,
          expectedSalary,
          userType,
          token,
          skills,
          image,
          userId
        } = response.data;
        localStorage.setItem(
          "loggedUser",
          JSON.stringify({
            name,
            userId,
            email,
            phoneNumber,
            city,
            expectedSalary,
            userType,
            token,
            image,
            skills
          })
        );
      }
      initApp()
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      if (error.response.status == 500) {
        return alert(error.response.data.message.message);
      }
      alert(error.response.data.message);
    }
  };

  // useEffect(()=>console.log(formData[skillsList]), [formData[skillsList]])

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl  mx-auto mt-24 bg-white shadow-lg rounded-lg p-8"
    >
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
      <h2 className="text-3xl text-center font-bold text-blue-600 mb-6">
        Register as Employee
      </h2>

      {/* Tailwind Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label>Full name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className={`${inputClass}`}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`${inputClass}`}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`${inputClass}`}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={`${inputClass}`}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className={`${inputClass}`}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Aadhar Number</label>
          <input
            type="text"
            name="aadharNumber"
            placeholder="Aadhar Number"
            className={`${inputClass}`}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            className={`${inputClass}`}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Experience</label>
          <input
            type="number"
            name="experience"
            placeholder="Years of Experience"
            className={`${inputClass}`}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Expected Salary</label>
          <input
            type="number"
            name="expectedSalary"
            placeholder="Expected Salary"
            className={`${inputClass}`}
            onChange={handleChange}
          />
        </div>

        <div className="text-gray-800">
          <label>profile picture</label>
          <input
            type="file"
            name="image"
            className="w-full"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* MUI Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Availability</InputLabel>
          <Select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
          >
            {availabilities.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Skills Checkboxes */}
      <div>
        <h2>Skills </h2>
        <div className="grid grid-col-2 md:grid-cols-3 gap-2">
          {skillsList.map((skill) => {
            const isActive = formData.skills.includes(skill);
            const activeClass = isActive
              ? "bg-blue-300 text-gray-800 hover:text-black border-blue-500 font-medium"
              : "bg-white text-gray-800";
            return (
              <button
                className={`text-left px-3 py-3 rounded-md text-sm ${activeClass}  transition hover:bg-blue-100 border-[1px] border-black`}
                key={skill}
                type="button"
                onClick={() => handleSkillChange(skill)}
              >
                {isActive && <span>✔ </span>}
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterEmployee;
