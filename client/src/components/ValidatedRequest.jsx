import { Check, Timer, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/lib/axiosConfig";

export default function ValidatedRequest() {
  const [data, setData] = useState([]);
  const { subject_code } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(
          `/teacher/request/${subject_code}`
        );
        console.log(response.data);
        setData(response.data.requests);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [subject_code]);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Student Name</TableHead>
          <TableHead className="text-center">NSUT Roll No.</TableHead>
          <TableHead className="text-center">NPTEL Roll No.</TableHead>
          <TableHead className="text-center">Total Marks</TableHead>
          <TableHead className="text-center">Result</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Remarks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(
          (
            {
              student_name,
              student_nsut_roll_number,
              nptel_roll_number,
              total_marks,
              result,
              status,
              remark,
            },
            index
          ) => {
            return (
              <TableRow key={index}>
                <TableCell className="text-center">{student_name}</TableCell>
                <TableCell className="text-center">
                  {student_nsut_roll_number}
                </TableCell>
                <TableCell className="text-center">
                  {nptel_roll_number || "-"}
                </TableCell>
                <TableCell className="text-center">
                  {total_marks || "-"}
                </TableCell>
                <TableCell className="text-center capitalize">
                  {result}
                </TableCell>
                <TableCell className="flex items-center justify-center w-full">
                  {status === "verified" ? (
                    <Check className="text-green-500 h-8 w-auto" />
                  ) : status === "not_verified" ? (
                    <X className="text-red-500 h-8 w-auto" />
                  ) : (
                    <Timer className="text-blue-500 h-8 w-auto" />
                  )}
                </TableCell>
                <TableCell className="text-center">{remark || "-"}</TableCell>
              </TableRow>
            );
          }
        )}
      </TableBody>
    </Table>
  );
}
