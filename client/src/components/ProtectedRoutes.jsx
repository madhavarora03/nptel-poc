import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import useAuth from "@/context/AuthContext";
import { useEffect } from "react";
import { Loader } from "lucide-react";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Header />
      <div className="min-h-[82.5vh] mt-[10vh] px-2">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
