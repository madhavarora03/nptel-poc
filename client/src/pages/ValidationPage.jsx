import AssignedSubjects from "@/components/AssignedSubjects";
import NewSubjectForm from "@/components/NewSubjectForm";
// import ValidatedRequest from "@/components/ValidatedRequest";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ValidationPage() {
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
