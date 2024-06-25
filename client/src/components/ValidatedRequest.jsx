import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const data = [
  {
    subject_code: "EONH016",
    subject_name: "Wildlife Ecology",
    student_name: "John Doe",
    total_marks: 85,
    result: "Pass",
    nsut_roll_no: "NSUT1234",
    nptel_roll_no: "NPTEL5678",
    status: "Active",
  },
  {
    subject_code: "EONH017",
    subject_name: "Marine Biology",
    student_name: "Jane Smith",
    total_marks: 78,
    result: "Pass",
    nsut_roll_no: "NSUT5678",
    nptel_roll_no: "NPTEL9876",
    status: "Active",
  },
  {
    subject_code: "EONH018",
    subject_name: "Botany",
    student_name: "Michael Johnson",
    total_marks: 92,
    result: "Pass",
    nsut_roll_no: "NSUT2468",
    nptel_roll_no: "NPTEL5432",
    status: "Active",
  },
  {
    subject_code: "EONH019",
    subject_name: "Zoology",
    student_name: "Emily Brown",
    total_marks: 68,
    result: "Fail",
    nsut_roll_no: "NSUT7890",
    nptel_roll_no: "NPTEL1357",
    status: "Inactive",
  },
  {
    subject_code: "EONH020",
    subject_name: "Conservation Biology",
    student_name: "David Wilson",
    total_marks: 75,
    result: "Pass",
    nsut_roll_no: "NSUT1010",
    nptel_roll_no: "NPTEL2020",
    status: "Active",
  },
];

export default function ValidatedRequest() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Subject Code</TableHead>
          <TableHead className="text-center">Subject Name</TableHead>
          <TableHead className="text-center">Student Name</TableHead>
          <TableHead className="text-center">Total Marks</TableHead>
          <TableHead className="text-center">Result</TableHead>
          <TableHead className="text-center">NSUT Roll No.</TableHead>
          <TableHead className="text-center">NPTEL Roll No.</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(
          ({
            subject_code,
            subject_name,
            student_name,
            total_marks,
            result,
            nsut_roll_no,
            nptel_roll_no,
            status,
          }) => {
            return (
              <TableRow key={subject_code}>
                <TableCell className="text-center">{subject_code}</TableCell>
                <TableCell className="text-center">{subject_name}</TableCell>
                <TableCell className="text-center">{student_name}</TableCell>
                <TableCell className="text-center">{total_marks}</TableCell>
                <TableCell className="text-center">{result}</TableCell>
                <TableCell className="text-center">{nsut_roll_no}</TableCell>
                <TableCell className="text-center">{nptel_roll_no}</TableCell>
                <TableCell className="text-center">{status}</TableCell>
              </TableRow>
            );
          }
        )}
      </TableBody>
    </Table>
  );
}
