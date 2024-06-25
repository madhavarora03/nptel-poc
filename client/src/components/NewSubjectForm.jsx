import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";

export default function NewSubjectForm() {
  const { toast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("coordinator", "Dr. John Doe");

    try {
      await axios.post("http://localhost:5000/subject", formData);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to add subject",
        variant: "destructive",
      });
    }
  };
  return (
    <div>
      <h1>Add Subject</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="subject_code">Subject Code</Label>
          <Input id="subject_code" name="subject_code" type="text" />
        </div>
        <div>
          <Label htmlFor="subject_name">Subject Name</Label>
          <Input id="subject_name" name="subject_name" type="text" />
        </div>
        {/* <div>
          <Label htmlFor="coordinator">Coordinator</Label>
          <Input id="coordinator" name="coordinator" type="text" />
        </div> */}
        <div>
          <Label htmlFor="due_date">Due Date</Label>
          <Input id="due_date" name="due_date" type="date" />
        </div>
        {/* <div>
          <Label htmlFor="csv_file">Students</Label>
          <Input id="csv_file" name="csv_file" type="file" />
        </div> */}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
