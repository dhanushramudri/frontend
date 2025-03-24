import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import GetModules from "./components/getcomp/GetModules";
import ModuleDetails from "./components/getcomp/ModuleDetails";
import ProgressTracker from "./components/ProgressTracker";
import Admin from "./components/createcomp/Admin";
const Home = lazy(() => import("./pages/Home"));
const Training = lazy(() => import("./pages/Training"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Auth = lazy(() => import("./pages/Auth"));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/training" element={<Training />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/modules" element={<GetModules />} />
          <Route path="/modules/:id" element={<ModuleDetails />} />
          <Route path="/progress/:id" element={<ProgressTracker />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
