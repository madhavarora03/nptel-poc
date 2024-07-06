import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function LoginHeader() {
  return (
    <header className="w-full fixed top-0 left-0 flex items-center justify-between px-4 h-[10dvh]">
      <Logo />
      <div className="space-x-8">
        <NavLink
          to="/auth"
          className={({ isActive }) =>
            `${isActive ? "text-white font-semibold" : ""}`
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            `${isActive ? "text-white font-semibold" : ""}`
          }
        >
          Register
        </NavLink>
      </div>
    </header>
  );
}
