import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle("dark", !isDarkTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleNavigation = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const handleLinkNavigation = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`p-4 shadow-sm sticky top-0 z-50 ${
          isDarkTheme ? "bg-gray-800" : "bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CodeX{"<>"}
          </h1>

          {/* Navbar Links */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <button
                onClick={() => handleLinkNavigation("/algorithms")}
                className={`cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                  isDarkTheme
                    ? "text-gray-300 hover:text-purple-400"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Algorithm
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkNavigation("/compiler")}
                className={`cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                  isDarkTheme
                    ? "text-gray-300 hover:text-purple-400"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Compiler
              </button>
            </li>
          </ul>

          {/* Right Section: Theme toggle + User/Login */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-full shadow transition-all duration-300 flex items-center justify-center ${
                isDarkTheme
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {isDarkTheme ? (
                <FaSun className="w-4 h-4" />
              ) : (
                <FaMoon className="w-4 h-4" />
              )}
            </button>

            {/* User Dropdown OR Login Button */}
            {user ? (
              <div className="relative flex items-center space-x-2">
                <FaUserCircle className="text-xl" />
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                    isDarkTheme
                      ? "text-gray-300 hover:text-purple-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  {user.Name}
                </button>
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50"
                  >
                    <button
                      onClick={() => navigate("/profile")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                  isDarkTheme
                    ? "text-gray-300 hover:text-purple-400"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Split Screen Content */}
      <main className="min-h-[90vh] flex flex-col lg:flex-row">
        {/* Text Content - Left Half */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Build Next-Gen Code
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                with CodeX{"<>"}
              </span>
            </h2>
            <p className="text-lg mb-8">
              Empower your development process with AI-driven insights,
              real-time collaboration, and seamless deployment pipelines.
            </p>
            <div className="flex gap-10 px-20">
              <button
                onClick={() => handleNavigation("/algorithms")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 text-white rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm font-medium w-fit"
              >
                Explore
              </button>
              {/* <button
                onClick={() => handleNavigation("/compiler")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-white rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm font-medium w-fit"
              >
                Compiler
              </button> */}
            </div>
          </div>
        </div>

        {/* Image Section - Right Half */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 blur-2xl opacity-30 rounded-xl"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Developer coding illustration"
                className="w-full h-full object-cover"
              />
              {/* Screen Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>

              {/* Project Name Badge */}
              <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <span className="text-white font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  codeX
                </span>
              </div>

              <div className="absolute bottom-8 left-8 bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-sm">Live Collaboration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <span className="text-sm">AI Code Review</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-6 ${
          isDarkTheme
            ? "bg-gray-800 text-gray-300"
            : "bg-white/80 text-gray-600"
        }`}
      >
        <div className="container mx-auto text-center">
          <p>© 2025 codeX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
