import { Outlet } from "react-router-dom";
import LoginHeader from "./LoginHeader";
// import { useEffect } from "react";

export default function AuthOutlet() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (userRef) {
  //     navigate("/");
  //   }
  // }, [userRef, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoginHeader />
      <Outlet />
    </div>
  );
}
