import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Timer, Upload, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import NptelUpload from "./NptelUpload";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosConfig";

export default function CompletedRequest() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get("/student/completed");
      console.log(res.data);
      setData(res.data.student_subjects);
    }
    fetchData();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Subject Code</TableHead>
          <TableHead className="text-center">Subject Name</TableHead>
          <TableHead className="text-center">Coordinater</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Remarks</TableHead>
          <TableHead className="text-center">Submitted On</TableHead>
          <TableHead className="text-center">Due Date</TableHead>
          <TableHead className="text-center">Reupload Certificate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(
          ({
            subject_code,
            subject_name,
            coordinator,
            status,
            remark,
            submitted_on,
            due_date,
          }) => {
            return (
              <TableRow key={subject_code}>
                <TableCell className="text-center">{subject_code}</TableCell>
                <TableCell className="text-center">{subject_name}</TableCell>
                <TableCell className="text-center">{coordinator}</TableCell>
                <TableCell className="flex items-center justify-center w-full">
                  {status === "verified" ? (
                    <Check className="text-green-500" />
                  ) : status === "processing" ? (
                    <Timer className="text-blue-500" />
                  ) : (
                    <X className="text-red-500" />
                  )}
                </TableCell>
                <TableCell className="text-center">{remark || "-"}</TableCell>
                <TableCell className="text-center">{submitted_on}</TableCell>
                <TableCell className="text-center">{due_date}</TableCell>
                <TableCell className="flex items-center justify-center w-full">
                  {status === "not_verified" ? (
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
                  ) : (
                    <h1 className="py-0">-</h1>
                  )}
                </TableCell>
              </TableRow>
            );
          }
        )}
      </TableBody>
    </Table>
  );
}
