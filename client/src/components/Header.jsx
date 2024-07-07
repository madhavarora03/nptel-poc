import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import useAuth from "@/context/AuthContext";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  const menu = useRef(null);
  const navigate = useNavigate();

  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    const handleClick = (e) => {
      if (menu.current && !menu.current.contains(e.target)) {
        setToggleMenu(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`bg-primary text-accent flex items-center justify-between px-4 h-[10dvh] fixed top-0 left-0 w-full z-50 ${
        scrolled && "shadow-2xl"
      }`}
    >
      <Logo />
      <div className="relative" ref={menu}>
        <div
          className="hover:bg-blue-700 hover:text-accent space-x-2 flex items-center justify-center px-4 py-3 hover:cursor-pointer rounded-lg transition-colors duration-300"
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <span>{user ? user.name : ""}</span>
          <ChevronDown
            className={`h-5 transition-transform duration-300 ${
              toggleMenu ? "-rotate-180" : ""
            }`}
          />
        </div>
        <div
          className={`absolute bg-slate-800 w-40 rounded-md transition-all ease-in-out duration-300 py-[2px] px-[2px] -right-1 mt-4 ${
            toggleMenu
              ? "top-10 opacity-100"
              : "top-7 opacity-0 pointer-events-none"
          }`}
        >
          <Button
            variant="destructive"
            onClick={() => {
              logout();
              navigate("/auth");
            }}
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
