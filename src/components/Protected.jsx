import axios from "axios";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Protected = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const token = JSON.parse(localStorage.getItem("loggedUser"))?.token;
  if (!token) return <Navigate to="/" replace />;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.post(
          "https://house-help-server.onrender.com/api/verify-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.valid) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.log("Token validation failed");
        setIsValid(false);
        localStorage.removeItem("loggedUser");
      }
    };
    verifyToken();
  }, [token]);

  if (isValid == null) {
    return (
      <div>
        <h1>Loading...</h1>
        <p>High wating time? Consider loging in again.</p>
      </div>
    );
  }
  return isValid ? children : <Navigate to="/" replace />;
};
export default Protected;
