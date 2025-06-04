import React from "react";
import {
  FaRegUser,
  FaStar,
  FaRegCalendar,
  FaRegClipboard,
} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { HiOutlineMailOpen, HiOutlineBriefcase } from "react-icons/hi";

const ProfileTab = ({ user }) => {
  let image = user.image || "";
  const userType = user.userType;
  return (
    <div>
      <div
        className="w-full h-full relative flex gap-10 rounded-lg"
        style={{
          background:
            "linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 38%, rgba(0, 212, 255, 1) 100%)",
        }}
      >
        <div className="absolute top-10 left-10 z-10 h-4/5 w-1/4 rounded-xl shadow-lg shadow-slate-500 bg-white">
          {/**Left container static container */}
          <div
            className="h-2/3 bg-center bg-cover rounded-tr-xl"
            style={{
              backgroundImage: image
                ? `url(https://house-help-server.onrender.com/${
                    userType === "Employer"
                      ? "employeruploads"
                      : "employeeuploads"
                  }/${image})`
                : `url(https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800)`,
            }}
          ></div>
          <div className="px-5 py-5 ">
            {/**details container below image */}
            <div className="flex items-center mt-2 ">
              {/** name div below image*/}
              <FaRegUser className="inline mr-2 h-5 w-5" />
              <span>
                <p className="text-gray-700 text-sm">Name</p>
                <p className="font-bold">
                  {JSON.parse(localStorage.getItem("loggedUser")).name}
                </p>
              </span>
            </div>
            <div className="mt-2 flex items-center">
              {/**email div below image */}
              <GrLocation className="inline mr-2 h-5 w-5 " />
              <span>
                <p className="text-gray-700 text-sm">Location</p>
                <p className="font-bold">
                  {JSON.parse(localStorage.getItem("loggedUser")).city
                    ? JSON.parse(localStorage.getItem("loggedUser")).city
                    : "--"}
                </p>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full h-full">
          <div className="flex w-full h-1/5 rounded-t-lg">
            <div className=" w-2/6 h-full"></div>
            <div className=" w-4/6 h-full flex flex-col justify-center gap-2 text-gray-50 font-medium p-10 ">
              <div>
                <FaRegUser className="inline mr-2 text-xl" />
                <span className="text-xl">Personal Information</span>
              </div>
              <p>Your personal information and contact details</p>
            </div>
          </div>
          <div className="flex w-full h-4/5">
            <div className="w-1/3 bg-white "></div>
            <div className="w-2/3 bg-white p-10">
              <div className=" w-full flex  h-full">
                <div className="w-1/2  h-full ">
                  <div className="flex  py-5 gap-2 items-center">
                    <HiOutlineMailOpen className="w-6 h-6 inline" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-md font-semibold text-gray-700">
                        {user?.email || "--"}
                      </p>
                    </div>
                  </div>
                  <div className="py-5 flex items-center gap-2">
                    <FiPhone className="w-6 h-6" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-md font-semibold text-gray-700">
                        {user?.phoneNumber || "--"}
                      </p>
                    </div>
                  </div>
                  <div className="py-5 flex items-center gap-2">
                    <HiOutlineBriefcase className="w-6 h-6" />
                    <div>
                      <p className="text-sm text-gray-500">Jobs Completed</p>
                      <p className="text-md font-semibold text-gray-700">
                        {user?.jobsCompleted || "--"}
                      </p>
                    </div>
                  </div>
                  <div className="py-5 flex items-center gap-2">
                    <FaStar className="w-5 h-5 " />
                    <div>
                      <p className="text-sm text-gray-500">Rating</p>
                      <p className="text-md font-semibold text-gray-700">
                        {user?.rating || "--"}
                      </p>
                    </div>
                  </div>
                  <div className="py-5 flex items-center gap-2">
                    <FaRegCalendar className="w-5 h-5 " />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="text-md font-semibold text-gray-700">
                        {user?.memberSince || "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-full w-1/2 px-10">
                  <div className="flex py-5 gap-2  items-center">
                    <FaRegClipboard className="w-8 h-8 " />
                    <div>
                      <p className="text-sm text-gray-500">
                        {user?.userType === "Employee"
                          ? "Skills"
                          : "Job Description"}
                      </p>
                      <p className="text-md font-semibold text-gray-700">
                        {user?.userType === "Employee"
                          ? user?.skills?.join(", ") || "No Skills"
                          : user?.userType === "Employer"
                          ? user?.jobDescription
                          : "--"}
                      </p>
                    </div>
                  </div>
                  <div className=" h-3/4 flex px-20 pt-10">
                    <h1>LOGO</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
