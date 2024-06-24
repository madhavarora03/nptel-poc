import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

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
      className={`bg-primary text-accent flex items-center px-4 h-[10dvh] fixed top-0 left-0 w-full z-50 ${
        scrolled && "shadow-2xl"
      }`}
    >
      <Link to="/" className="text-2xl flex items-center gap-x-2">
        <img src="/logo.svg" alt="" className="h-[6dvh]" />
        Nptel Validator
      </Link>
    </header>
  );
}
