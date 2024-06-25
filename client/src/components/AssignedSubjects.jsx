import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Link } from "react-router-dom";
const data = [
  {
    subject_code: "EONH016",
    subject_name: "Wildlife Ecology",
    due_date: "12/12/2021",
    total_students: 50,
    verified: 30,
    not_verified: 10,
    not_submitted: 10,
  },
  {
    subject_code: "EONH017",
    subject_name: "Marine Biology",
    due_date: "12/12/2021",
    total_students: 50,
    verified: 30,
    not_verified: 10,
    not_submitted: 10,
  },
  {
    subject_code: "EONH018",
    subject_name: "Botany and Plant Physiology",
    due_date: "12/12/2021",
    total_students: 50,
    verified: 30,
    not_verified: 10,
    not_submitted: 10,
  },
];

export default function AssignedSubjects() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Subject Code</TableHead>
          <TableHead className="text-center">Subject Name</TableHead>
          <TableHead className="text-center">Due Date</TableHead>
          <TableHead className="text-center">Total Students</TableHead>
          <TableHead className="text-center">Verified</TableHead>
          <TableHead className="text-center">Not Verified</TableHead>
          <TableHead className="text-center">Not Submitted</TableHead>
          <TableHead className="text-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(
          ({
            subject_code,
            subject_name,
            due_date,
            total_students,
            verified,
            not_verified,
            not_submitted,
          }) => {
            return (
              <TableRow key={subject_code}>
                <TableCell className="text-center">{subject_code}</TableCell>
                <TableCell className="text-center">{subject_name}</TableCell>
                <TableCell className="text-center">{due_date}</TableCell>
                <TableCell className="text-center">{total_students}</TableCell>
                <TableCell className="text-center">{verified}</TableCell>
                <TableCell className="text-center">{not_verified}</TableCell>
                <TableCell className="text-center">{not_submitted}</TableCell>
                <TableCell className="text-center">
                  <Link to={`/validation/${subject_code}`}>
                    <Button className="bg-[#4a8fff]">
                      <ArrowRight />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          }
        )}
      </TableBody>
    </Table>
  );
}
