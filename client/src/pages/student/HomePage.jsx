import PendingRequest from "@/components/PendingRequest";
import CompleteRequest from "@/components/CompletedRequest";
import useAuth from "@/context/AuthContext";
import AssignedSubjects from "@/components/AssignedSubjects";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import NewSubjectForm from "@/components/NewSubjectForm";

export default function HomePage() {
  const { user } = useAuth();
  if (user && user.role === "student") {
    return (
      <div className="h-full w-full">
        <h1 className="underline">Pending Requests</h1>
        <PendingRequest />
        <h1 className="mt-8 underline">Completed Requests</h1>
        <CompleteRequest />
      </div>
    );
  }
  return (
    <div>
      <h1>Alloted Subjects</h1>
      <AssignedSubjects />
      <div className="flex justify-center items-center py-4">
        <Dialog>
          <DialogTitle></DialogTitle>
          <DialogTrigger>
            <Button>New Request</Button>
          </DialogTrigger>
          <DialogContent>
            <NewSubjectForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
