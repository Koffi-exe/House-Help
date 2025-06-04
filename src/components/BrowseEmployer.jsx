import React, { useState } from "react";
import { useAppstore } from "../store/useAppstore";
import axios from "axios";

const BrowseEmployers = () => {
  const employers = useAppstore((state) => state.employerData) || [];
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const visibleEmployers = showAll ? employers : employers.slice(0, 3);
  const [receiverId, setReceiverId] = useState("");

  const sendMessage = async () => {
    const senderId = JSON.parse(localStorage.getItem("loggedUser")).userId;
    console.log(
      `Message: ${message}, send to: ${receiverId}, send by:${senderId}`
    );
    if (!message || !receiverId || !senderId) {
      return alert("message, senderId and ReciverId are required");
    }
    try {
      await axios.post("http://54.175.255.7:5000/api/message/send", {
        senderId,
        receiverId,
        content: message,
      });
      alert('Message sent!')
    } catch (error) {
      alert("internal server error");
    }
    setMessage("");
    setShowModal(false);
  };

  return (
    <section
      style={{
        background:
          "linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 38%, rgba(0, 212, 255, 1) 100%)",
      }}
      className="py-20 px-10 text-white"
    >
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl shadow-lg p-6 w-96 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Send Message</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              className="w-full h-32 p-2 border rounded-md border-gray-300"
            />
            <button
              onClick={sendMessage}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-12">Browse Employers</h2>

        {employers.length <= 0 ? (
          <div>Login/Register to see employer</div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
              {visibleEmployers.map((employer, index) => (
                <div
                  onClick={() => {
                    setReceiverId(employer.userId);
                    setShowModal(true);
                  }}
                  key={index}
                  className="bg-white bg-opacity-50 rounded-xl p-6 hover:bg-opacity-20 transition duration-300 flex flex-col items-center text-center"
                  style={{ height: "400px" }}
                >
                  <div
                    className="rounded-xl bg-blue-400 w-full"
                    style={{ height: "50%" }}
                  >
                    {employer.image ? (
                      <img
                        className="rounded-xl opacity-60 object-cover w-full h-full"
                        src={`http://54.175.255.7:5000/employeruploads/${employer.image}`}
                        alt={employer.name}
                      />
                    ) : (
                      <img
                        className="rounded-xl opacity-60 object-cover w-full h-full"
                        src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="default employer"
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mt-4 mb-1">
                    {employer.name}
                  </h3>
                  <p className="text-sm text-white text-opacity-90 mb-1">
                    Location: {employer.city}
                  </p>
                  <p className="text-sm text-white text-opacity-90 mb-1">
                    Job Description:{" "}
                    {employer.jobDescription || "Not specified"}
                  </p>
                  <p className="text-sm text-yellow-400">
                    ⭐ {employer.rating || "N/A"}
                  </p>
                </div>
              ))}
            </div>

            {employers.length > 3 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-10 text-white bg-white bg-opacity-20 px-6 py-2 rounded-full hover:bg-opacity-30 transition duration-300"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BrowseEmployers;
