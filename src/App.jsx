import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// The function that fetches data from DB
import initApp from "./services/initApp.js";

// zustand store
import { useAppstore } from "./store/useAppstore";

//components
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import HeroSection from "./components/HeroSection.jsx";
import RegisterEmployer from "./components/RegisterEmployer.jsx";
import RegisterEmployee from "./components/RegisterEmployee.jsx";
import Protected from "./components/Protected.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import BrowseHouseHelp from "./components/BrowseHouseHelp.jsx";
import BrowseEmployers from "./components/BrowseEmployer.jsx";
import Footer from "./components/Footer.jsx";
import ChatBox from "./components/dashboard/MessageTab.jsx";

function App() {

useEffect(()=>{
  const loggeduser = localStorage.getItem('loggedUser')
  if(loggeduser){
    initApp()
  }
},[])

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <ServicesSection />
              <HowItWorks />
              <BrowseHouseHelp />
              <BrowseEmployers />
              <Footer />
            </>
          }
        />
        {/* <Route path="/testing" element={<ChatBox/>} /> */}
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route path="/registeremployer" element={<RegisterEmployer />} />
        <Route path="/registeremployee" element={<RegisterEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
