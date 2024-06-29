import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function ProtectedRoutes() {
  return (
    <div className="w-full">
      <Header />
      <div className="min-h-[82.5dvh] mt-[10dvh] px-2">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
