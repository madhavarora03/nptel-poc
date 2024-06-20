import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import NptelUpload from "./NptelUpload";

const data = [
  {
    subject_code: "EONH016",
    subject_name: "Wildlife Ecology",
    coordinator: "Dr. Gaurav Singhal",
  },
  {
    subject_code: "EONH017",
    subject_name: "Marine Biology",
    coordinator: "Dr. Sarah Johnson",
  },
  {
    subject_code: "EONH018",
    subject_name: "Botany and Plant Physiology",
    coordinator: "Dr. Emily Wong",
  },
  {
    subject_code: "EONH019",
    subject_name: "Zoology: Vertebrates",
    coordinator: "Dr. Michael Brown",
  },
];

export default function PendingRequest() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Subject Code</TableHead>
          <TableHead className="text-center">Subject Name</TableHead>
          <TableHead className="text-center">Coordinater</TableHead>
          <TableHead className="text-center">Upload Certificate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ subject_code, subject_name, coordinator }) => {
          return (
            <TableRow key={subject_code}>
              <TableCell className="text-center">{subject_code}</TableCell>
              <TableCell className="text-center">{subject_name}</TableCell>
              <TableCell className="text-center">{coordinator}</TableCell>
              <TableCell className="flex items-center justify-center w-full">
                <Dialog>
                  <DialogTrigger>
                    <Button variant="ghost" className="hover:bg-primary/80">
                      <Upload />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <NptelUpload />
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
