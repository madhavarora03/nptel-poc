import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-accent-foreground text-center h-[7.5dvh] flex items-center justify-center border-t mx-12">
      <p className="text-xs">
        &copy; 2024{" "}
        <Link to="/" className="underline">
          Nptel Validator
        </Link>
        . All rights reserved.
      </p>
    </footer>
  );
}
