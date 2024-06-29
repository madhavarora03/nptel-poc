import { Outlet, useNavigate } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import useAuth from "@/context/AuthContext";
import { useEffect } from "react";
import { Loader } from "lucide-react";

export default function AuthOutlet() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
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
    <div className="flex flex-col items-center justify-center h-screen">
      <LoginHeader />
      <Outlet />
    </div>
  );
}
