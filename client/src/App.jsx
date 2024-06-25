import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="w-full">
      <Header />
      <div className="min-h-[82.5dvh] mt-[10dvh] px-2">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}
