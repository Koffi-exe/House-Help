import { useState } from "react";
import { FaRegUser, FaCog } from "react-icons/fa";
import { FiMessageCircle} from "react-icons/fi";
import ProfileTab from "./dashboard/ProfileTab";
import MessageTab from "./dashboard/MessageTab";
import SettingsTab from "./dashboard/SettingsTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const NoParsedUser = localStorage.getItem("loggedUser");
  const user = JSON.parse(NoParsedUser);

  const tabs = [
    { name: "Profile", icon: <FaRegUser className="inline mr-2" /> },
    { name: "Messages", icon: <FiMessageCircle className="inline mr-2" /> },
    { name: "Settings", icon: <FaCog className="inline mr-2" /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab user={user} />;
      case "Messages":
        return <MessageTab />;
      case "Settings":
        return <SettingsTab />;
      default:
        return null;
    }
  };
  return (
    <div className="flex h-screen bg-white gap-2">
      {/* Sidebar */}
      <div
        className="w-1/4 p-6 "
      >
        <div className="ml-8 p-10 shadow-lg shadow-black bg-white rounded-xl">
          <ul className="space-y-4">
            {tabs.map(({ name, icon }) => (
              <li key={name}>
                <button
                  onClick={() => setActiveTab(name)}
                  className={`w-full text-left px-4 py-2 rounded-md font-medium ${
                    activeTab === name
                      ? "bg-blue-100 text-teal-500 border-[1px] border-teal-600"
                      : "text-gray-600 hover:bg-blue-100"
                  }`}
                >
                  {icon}
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-3/4 p-2">
        <div className="h-full shadow-2xl text-gray-700 z-50">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
