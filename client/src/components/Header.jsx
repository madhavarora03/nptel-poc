import { useEffect, useState } from "react";
import Logo from "./Logo";
import useAuth from "@/context/AuthContext";
import { Button } from "./ui/button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  const { logout } = useAuth();

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
      <Button variant="destructive" onClick={logout}>
        Logout
      </Button>
    </header>
  );
}
