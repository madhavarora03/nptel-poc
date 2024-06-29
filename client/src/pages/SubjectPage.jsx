import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ValidatedRequest from "@/components/ValidatedRequest";
import useAuth from "@/context/AuthContext";

export default function SubjectPage() {
  const navigate = useNavigate("/");
  const { subject_code } = useParams();
  const { user } = useAuth();

  if (user && user.role === "student") {
    navigate("/");
  }

  return (
    <>
      <div className="flex items-center sticky top-[10dvh] bg-white z-10 border-b">
        <Link to="/">
          <Button variant="ghost">
            <ArrowLeft />
          </Button>
        </Link>
        <h1>{subject_code}</h1>
      </div>
      <ValidatedRequest />
    </>
  );
}
