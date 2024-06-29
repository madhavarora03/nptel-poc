import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <div className="w-full">
      <div>
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}
