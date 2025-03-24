import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, BookOpen, LayoutDashboard, LogIn, Menu, Shield } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

  const handleLoginClick = () => {
    navigate("/auth");
  };

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 lg:hidden p-2 bg-gray-200 rounded-lg shadow-md z-50"
      >
        <Menu className="w-7 h-7 text-gray-700" />
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed left-0 top-0 h-screen w-64 bg-white shadow-lg flex flex-col p-6 transition-transform duration-300 z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">E-Learning</h2>
        <div className="flex flex-col space-y-6 flex-grow">
          <NavItem to="/" icon={<Home className="w-6 h-6" />} label="Home" />
          <NavItem to="/training" icon={<BookOpen className="w-6 h-6" />} label="Training" />
          <NavItem to="/dashboard" icon={<LayoutDashboard className="w-6 h-6" />} label="Dashboard" />
          {isAdmin && <NavItem to="/admin" icon={<Shield className="w-6 h-6" />} label="Admin" />}
        </div>
        <Button
          onClick={handleLoginClick}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md py-2 px-4 rounded-lg"
        >
          <LogIn className="w-5 h-5" />
          <span>Login</span>
        </Button>
      </nav>
    </>
  );
};

const NavItem = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center space-x-4 text-lg font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gray-100"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
