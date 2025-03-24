import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, BookOpen, LayoutDashboard, LogIn } from "lucide-react";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg flex flex-col p-6">
        <div className="text-2xl font-bold mb-8">MyApp</div>
        <div className="flex flex-col space-y-4 flex-grow">
          <Link
            to="/"
            className="flex items-center space-x-3 text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            to="/training"
            className="flex items-center space-x-3 text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            <BookOpen className="w-5 h-5" />
            <span>Training</span>
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
        </div>
        <Button
          onClick={handleLoginClick}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
        >
          <LogIn className="w-5 h-5" />
          <span>Login</span>
        </Button>
      </nav>

      {/* Main Content */}
      <div className="flex-grow p-4 pl-64"> {/* Adjust padding-left to match sidebar width */}
        {children}
      </div>
    </div>
  );
};

export default Layout;