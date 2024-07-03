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
import axios from "axios";

// const data = [
//   {
//     subject_code: "EONH016",
//     subject_name: "Wildlife Ecology",
//     coordinator: "Dr. Gaurav Singhal",
//     due_date: "12/03/24",
//   },
//   {
//     subject_code: "EONH017",
//     subject_name: "Marine Biology",
//     coordinator: "Dr. Sarah Johnson",
//     due_date: "23/11/24",
//   },
//   {
//     subject_code: "EONH018",
//     subject_name: "Botany and Plant Physiology",
//     coordinator: "Dr. Emily Wong",
//     due_date: "16/06/24",
//   },
//   {
//     subject_code: "EONH019",
//     subject_name: "Zoology: Vertebrates",
//     coordinator: "Dr. Michael Brown",
//     due_date: "27/08/24",
//   },
// ];

export default function PendingRequest() {
  const [data, setData] = useState([]);
  // TODO: Fetch data from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/request/${subject_code}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [subject_code]);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Subject Code</TableHead>
          <TableHead className="text-center">Subject Name</TableHead>
          <TableHead className="text-center">Coordinater</TableHead>
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
