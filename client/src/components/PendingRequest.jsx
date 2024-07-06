import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import NptelUpload from "./NptelUpload";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosConfig";

export default function PendingRequest() {
  const [data, setData] = useState([]);
  // TODO: Fetch data from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/student/pending");
        console.log(response.data.student_subjects);
        setData(response.data.student_subjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Subject Code</TableHead>
          <TableHead className="text-center">Subject Name</TableHead>
          <TableHead className="text-center">Coordinator</TableHead>
          <TableHead className="text-center">Due Date</TableHead>
          <TableHead className="text-center">Upload Certificate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ subject_code, subject_name, coordinator, due_date }) => {
          return (
            <TableRow key={subject_code}>
              <TableCell className="text-center">{subject_code}</TableCell>
              <TableCell className="text-center">{subject_name}</TableCell>
              <TableCell className="text-center">{coordinator}</TableCell>
              <TableCell className="text-center">{due_date}</TableCell>
              <TableCell className="flex items-center justify-center w-full">
                <Dialog>
                  <DialogTitle></DialogTitle>
                  <DialogTrigger>
                    <span>
                      <Upload />
                    </span>
                  </DialogTrigger>
                  <DialogContent>
                    <NptelUpload subjectCode={subject_code} />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
