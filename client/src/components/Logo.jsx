import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="text-2xl flex items-center gap-x-2 text-white">
      <img src="/logo.svg" alt="" className="h-[6dvh]" />
      Nptel Validator
    </Link>
  );
}
