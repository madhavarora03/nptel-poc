import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ValidatedRequest from "@/components/ValidatedRequest";

export default function SubjectPage() {
  const { subject_code } = useParams();
  return (
    <>
      <div className="flex items-center sticky top-[10dvh] bg-white z-10 border-b">
        <Link to="/validation">
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