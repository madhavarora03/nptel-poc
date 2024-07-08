import RegisterForm from "@/components/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "./ui/use-toast";
import axiosInstance from "@/lib/axiosConfig";
export default function TabsChange() {
  const { toast } = useToast();
  const studentRegisterHandler = async (data) => {
    console.log(data);
    try {
      const res = await axiosInstance.post("/student/register", data);
      console.log(res);
    } catch (error) {
      toast;
    }
  };

  const teacherRegisterHandler = async (data) => {
    const res = await axiosInstance.post("/teacher/register", data);
    console.log(res);
  };

  return (
    <Tabs defaultValue="student" className="w-[400px] z-10">
      <TabsList className="grid w-full grid-cols-2 bg-secondary-foreground/30 text-accent">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="teacher">Faculty</TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        <RegisterForm
          description="Register as Student"
          fields={[
            {
              name: "name",
              placeholder: "Name",
            },
            {
              name: "email",
              placeholder: "Email",
            },
            {
              name: "nsut_roll_number",
              placeholder: "NSUT Roll Number",
            },
          ]}
          onSubmit={studentRegisterHandler}
        />
      </TabsContent>
      <TabsContent value="teacher">
        <RegisterForm
          description="Register as Faculty"
          fields={[
            {
              name: "salutation",
              placeholder: "Salutation",
              select: "true",
            },
            {
              name: "name",
              placeholder: "Name",
            },
            {
              name: "email",
              placeholder: "Email",
            },
            {
              name: "teacher_id",
              placeholder: "Faculty ID",
            },
          ]}
          onSubmit={teacherRegisterHandler}
        />
      </TabsContent>
    </Tabs>
  );
}
